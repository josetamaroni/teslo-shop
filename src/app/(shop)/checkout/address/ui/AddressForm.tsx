'use client'

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';

import type { Address, Country } from '@/interfaces';
import { useAddressStore } from '@/store';
import { setUserAddress, deleteUserAddress } from '@/actions';


type FormInputs = {
    firstName: string;
    lastName: string;
    address: string;
    address2?: string;
    postalCode: string;
    city: string;
    country: string;
    phone: string;
    rememberAdress: boolean;
}
interface Props {
    countries: Country[];
    userStoreAddress?: Partial<Address>;
}

export const AddressForm = ({ countries, userStoreAddress = {} }: Props) => {

    const setAddress = useAddressStore((state) => state.setAddress);
    const address = useAddressStore((state) => state.address);

    const { data } = useSession({ required: true });
    const userId = data?.user.id || '';

    const router = useRouter();

    const { register, handleSubmit, formState: { isValid, errors }, reset } = useForm<FormInputs>({
        defaultValues: {
            ...userStoreAddress,
            rememberAdress: false,
        }
    });

    useEffect(() => {
        if (address.firstName) {
            reset(address);
        }
    }, [])


    const onSubmit = async (data: FormInputs) => {
        setAddress(data);
        if (data.rememberAdress) {
            await setUserAddress(data, userId);
        } else {
            await deleteUserAddress(userId);
        }
        router.push('/checkout');
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-2 sm:gap-5 sm:grid-cols-2">
            <div className="flex flex-col mb-2">
                <span>First Name</span>
                <input
                    type="text"
                    className="p-2 border rounded-md bg-gray-200"
                    {...register("firstName", { required: true })}
                />
            </div>

            <div className="flex flex-col mb-2">
                <span>Last name</span>
                <input
                    type="text"
                    className="p-2 border rounded-md bg-gray-200"
                    {...register("lastName", { required: true })}
                />
            </div>

            <div className="flex flex-col mb-2">
                <span>Address</span>
                <input
                    type="text"
                    className="p-2 border rounded-md bg-gray-200"
                    {...register("address", { required: true })}
                />
            </div>

            <div className="flex flex-col mb-2">
                <span>Address 2 (Optional)</span>
                <input
                    type="text"
                    className="p-2 border rounded-md bg-gray-200"
                    {...register("address2")}
                />
            </div>


            <div className="flex flex-col mb-2">
                <span>Postal code</span>
                <input
                    type="text"
                    className="p-2 border rounded-md bg-gray-200"
                    {...register("postalCode", { required: true })}
                />
            </div>

            <div className="flex flex-col mb-2">
                <span>City</span>
                <input
                    type="text"
                    className="p-2 border rounded-md bg-gray-200"
                    {...register("city", { required: true })}
                />
            </div>

            <div className="flex flex-col mb-2">
                <span>Country</span>
                <select
                    className="p-2 border rounded-md bg-gray-200"
                    {...register("country", { required: true })}
                >
                    <option value="">[ Seleccione ]</option>
                    {
                        countries.map((country) => (
                            <option key={country.id} value={country.id}>
                                {country.name}
                            </option>
                        ))

                    }
                </select>
            </div>

            <div className="flex flex-col mb-2">
                <span>Phone</span>
                <input
                    type="number"
                    placeholder="12345678"
                    className="p-2 border rounded-md bg-gray-200"
                    {...register("phone", { required: true })}
                />
            </div>


            <div className="flex flex-col mb-2 sm:mt-1">
                <div className="inline-flex items-center mb-10">
                    <label
                        className="relative flex cursor-pointer items-center rounded-full p-3"
                        htmlFor="checkbox"
                    >
                        <input
                            type="checkbox"
                            className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-primary transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-gray-400 before:opacity-0 before:transition-opacity checked:border-primary-500 checked:bg-primary-500 checked:before:bg-primary hover:before:opacity-10"
                            id="checkbox"
                            {...register("rememberAdress")}
                        />
                        <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-primary opacity-0 transition-opacity peer-checked:opacity-100">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-3.5 w-3.5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                stroke="currentColor"
                                strokeWidth="1"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                        </div>
                    </label>
                    <span>Remember address?</span>
                </div>

                <button type='submit' className={clsx({
                    "btn-primary": isValid,
                    "btn-disabled": !isValid
                })}
                    disabled={!isValid}
                >
                    Continue
                </button>
            </div>
        </form>
    )
}
