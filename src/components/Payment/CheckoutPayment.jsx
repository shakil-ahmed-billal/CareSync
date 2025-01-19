import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { SmartphoneNfc } from "lucide-react"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import Swal from 'sweetalert2'
import useAuth from "../../hooks/useAuth"
import useAxiosPublic from "../../hooks/useAxiosPublic"
import useAxiosSecure from "../../hooks/useAxiosSecure"


const CheckoutPayment = ({ item, setOpenModal, refetch }) => {

    const { user } = useAuth()
    const stripe = useStripe()
    const elements = useElements()
    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()
    const [clientSecret, setClientSecret] = useState('')
    const [transaction, setTransaction] = useState('')

    console.log(item)

    const { _id, campFee, campName } = item || {}

    const itemPrice = {
        price: campFee
    }

    console.log(itemPrice)

    // payment intent load 
    useEffect(() => {

        const handleData = async () => {
            const { data } = await axiosPublic.post('/payment-create', itemPrice)
            setClientSecret(data.clientSecret)
            console.log(data)
        }
        handleData()
    }, [axiosPublic])

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (!stripe || !elements) {
            return
        }
        const card = elements.getElement(CardElement)
        if (card === null) {
            return
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        })
        if (error) {
            console.log(error)
        }
        else {
            console.log('Payment', paymentMethod)
        }
        console.log(clientSecret)
        // confirm card payment 
        const { paymentIntent, error: paymentError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: user?.displayName || 'anonymous',
                        email: user?.email || 'anonymous'
                    }
                },
            },
        );

        // payment error
        if (paymentError) {
            console.log('payment error', paymentError)
        } else {
            console.log('confirm payment', paymentIntent)
            if (paymentIntent.status === 'succeeded') {
                setTransaction(paymentIntent?.id)

                const paymentInfo = {
                    email: user?.email,
                    transaction: paymentIntent?.id,
                    amount: campFee,
                    campName: campName,
                    date: new Date(),
                    campId: _id,
                }
                const { data } = await axiosSecure.post('/payment-history', paymentInfo)
                console.log(data)
                if (data.result.insertedId) {
                    toast.success(`Transaction Id: ${paymentIntent?.id}`)
                    setOpenModal(false)
                    Swal.fire({
                        title: "Payment Success!",
                        text: `Transaction Id: ${paymentIntent?.id}`,
                        icon: "success"
                    });
                    refetch()
                }
            }
        }
    }

    return (
        <div>
            <form className="pt-5" onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className=" mt-5 text-sm bg-blue-500 px-5 py-1 flex items-center text-light3 gap-1 rounded-2xl" type="submit" disabled={!stripe || !clientSecret}>
                    <SmartphoneNfc />  Pay
                </button>
            </form>
        </div>
    )
}

export default CheckoutPayment
