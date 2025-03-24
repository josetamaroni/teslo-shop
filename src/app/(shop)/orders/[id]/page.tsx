import Image from "next/image";
// import Link from "next/link";

import { Title } from "@/components";
import { initialData } from "@/seed/seed";
import clsx from "clsx";
import { IoCardOutline } from "react-icons/io5";

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2]
]

interface Props {
  params: {
    id: string
  }
}

export default function OrderPage({ params }: Props) {

  const { id } = params;

  // Todo: Verificar que el id de la orden sea del usuario
  // redirect('/')

  return (
    <div className="flex justify-center items-center mb-72 px-5 sm:px-0">
      <div className="flex flex-col w-[1024px]">
        <Title title={`Order #${id}`} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">

          {/* Cart */}
          <div className="flex flex-col mt-5">
            <div className={
              clsx("flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
                {
                  'bg-red-500': false,
                  'bg-green-700': true,
                }
              )
            }
            >
              <IoCardOutline size={30}/>
              {/* <span className="mx-2">Pendiente de pago</span> */}
              <span className="mx-2">Pagado</span>
            </div>

            {/* Items */}
            {
              productsInCart.map(product => (
                <div key={product.slug} className="flex mb-3">
                  <Image
                    src={`/products/${product.images[0]}`}
                    width={100}
                    height={100}
                    style={{
                      width: '100px',
                      height: '100px'
                    }}
                    alt={product.title}
                    className="mr-5 rounded"
                  />

                  <div className="grid grid-cols-2">
                    <p className="w-[230px]">{product.title}</p>
                    {/* <p className="">{product.sizes}</p> */}
                    <p className="text-right">${product.price} x 3 und</p>
                    <p className="font-bold">Subtotal: ${product.price * 3}</p>

                  </div>
                </div>
              ))
            }
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-xl shadow-xl p-7 h-fit">

            <h2 className="text-2xl mb-2">Address</h2>
            <div className="">
              <p className="text-xl">Jose Tamaroni</p>
              <p>Mendoza 4070 2C</p>
              <p>Villa urquiza</p>
              <p>CABA</p>
              <p>1431</p>
              <p>1125012474</p>
            </div>

            {/* Divider */}
            <div
              className="w-full h-0.5 rounded bg-gray-200 my-8"
            />

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
              <div className={
                clsx("flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
                  {
                    'bg-red-500': false,
                    'bg-green-700': true,
                  }
                )
              }
              >
                <IoCardOutline size={30} />
                {/* <span className="mx-2">Pendiente de pago</span> */}
                <span className="mx-2">Pagado</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}