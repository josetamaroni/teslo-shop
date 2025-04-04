'use client'

import Image from 'next/image';

// Import Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import './slideshow.css';


interface Props {
    images: string[];
    title: string;
    className?: string;
}

export const ProductMobileSlideShow = ({ images, title, className }: Props) => {

    return (
        <div className={className}>
            <Swiper
                style={{
                    width: '100vw',
                    height: '500px',
                    '--swiper-pagination-color': 'var(--primary)',
                } as React.CSSProperties}
                pagination={true}
                autoplay={{
                    delay: 2500
                }}
                modules={[FreeMode, Pagination, Autoplay]}
                className="mySwiper2"
            >

                {
                    images.map(image => (
                        <SwiperSlide key={image}>
                            <Image
                                width={600}
                                height={500}
                                src={`/products/${image}`}
                                alt={title}
                                className='object-fill'
                                priority={true}
                            />
                        </SwiperSlide>

                    ))
                }
            </Swiper>
        </div>
    )
}
