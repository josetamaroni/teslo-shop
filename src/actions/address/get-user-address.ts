import prisma from "@/lib/prisma";

export const getUserAddress = async (userId: string) => {
    try {
        const userAddress = await prisma.userAddress.findUnique({
            where: {
                userId
            }
        });
        if (!userAddress) {
            return {};
        }
        const { countryId, ...rest } = userAddress;

        const address = {
            ...rest,
            country: countryId
        }

        return address;
    } catch (error) {
        console.log(error)
        return {};
    }
}
