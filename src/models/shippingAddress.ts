import mongoose from "mongoose";

const shippingAddressSchema = new mongoose.Schema({
  address_line: String,
  province: String,
  district: String,
  postcode: String,
});

const ShippingAddressModel = mongoose.model(
  "ShippingAddress",
  shippingAddressSchema
);

export default ShippingAddressModel;
