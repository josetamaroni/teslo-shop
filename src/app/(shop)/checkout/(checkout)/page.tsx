import Link from "next/link";

import { Title } from "@/components";
import { IoArrowBackOutline } from "react-icons/io5";
import { ProductInCartCheckOrder } from "./ui/ProductInCartCheckOrder";
import { PlaceOrder } from "./ui/PlaceOrder";


export default function CheckoutPage() {

  return (
    <div className="flex justify-center items-center mb-72 px-5 sm:px-0">
      <div className="flex flex-col w-[1024px]">
        <Title title="Check order" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">

          {/* Cart */}
          <div className="flex flex-col mt-5">
            <span className="text-xl">Adjust items</span>
            <Link href='/cart' className="hover:underline hover:text-primary mb-5 flex items-center">
              <IoArrowBackOutline size={25}/> Edit cart
            </Link>

            {/* Items */}
            <ProductInCartCheckOrder/>
          </div>

          {/* Order Summary */}
          <PlaceOrder/>
        </div>
      </div>
    </div>
  );
}