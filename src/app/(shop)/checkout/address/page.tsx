import { Title } from '@/components';
import { AddressForm } from './ui/AddressForm';
import { getCountries, getUserAddress } from '@/actions';
import { auth } from '@/auth.config';

export default async function AddressPage() {

    const countries = await getCountries();
    const session = await auth();
    const userAddress = await getUserAddress(session?.user.id || '');

    return (
        <div className="flex flex-col sm:justify-center sm:items-center mb-72 px-5 md:px-10">
            <div className="w-full  xl:w-[1000px] flex flex-col justify-center text-left">
                <Title title="Address" subtitle="Delivery address" />

                <AddressForm countries={countries} userStoreAddress={userAddress} />
            </div>
        </div>
    );
}