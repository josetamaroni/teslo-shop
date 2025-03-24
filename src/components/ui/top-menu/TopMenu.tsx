'use client'
import Link from "next/link"
import { IoCartOutline, IoSearchOutline } from "react-icons/io5"
import { titleFont } from "@/config/fonts"
import { useUIStore } from "@/store"

export const TopMenu = () => {

    const openMenu = useUIStore(state => state.openSideMenu);

    return (
        <nav className="flex px-5 justify-between items-center w-full">
            {/* Logo */}
            <div>
                <Link href="/">
                    <span className={`${titleFont.className} antialiased font-bold text-primary`}>Teslo</span>
                    <span> | Shop</span>
                </Link>
            </div>

            {/* Center Menu */}
            <div className="hidden sm:block">
                <Link href='/gender/men' className="m-2 p-2 rounded-md transition-all hover:bg-gray-100">Men</Link>
                <Link href='/gender/women' className="m-2 p-2 rounded-md transition-all hover:bg-gray-100">Women</Link>
                <Link href='/gender/kid' className="m-2 p-2 rounded-md transition-all hover:bg-gray-100">Kids</Link>
            </div>

            {/* Search, Cart, Menu */}
            <div className="flex items-center">
                <Link href='/search' className="mx-2">
                    <IoSearchOutline className="w-5 h-5" />
                </Link>
                <Link href='/cart' className="mx-2">
                    <div className="relative">
                        <span className="absolute bg-primary text-white text-xs rounded-full px-1 font-bold -top-2 -right-2">
                            3
                        </span>
                        <IoCartOutline className="w-5 h-5" />
                    </div>
                </Link>
                <button onClick={openMenu} className="m-2 p-2 rounded-md transition-all hover:bg-gray-100">
                    Menu
                </button>
            </div>
        </nav>
    )
}
