'use client'

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import clsx from 'clsx';
import {
    IoCartOutline,
    IoCloseOutline,
    IoGridOutline,
    IoHeartOutline,
    IoLogInOutline,
    IoLogOutOutline,
    IoPeopleOutline,
    IoPersonOutline,
    IoSearchOutline,
    IoShirtOutline,
    IoTicketOutline
} from 'react-icons/io5';

import { useUIStore } from '@/store';
import { logout } from '@/actions';


export const Sidebar = () => {

    const { data: session } = useSession();
    const [isAuthenticated, setIsAuthenticated] = useState(!!session?.user);
    const isAdmin = (session?.user.role === 'admin');

    const isSideMenuOpen = useUIStore(state => state.isSideMenuOpen);
    const closeMenu = useUIStore(state => state.closeSideMenu);

    // Sincroniza isAuthenticated con session
    useEffect(() => {
        setIsAuthenticated(!!session?.user);
    }, [session]);

    const onLogout = async () => {
        setIsAuthenticated(false); // Actualiza el estado local.
        closeMenu();
        const l = await logout();
        console.log('L:', l)
    };


    return (
        <div>
            {/* Background Black */}
            {
                isSideMenuOpen && (
                    <div className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30"></div>
                )
            }
            {/* Blur */}
            {
                isSideMenuOpen && (
                    <div onClick={closeMenu} className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm"></div>
                )
            }

            {/* Sidemenu */}
            <nav
                className={
                    clsx("fixed p-5 right-0 top-0 w-full h-screen sm:w-[500px] bg-white z-20 shadow-2xl transform transition-all duration-300",
                        {
                            "translate-x-full": !isSideMenuOpen
                        }
                    )
                }>

                <IoCloseOutline
                    size={30}
                    className=" absolute top-5 right-5 cursor-pointer"
                    onClick={() => closeMenu()}
                />

                {/* Input */}
                <div className="relative mt-14">
                    <IoSearchOutline size={20} className='absolute top-2 left-2' />
                    <input type='text' placeholder='Search' className='w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-500' />
                </div>

                {/* Menu */}
                {
                    isAuthenticated ? (
                        <>
                            <Link href='/profile' onClick={() => closeMenu()} className='flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all'>
                                <IoPersonOutline size={25} />
                                <span className='ml-3 text-xl'>Profile</span>
                            </Link>

                            <Link href='/orders' onClick={() => closeMenu()} className='flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all'>
                                <IoTicketOutline size={25} />
                                <span className='ml-3 text-xl'>Orders</span>
                            </Link>
                            <Link href='/favorite' onClick={() => closeMenu()} className='flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all'>
                                <IoHeartOutline size={25} />
                                <span className='ml-3 text-xl'>Favorite</span>
                            </Link>
                            <button onClick={() => onLogout()} className='flex w-full items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all'>
                                <IoLogOutOutline size={25} />
                                <span className='ml-3 text-xl'>Sign out</span>
                            </button>
                        </>
                    ) : (
                        <Link href='/auth/login' onClick={() => closeMenu()} className='flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all'>
                            <IoLogInOutline size={25} />
                            <span className='ml-3 text-xl'>Sign in</span>
                        </Link>
                    )
                }


                {
                    (isAuthenticated && isAdmin) && (
                        <>
                            {/* Line separator */}
                            <div className='w-full h-px bg-gray-200 my-10' />

                            <Link href='/admin' onClick={() => closeMenu()} className='flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all'>
                                <IoGridOutline size={25} />
                                <span className='ml-3 text-xl'>Dashboard</span>
                            </Link>

                            <Link href='/products' onClick={() => closeMenu()} className='flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all'>
                                <IoShirtOutline size={25} />
                                <span className='ml-3 text-xl'>Products</span>
                            </Link>

                            <Link href='/orders' onClick={() => closeMenu()} className='flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all'>
                                <IoCartOutline size={25} />
                                <span className='ml-3 text-xl'>Orders</span>
                            </Link>

                            <Link href='/' onClick={() => closeMenu()} className='flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all'>
                                <IoPeopleOutline size={25} />
                                <span className='ml-3 text-xl'>Users</span>
                            </Link>
                        </>
                    )
                }
            </nav>
        </div>
    )
}
