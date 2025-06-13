import PaymentPage from "@/Components/PaymentPage";
import React from "react";

const Username = ({ params }) => {
  const { username } = React.use(params);
  return (
    <>
      <PaymentPage username={username} />
    </>
  );
};

export default Username;
