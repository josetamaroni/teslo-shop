import Link from "next/link";
// import { redirect } from "next/navigation";

import { Title } from "@/components";
import { ProductInCart } from "./ui/ProductInCart";
import { OrderSummary } from "./ui/OrderSummary";

export default function CartPage() {

  return (
    <div className="flex justify-center items-center mb-72 px-5 sm:px-0">
      <div className="flex flex-col w-[1024px]">
        <Title title="Cart" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">

          {/* Cart */}
          <div className="flex flex-col mt-5">
            <span className="text-xl">Add more products</span>
            <Link href='/' className="hover:underline hover:text-primary mb-5">
              Continue shopping
            </Link>

            {/* Items */}
            <ProductInCart />
          </div>

          {/* Order Summary */}
          <OrderSummary />
        </div>
      </div>
    </div>
  );
}