import { FormContainer, PaymentFormContainer } from './payment-form.styles';

import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Button, { buttonTypes } from '../Button.component/Button.component';

export const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const paymentHandler = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        const response = await fetch(
            '/.netlify/functions/create-payment-intent',
            {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ amount: 1000 }),
            }
        ).then((res) => res.json());

        const {
            paymentIntent: { client_secret },
        } = response;

        const paymentResult = await stripe.confirmCardPayment(client_secret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: 'George Kheladze test',
                },
            },
        });
        console.log(paymentResult);
        if (paymentResult.paymentIntent.status === 'succeeded') {
            alert('Payment completed!');
        } else if (paymentResult.error) {
            alert(paymentResult.error);
        }
    };
    return (
        <PaymentFormContainer onSubmit={paymentHandler}>
            <h2>Cart payment: </h2>
            <FormContainer>
                <CardElement />
                <Button btnType={buttonTypes.inverted}> Pay now </Button>
            </FormContainer>
        </PaymentFormContainer>
    );
};

export default PaymentForm;
