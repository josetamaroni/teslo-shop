'use server'

import type { Address } from "@/interfaces";
import prisma from "@/lib/prisma";

export const setUserAddress = async (address: Address, userId: string) => {

    try {

        const newAddress = await createOrReplaceAddress(address, userId);
        return {
            ok: true,
            address: newAddress
        }
    } catch (error) {
        console.error("Error setting user address:", error);
        return {
            ok: false,
            message: "Error setting user address"
        }
    }
}


const createOrReplaceAddress = async (address: Address, userId: string) => {
    try {
        const storeAddress = await prisma.userAddress.findUnique({
            where: {
                userId
            }
        });

        const addressToSave = {
            userId,
            firstName: address.firstName,
            lastName: address.lastName,
            address: address.address,
            address2: address.address2,
            postalCode: address.postalCode,
            city: address.city,
            phone: address.phone,
            countryId: address.country,
        }

        if (!storeAddress) {
            const newAddress = await prisma.userAddress.create({
                data: addressToSave
            });
            return newAddress;
        }

        const updatedAddress = await prisma.userAddress.update({
            where: {
                userId
            },
            data: addressToSave
        });
        return updatedAddress;
    } catch (error) {
        console.error("Error fetching countries:", error);
        throw new Error("Error fetching countries");
    }
}