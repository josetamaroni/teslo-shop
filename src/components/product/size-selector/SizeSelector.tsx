import type { Size } from "@/interfaces"
import clsx from "clsx"


interface Props {
    selectedSize: Size,
    availableSizes: Size[]
}
export const SizeSelector = ({ selectedSize, availableSizes }: Props) => {
    return (
        <div className="my-5">
            <h3 className="font-bold mb-2">Size</h3>

            <div className="flex">
                {
                    availableSizes.map((size) => (
                        <button
                            className={
                                clsx(
                                    "mr-2 hover:underline hover:text-primary text-lg",
                                    {
                                        "underline text-primary": size === selectedSize
                                    }
                                )}
                            key={size}
                        >
                            {size}
                        </button>
                    ))
                }
            </div>
        </div>
    )
}
