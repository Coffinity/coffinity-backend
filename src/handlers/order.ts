import { v4 as uuidv4 } from "uuid";
import { IOrderDTO } from "../dto/order";
import ProductModel from "../models/product";
import "dotenv/config";
import { IOrderService } from "../services/interface";
import { IOrderHandler } from "./interface";
import { DOMAIN, endpointSecret, stripe } from "../utils/stripe";

export default class OrderHandler implements IOrderHandler {
  private orderSrv: IOrderService;
  constructor(orderSrv: IOrderService) {
    this.orderSrv = orderSrv;
  }

  checkoutHandler: IOrderHandler["checkoutHandler"] = async (req, res) => {
    const userId = res.locals.user.id;
    const { address, items } = req.body;
    let total = 0;

    const productIdArr = items.map((item) => {
      return item.productId;
    });
    try {
      const productList = await ProductModel.find({
        _id: { $in: productIdArr },
      });
      if (!productList) {
        throw new Error("product not found !");
      }

      const productDetail = productList.map((product) => {
        return {
          id: product._id.toString(),
          name: product.name,
          description: product.description,
          image: product.image,
          price: product.price,
          quantity: 0,
        };
      });
      const newOrder = productDetail.map((product) => {
        items.forEach((item) => {
          if (item.productId === product.id) {
            product.quantity = item.quantity;
            total += product.price * product.quantity;
          }
        });
        return {
          name: product.name,
          description: product.description,
          image: product.image,
          price: product.price,
          quantity: product.quantity,
        };
      });
      console.log("neworder >>>> ", newOrder);

      const orderId = uuidv4();

      const orders = newOrder.map((item) => {
        return {
          price_data: {
            currency: "thb",
            product_data: {
              name: item.name,
              images: [item.image],
            },
            unit_amount: item.price * 100,
          },
          quantity: item.quantity,
        };
      });
      console.log(orders);

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: orders,
        mode: "payment",
        success_url: `${DOMAIN}/success`,
        cancel_url: `${DOMAIN}/cart`,
      });

      console.log(session);

      const result = await this.orderSrv.createOrder({
        userId,
        total,
        items: newOrder,
        address,
        session_id: session.id,
        order_id: orderId,
      });

      console.log(result);

      if (!session.url) {
        throw new Error("error");
      }

      return res
        .status(200)
        .json({
          message: "Checkout success.",
          session_id: session.id,
        })
        .end();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "internal server error" }).end();
    }
  };

  getCheckoutInfoHandler: IOrderHandler["getCheckoutInfoHandler"] = async (
    req,
    res
  ) => {
    const orderId = req.params.id;
    try {
      const result = await this.orderSrv.getOrderByOrderId(orderId);
      if (!result) {
        throw new Error("order id not found");
      }
      const orderResponse: IOrderDTO = {
        userId: result.userId,
        items: result.items,
        total: result.total,
        status: result.status,
      };
      return res.status(200).json(orderResponse).end();
    } catch (error) {
      console.error(error);
      return res.status(500).send("internal server error");
    }
  };

  webhookHandler: IOrderHandler["webhookHandler"] = async (req, res) => {
    const sig = req.headers["stripe-signature"];
    if (!sig) {
      console.log("sig undefined");
      throw new Error("sig undefined");
    }

    let event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (error) {
      console.log(error);

      res.status(400).send(`Webhook Error`);
      return;
    }

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed":
        const paymentSuccessData = event.data.object;
        const sessionId = paymentSuccessData.id;
        const status = paymentSuccessData.status;
        if (!status) {
          return res.status(400).send(`status error`);
        }
        const result = await this.orderSrv.updateSessionId(sessionId, status);
        console.log(result);

        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    res.send();
  };
}
