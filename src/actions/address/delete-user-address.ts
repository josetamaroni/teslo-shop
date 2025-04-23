'use server'

import prisma from "@/lib/prisma";

export const deleteUserAddress = async (userId: string) => {

    try {

        const deleteAddress = await prisma.userAddress.delete({
            where: {
                userId
            }
        });
        return {
            ok: true,
            message: "Address deleted successfully"
        }
    } catch (error) {
        console.error("Error delete user address:", error);
        return {
            ok: false,
            message: "Error delete user address"
        }
    }
}