import {
    FormContainer,
    PaymentButton,
    PaymentFormContainer,
} from './payment-form.styles';
import { StripeCardElement } from '@stripe/stripe-js';

import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { buttonTypes } from '../Button.component/Button.component';
import { FormEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectTotalValue } from '../../store/cart/cart.selector';
import { selectUser } from '../../store/user/user.selecter';

const ifCardElement = (
    card: StripeCardElement | null
): card is StripeCardElement => card !== null;

export const PaymentForm = () => {
    const [paymentProcess, setPaymentProcess] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const currentUser = useSelector(selectUser);
    const amount = useSelector(selectTotalValue);

    const paymentHandler = async (e: FormEvent<HTMLFormElement>) => {
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

        const cardElement = elements.getElement(CardElement);

        if (!ifCardElement(cardElement)) return;

        const paymentResult = await stripe.confirmCardPayment(client_secret, {
            payment_method: {
                card: cardElement,
                billing_details: {
                    name: currentUser ? currentUser.displayName : 'Guest',
                },
            },
        });
        console.log(paymentResult);
        setPaymentProcess(false);
        if (paymentResult.error) {
            alert(paymentResult.error);
        } else if (paymentResult.paymentIntent.status === 'succeeded') {
            alert('Payment completed!');
        }
    };
    return (
        <PaymentFormContainer>
            <h2>Cart payment: </h2>
            <FormContainer onSubmit={paymentHandler}>
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
