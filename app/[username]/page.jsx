import PaymentPage from "@/Components/PaymentPage";
import { notFound } from "next/navigation";
import connectDB from "@/db/connectDb";
import User from "@/model/User";

const Username = async ({ params }) => {
  const { username } = params;

  await connectDB();
  const u = await User.findOne({ username });
  if (!u) return notFound();

  return <PaymentPage username={username} />;
};

export default Username;
