import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Payment from "@/model/Payment";
import User from "@/model/User";
import connectDB from "@/db/connectDb";

export const POST = async (req) => {
  await connectDB();
  let body = await req.formData();
  body = Object.fromEntries(body);
  //*check if razorpayorderid is preset or not in db
  let p = await Payment.findOne({ oid: body.razorpay_order_id });
  if (!p) {
    return NextResponse.json({
      succes: false,
      message: "Payment Veirifcation Failed",
    });
  }

  let u = await User.findOne({ username: p.to_user });
  const secret = await u.razorpaysecret;

  //* Verify the payment
  let xx = validatePaymentVerification(
    {
      order_id: body.razorpay_order_id,
      payment_id: body.razorpay_payment_id,
    },
    body.razorpay_signature,
    secret
  );

  if (xx) {
    const updatedPayment = await Payment.findOneAndUpdate(
      {
        oid: body.razorpay_order_id,
      },
      { done: true },
      { new: true }
    );

    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_LOCAL_URL}/${updatedPayment.to_user}?paymentdone=true`
    );
  } else {
    return NextResponse.json({
      success: false,
      message: "Payment verification Failed",
    });
  }
};
