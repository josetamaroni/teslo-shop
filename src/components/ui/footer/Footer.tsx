import { titleFont } from "@/config/fonts"
import Link from "next/link"

export const Footer = () => {
    return (
        <div className=" bottom-0 flex w-full justify-center text-xs p-4">

            <Link href='/'>
                <span className={`${ titleFont.className } antialiased font-bold`}>Teslo</span>
                <span className=""> | Shop</span>
                <span className="">© {new Date().getFullYear()}</span>
            </Link>
            <Link href='/' className="mx-3">
                Privacidad & legal
            </Link>
        </div>
    )
}
