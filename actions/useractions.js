"use server";
import connectDB from "@/db/connectDb";
import Payment from "@/model/Payment";
import Razorpay from "razorpay";
import User from "@/model/User";

export const initiate = async (amount, to_username, paymentform) => {
  await connectDB();

  let us = await User.findOne({ username: to_username });

  var instance = new Razorpay({
    key_id: us.razorpayid,
    key_secret: us.razorpaysecret,
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
  let p = await Payment.find({ to_user: username, done: true })
    .sort({ amount: -1 })
    .limit(8)
    .lean();

  return p;
};

export const updateProfile = async (data, oldusername) => {
  await connectDB();
  let ndata = Object.fromEntries(data);

  if (oldusername !== ndata.username) {
    let existingUser = await User.findOne({ username: ndata.username });
    if (existingUser) {
      return { error: "username already exists" };
    }
  }

  await User.updateOne({ email: ndata.email }, ndata);
  await Payment.updateMany(
    { to_user: oldusername },
    { to_user: ndata.username }
  );

  return { success: true };
};
