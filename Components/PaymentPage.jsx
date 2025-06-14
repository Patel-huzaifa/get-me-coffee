"use client";
import React, { useEffect } from "react";
import Script from "next/script";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { fetchuser, fetchpayments, initiate } from "@/actions/useractions";
import Loader from "./Loader";
import { Bounce, toast } from "react-toastify";
import { useSearchParams } from 'next/navigation'
import { notFound } from "next/navigation";


const PaymentPage = ({ username }) => {
  const [paymentform, setpaymentform] = useState({
    name: "",
    message: "",
    amount: 0,
  });
  const [CurrentUser, setCurrentUser] = useState({});
  const [payments, setpayments] = useState([]);
  const searchParams = useSearchParams()
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (searchParams.get("paymentdone") === "true") {
      toast('The payment has been made!!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      toast('Thanks for your donation!!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      router.push(`${username}`)
    }
    getData();
  }, []);


  const handleChange = (e) => {
    setpaymentform({ ...paymentform, [e.target.name]: e.target.value });
  };

  const getData = async () => {
    let u = await fetchuser(username);
    setCurrentUser(u);
    let dbpayments = await fetchpayments(username);
    setpayments(dbpayments);
  };

  //*Function that initiate paymenr
  const pay = async (amount) => {
    if (paymentform.name < 2 || paymentform.message < 3 || (paymentform.name < 2 && paymentform.message < 3)) {
      toast.error("Invalid name or message")
      return
    }

    // Get the order Id
    let a = await initiate(amount, username, paymentform);
    let orderId = a.id;
    var options = {
      key: CurrentUser.razorpayid, // Enter the Key ID generated from the Dashboard
      amount: amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Get Me A Chai", //your business name
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      callback_url: `${process.env.NEXT_PUBLIC_LOCAL_URL}/api/razorpay`,
      prefill: {
        //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
        name: "Gaurav Kumar", //your customer's name
        email: "gaurav.kumar@example.com",
        contact: "9000090000", //Provide the customer's phone number for better conversion rates
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    var rzp1 = new Razorpay(options);
    rzp1.open();
  };



  if (status === "loading") {
    return <>
      <div className="w-full flex justify-center items-center mt-64  h-full">

        <Loader />
      </div>
    </>
  }


  return (
    <>


      <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
      <div className="cover w-full  relative">
        <img
          className="object-cover w-full h-[320px]"
          src={CurrentUser.coverpic}
          alt="coverpic"
        />
        <div className="absolute bottom-[-14%] right-[47.5%] border-2 border-gray-300 rounded-full overflow-hidden w-[100px] h-[100px]">
          <img
            src={CurrentUser.profilepic}
            alt="profilepic"
            className="w-full h-full object-cover"
          />
        </div>

      </div>
      <div className="info flex justify-center flex-col items-center my-14 gap-2">
        <div className="text-3xl font-bold">@{username}</div>
        <div className="text-slate-400">Let help @{username} to get coffee!</div>
        <div className="text-slate-400">{payments.length} Payments •  ₹{payments.reduce((a, b) => a + b.amount, 0)} raised!</div>

        <div className="payment mt-6 flex gap-3 w-[80%]">
          <div className="supporters w-1/2 bg-slate-900 rounded-2xl p-4 pt-2">
            <h2 className="text-lg font-bold">Top 10 Supporters</h2>
            <ul className="mx-8">
              {payments.length == 0 && <li className="my-1 gap-2 flex items-center mt-10 text-xl text-slate-300">
                No payments yet

              </li>}
              {payments.map((p, i) => {
                return (
                  <li key={i} className="my-1 gap-2 flex items-center">
                    <img
                      className="w-[30px] h-30px]"
                      src="/avatar.gif"
                      alt="useravater"
                    />
                    {p.name} <span className="font-bold">₹{p.amount}</span>
                    with message "{p.message}"
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="makepayment w-1/2 bg-slate-900 rounded-xl p-4 pt-2">
            <h2 className="text-2xl font-bold my-5">Make a Payment</h2>
            <div className="flex flex-col gap-2 mt-1">
              <div>
                <input
                  onChange={handleChange}
                  value={paymentform.name}
                  name="name"
                  type="text"
                  className="w-full outline-none p-3 rounded-lg bg-slate-800"
                  placeholder="Enter name"
                />
              </div>
              <div>
                <input
                  onChange={handleChange}
                  value={paymentform.message}
                  name="message"
                  type="text"
                  className="w-full p-3 outline-none rounded-lg bg-slate-800"
                  placeholder="Enter message"
                />
              </div>
              <div>
                <input
                  onChange={handleChange}
                  value={paymentform.amount}
                  name="amount"
                  type="number"
                  className="w-full p-3 outline-none rounded-lg bg-slate-800"
                  placeholder="Enter amount(e.g,₹10)"
                />
              </div>
              <button
                onClick={() => {
                  pay(paymentform.amount * 100);
                }}
                className="btn"
              >
                PAY
              </button>
            </div>
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => {
                  setpaymentform({ amount: 10 })
                  pay(1000);

                }}
                className="bg-slate-800 cursor-pointer p-3 rounded-lg"
              >
                Pay ₹10
              </button>
              <button
                onClick={() => {
                  setpaymentform({ amount: 20 })
                  pay(2000);
                }}
                className="bg-slate-800 p-3 cursor-pointer rounded-lg"
              >
                Pay ₹20
              </button>
              <button
                onClick={() => {
                  setpaymentform({ amount: 30 })
                  pay(3000);
                }}
                className="bg-slate-800 p-3 cursor-pointer rounded-lg"
              >
                Pay ₹30
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
