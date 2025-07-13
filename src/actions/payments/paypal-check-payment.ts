'use server'

import { revalidate } from "@/app/(shop)/page";
import { PaypalOrderStatusResponse } from "@/interfaces";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const paypalCheckPayment = async (paypalTransaccionId: string) => {

    const authToken = await paypalBearerToken();
    if (!authToken) {
        return {
            ok: false,
            message: `Error generating bearer token`
        }
    }

    const resp = await verifyPaypalPayment(authToken, paypalTransaccionId);
    if (!resp) {
        return {
            ok: false,
            message: `Error verifying payment`
        }
    }
    const { status, purchase_units } = resp;
    const { invoice_id: orderId } = purchase_units[0];

    if (status !== 'COMPLETED') {
        return {
            ok: false,
            message: `Payment not completed`
        }
    }

    try {
        await prisma.order.update({
            where: { id: orderId },
            data: {
                isPaid: true,
                paidAt: new Date()
            }
        })

        revalidatePath(`/orders/${orderId}`);

        return {
            ok: true,
            message: `Payment completed`,
        }
    } catch (error) {
        return {
            ok: false,
            message: `Error 500 payment not completed ${error}`
        }
    }
}


const paypalBearerToken = async (): Promise<string | null> => {
    const { NEXT_PUBLIC_PAYPAL_CLIENT_ID, PAYPAL_SECRET, PAYPAL_OAUTH_URL } = process.env;

    const base64 = Buffer.from(`${NEXT_PUBLIC_PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`, 'utf-8').toString('base64');

    const urlencoded = new URLSearchParams();
    urlencoded.append('grant_type', 'client_credentials');

    try {
        const res = await fetch(`${PAYPAL_OAUTH_URL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${base64}`,
                'cache': 'no-cache',
            },
            body: urlencoded
        }).then(r => r.json())
        return res.access_token;
    } catch (error) {
        console.log(`Error generating bearer token ${error}`)
        return null;
    }
}

const verifyPaypalPayment = async (authToken: string, paypalTransaccionId: string): Promise<PaypalOrderStatusResponse | null> => {

    const { PAYPAL_ORDERS_URL } = process.env;

    try {
        const res = await fetch(`${PAYPAL_ORDERS_URL}/${paypalTransaccionId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`,
                'cache': 'no-cache',
            }
        }).then(r => r.json());
        return res;
    } catch (error) {
        console.log(`Error verifying paypal payment ${error}`)
        return null;
    }
}