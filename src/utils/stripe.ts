import Stripe from "stripe";
import "dotenv/config";
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
export const DOMAIN = process.env.DOMAIN as string;
export const endpointSecret = process.env.ENDPOINT_SECRET as string;
