"use server";
import connectDB from "@/db/connectDb";
import Payment from "@/model/Payment";
import { Cursor } from "mongoose";
import Razorpay from "razorpay";
import User from "@/model/User";

export const initiate = async (amount, to_username, paymentform) => {
  await connectDB();

  var instance = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_ID,
    key_secret: process.env.RAZORPAY_SECRET,
  });

  let options = {
    amount: Number.parseInt(amount),
    currency: "INR",
  };

  let x = await instance.orders.create(options);

  //*create a payment object which shows the pending payment

  await Payment.create({
    oid: x.id,
    amount: amount / 100,
    to_user: to_username,
    name: paymentform.name,
    message: paymentform.message,
  });
  return x;
};

export const fetchuser = async (username) => {
  await connectDB();
  let u = await User.findOne({ username: username });
  let user = u.toObject({ flattenObjectIds: true });
  return user;
};

export const fetchpayments = async (username) => {
  await connectDB();
  let p = await Payment.find({ to_user: username })
    .sort({ amount: -1 })
    .limit(10)
    .lean();

  return p;
};

export const updateProfile = async (data, oldusername) => {
  await connectDB();
  let ndata = Object.fromEntries(data);
  if (oldusername !== ndata.username) {
    let u = await User.findOne({ username: ndata.username });
    if (u) {
      return { error: "username already exists" };
    }
  }

  await User.updateOne({ email: ndata.email }, ndata);
};
