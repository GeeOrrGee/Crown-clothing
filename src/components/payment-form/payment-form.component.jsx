import {
    FormContainer,
    PaymentButton,
    PaymentFormContainer,
} from './payment-form.styles';

import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Button, { buttonTypes } from '../Button.component/Button.component';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectTotalValue } from '../../store/cart/cart.selector';
import { selectUser } from '../../store/user/user.selecter';

export const PaymentForm = () => {
    const [paymentProcess, setPaymentProcess] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const currentUser = useSelector(selectUser);
    const amount = useSelector(selectTotalValue);

    const paymentHandler = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        setPaymentProcess(true);
        const response = await fetch(
            '/.netlify/functions/create-payment-intent',
            {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ amount: amount * 100 }),
            }
        ).then((res) => res.json());

        const {
            paymentIntent: { client_secret },
        } = response;

        const paymentResult = await stripe.confirmCardPayment(client_secret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: currentUser ? currentUser.displayName : 'Guest',
                },
            },
        });
        console.log(paymentResult);
        setPaymentProcess(false);
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
                <PaymentButton
                    isLoading={paymentProcess}
                    btnType={buttonTypes.inverted}
                >
                    Pay now
                </PaymentButton>
            </FormContainer>
        </PaymentFormContainer>
    );
};

export default PaymentForm;
