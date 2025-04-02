'use client'

import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

interface Props {
    quantity: number;
    onQuantityChanged: (quantity: number) => void;
    inStock?: number
}

export const QuantitySelector = ({ quantity, onQuantityChanged, inStock }: Props) => {

    const onValueChanged = (value: number) => {
        if (quantity + value < 1) return
        // if (quantity + value >= inStock) return
        onQuantityChanged(quantity + value);
    }

    return (
        <div className="my-2">
            <h3 className="font-bold mb-2">Quantity</h3>

            <div className="flex">
                <button onClick={() => onValueChanged(-1)}>
                    <IoRemoveCircleOutline size={25} />
                </button>
                <span className="w-5 mx-3 px-2 bg-gray-100 text-center rounded">
                    {quantity}
                </span>
                <button onClick={() => onValueChanged(+1)}>
                    <IoAddCircleOutline size={25} />
                </button>
            </div>
        </div>
    )
}
