import Image from "next/image";
// import Link from "next/link";

import { Title } from "@/components";
import clsx from "clsx";
import { IoCardOutline } from "react-icons/io5";
import { getOrderById } from "@/actions";
import { redirect } from "next/navigation";
import { currencyFormat } from "@/utils";

interface Props {
  params: {
    id: string
  }
}

export default async function OrderPage({ params }: Props) {

  const { id } = await params;
  const { ok, order, message } = await getOrderById(id);

  // Verificar que el id de la orden exista y sea del usuario
  if (!ok) {
    redirect("/");
  }
  // console.log({order})
  const address = order!.OrderAddress;

  return (
    <div className="flex justify-center items-center mb-72 px-5 sm:px-0">
      <div className="flex flex-col w-[1024px]">
        <Title title={`Order #${id.split('-').at(-1)}`} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">

          {/* Cart */}
          <div className="flex flex-col mt-5">
            <div className={
              clsx("flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
                {
                  'bg-red-500': !order!.isPaid,
                  'bg-green-700': order!.isPaid,
                }
              )
            }
            >
              <IoCardOutline size={30} />
              {/* <span className="mx-2">Pendiente de pago</span> */}
              <span className="mx-2">
                {order?.isPaid ? "Paid" : "Not paid"}
              </span>
            </div>

            {/* Items */}
            {
              order!.OrderItem.map(item => (
                <div key={item.product.slug + "-" + item.size} className="flex mb-3">
                  <Image
                    src={`/products/${item.product.ProductImage[0].url}`}
                    width={100}
                    height={100}
                    style={{
                      width: '100px',
                      height: '100px'
                    }}
                    alt={item.product.title}
                    className="mr-5 rounded"
                  />

                  <div className="grid grid-cols-2">
                    <p className="w-[230px]">{item.product.title} - {item.size}</p>
                    <p className="text-right">{currencyFormat(item.price)} x {item.quantity} und</p>
                    <p className="font-bold">Subtotal: {currencyFormat(item.price * item.quantity)}</p>
                  </div>
                </div>
              ))
            }
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-xl shadow-xl p-7 h-fit">

            <h2 className="text-2xl mb-2">Delivery address</h2>
            <div className="">
              <p className="text-xl">{address!.firstName} {address!.lastName}</p>
              <p>{address!.address}</p>
              <p>{address!.address2}</p>
              <p>{address!.city}, {address!.countryId}</p>
              <p>{address!.postalCode}</p>
              <p>{address!.phone}</p>
            </div>

            {/* Divider */}
            <div className="w-full h-0.5 rounded bg-primary my-8"/>
            <h2 className="text-2xl mb-2">Order Summary</h2>

            <div className="grid grid-cols-2">
              <span>No. Products</span>
              <span className="text-right">
                {order?.itemsInOrder === 1
                  ? "1 article"
                  : `${order?.itemsInOrder} articles`}
              </span>

              <span>Subtotal</span>
              <span className="text-right">$100</span>

              <span>Taxes (15%)</span>
              <span className="text-right">{currencyFormat(order!.tax)}</span>

              <span>Shipping (21%)</span>
              <span className="text-right">{currencyFormat(order!.shipping)}</span>

              <span className="mt-5 text-2xl">Total</span>
              <span className="mt-5 text-2xl text-right">{currencyFormat(order!.total)}</span>
            </div>

            <div className="mt-5 mb-2 w-full">
              <div className={
                clsx("flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
                  {
                    'bg-red-500': !order!.isPaid,
                    'bg-green-700': order!.isPaid,
                  }
                )
              }
              >
                <IoCardOutline size={30} />
                {/* <span className="mx-2">Pendiente de pago</span> */}
                <span className="mx-2">
                  {order?.isPaid ? "Paid" : "Not paid"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}