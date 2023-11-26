import mongoose from "mongoose";

const billingAddressSchema = new mongoose.Schema({
  address_line: String,
  province: String,
  district: String,
  postcode: String,
});

const BillingAddressModel = mongoose.model(
  "BillingAddress",
  billingAddressSchema
);

export default BillingAddressModel;
