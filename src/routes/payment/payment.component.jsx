import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Elements } from "@stripe/react-stripe-js";

import PaymentForm from "../../components/payment-form/payment-form.component";

import { stripePromise } from '../../utils/stripe/stripe.utils';

import { selectCartTotal } from "../../store/cart/cart.selector";

function Payment() {
   const [clientSecret, setClientSecret] = useState('');
   const amount = useSelector(selectCartTotal);

   useEffect(() => {
      async function makePaymentIntent() {
         const response = await fetch('/.netlify/functions/create-payment-intent', {
            method: 'post',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify({ amount: amount * 100 })
         }).then(res => res.json());

         const { paymentIntent: { client_secret } } = response;
         setClientSecret(client_secret);
      }
      makePaymentIntent();
   }, []);

   const options = {
      clientSecret
   };

   return (
      <div>
         {clientSecret && (
            <Elements options={options} stripe={stripePromise}>
               <PaymentForm />
            </Elements>
         )}
      </div>
   );
}

export default Payment;
