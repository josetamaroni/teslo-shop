'use client'
import { useState } from 'react';

// Import Swiper
import { Swiper as SwiperObject } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import './slideshow.css';
import Image from 'next/image';


interface Props {
    images: string[];
    title: string;
    className?: string;
}

export const ProductSlideShow = ({ images, title, className }: Props) => {

    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperObject>();

    return (
        <div className={className}>
            <Swiper
                style={{
                    '--swiper-navigation-color': 'var(--primary)',
                    '--swiper-pagination-color': 'var(--primary)',
                } as React.CSSProperties
                }
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper2"
            >

                {
                    images.map(image => (
                        <SwiperSlide key={image}>
                            <Image
                                width={1024}
                                height={800}
                                src={`/products/${image}`}
                                alt={title}
                                className='rounded-lg object-fill'
                                priority={true}
                            />
                        </SwiperSlide>

                    ))
                }
            </Swiper>

            <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper"
            >
                {
                    images.map(image => (
                        <SwiperSlide key={image}>
                            <Image
                                width={300}
                                height={300}
                                src={`/products/${image}`}
                                alt={title}
                                className='rounded-lg object-fill'
                                priority={true}
                            />
                        </SwiperSlide>

                    ))
                }
            </Swiper>
        </div>
    )
}
