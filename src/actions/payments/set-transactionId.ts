'use server'

import prisma from "@/lib/prisma"


export const setTransactionId = async ( orderId: string, transactionId: string ) => {
    try {

        const updateTransactionId = await prisma.order.update({
            where: { id: orderId },
            data: { transactionId: transactionId }
        })

        if(!updateTransactionId) {
            return {
                ok: false,
                message: `Transaction ID not updated ${orderId}`,
                order: null
            }   
        }

        return {
            ok: true,
            message: "Transaction ID updated",
            order: updateTransactionId
        }
    } catch (error) {
        return {
            ok: false,
            message: `Error updating transaction ID ${error}`,
            order: null
        }
    }
}
