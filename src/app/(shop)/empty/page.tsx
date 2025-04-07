import Link from "next/link";
import { IoArrowBack, IoCartOutline } from "react-icons/io5";

export default function EmptyPage() {
  return (
    <div className="flex justify-center items-center h-[800px]">
      <IoCartOutline size={80} className="mx-5 text-primary" />

      <div className="flex flex-col items-center">
        <h1 className="text-xl font-semibold">Your cart is empty</h1>

        <Link href='/' className="underline hover:text-primary flex">
          <IoArrowBack size={25} className="mr-2"/> Back
        </Link>
      </div>
    </div>
  );
}