// import { redirect } from "next/navigation";
import Link from "next/link";

import { Title } from "@/components";
import { ProductInCart } from "./ui/ProductInCart";


export default function CartPage() {

  //TODO: Falta condicion de carrito vacio
  // redirect('/empty');

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
            <ProductInCart/>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-xl shadow-xl p-7 h-fit">
            <h2 className="text-2xl mb-2">Order Summary</h2>

            <div className="grid grid-cols-2">
              <span>No. Products</span>
              <span className="text-right">3 articles</span>

              <span>Subtotal</span>
              <span className="text-right">$100</span>

              <span>Impuestos (15%)</span>
              <span className="text-right">15</span>

              <span className="mt-5 text-2xl">Total</span>
              <span className="mt-5 text-2xl text-right">$115</span>
            </div>

            <div className="mt-5 mb-2 w-full">
              <Link href='/checkout/address' className=" flex btn-primary justify-center">
                Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}