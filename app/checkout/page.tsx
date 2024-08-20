import React from "react";
import Container from "../components/styles/Container";
import FormWrap from "../authorization/FormWrap";
import ClientCheckout from "./ClientCheckout";

const Checkout = () => {
  return (
    <div className="p-8">
      <Container>
        <FormWrap>
          <ClientCheckout />
        </FormWrap>
      </Container>
    </div>
  );
};

export default Checkout;
