'use client'

import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { CreateOrderData, CreateOrderActions, OnApproveData, OnApproveActions } from "@paypal/paypal-js";
import { paypalCheckPayment, setTransactionId } from "@/actions";

interface Props {
    orderId: string;
    amount: number;
}

export const PaypalButton = ({ orderId, amount }: Props) => {

    const [{ isPending }] = usePayPalScriptReducer();
    if (isPending) {
        return (
            <div className="animate-pulse mb-10">
                <div className="h-11 bg-gray-300 rounded mb-4" />
                <div className="h-11 bg-gray-300 rounded" />
            </div>
        )
    }

    const roundedAmount = amount.toFixed(2).toString();

    const createOrder = async (data: CreateOrderData, actions: CreateOrderActions): Promise<string> => {

        const transactionID = await actions.order.create({
            intent: 'CAPTURE',
            purchase_units: [
                {
                    invoice_id: orderId,
                    amount: {
                        currency_code: 'USD',
                        value: roundedAmount,
                    }
                    // amount: {
                    //     currency_code: 'USD',
                    //     value: '100.00',
                    //     breakdown: {
                    //         item_total: {
                    //             currency_code: 'USD',
                    //             value: '100.00'
                    //         }
                    //     }
                    // },
                }
            ]
        });

        const { ok, message, order } = await setTransactionId(orderId, transactionID);
        if (!ok) {
            throw new Error(message);
        }
        console.log({ transactionID, order })

        return transactionID;
    }

    const onApprove = async (data: OnApproveData, actions: OnApproveActions) => {
        const details = await actions.order?.capture();
        if (!details?.id) return;

        const resp = await paypalCheckPayment(details!.id);
        console.log({ resp });
    }

    return (
        <div className="relative z-0">
            <PayPalButtons
                createOrder={createOrder}
                onApprove={onApprove}
            />
        </div>
    )
}
