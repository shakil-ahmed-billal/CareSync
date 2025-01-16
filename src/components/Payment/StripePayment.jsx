import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from '@stripe/stripe-js';
import CheckoutPayment from "./CheckoutPayment";

const StripePayment = ({item}) => {

    const stripePromise = loadStripe(import.meta.env.VITE_stripe_key);

    return (
        <div>
            <Elements stripe={stripePromise}>
                <CheckoutPayment item={item}></CheckoutPayment>
            </Elements>
        </div>
    )
}

export default StripePayment
