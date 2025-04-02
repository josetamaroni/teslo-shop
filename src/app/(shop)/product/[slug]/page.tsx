export const revalidate = 604800; // 7 days in cache

import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import { getProductBySlug } from "@/actions";
import { ProductMobileSlideShow, ProductSlideShow, StockLabel } from "@/components";
import { titleFont } from "@/config/fonts";
import { AddToCart } from './ui/AddToCart';

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata(
  { params }: Props,
  // parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const { slug } = await params;

  // fetch data
  const product = await getProductBySlug(slug);

  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || []

  return {
    title: product?.title,
    description: product?.description,
    openGraph: {
      title: product?.title,
      description: product?.description,
      images: [`/products/${ product?.images[1] }`],
    },
  }
}

export default async function ProductBySlugPage({ params }: Props) {

  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="mt-5 mb-20 grid md:grid-cols-3 gap-3">
      {/* Slideshow */}
      <div className="col-span-1 md:col-span-2">

        {/* Mobile SlideShow */}
        <ProductMobileSlideShow
          className="block md:hidden"
          title={product.title}
          images={product.images}
        />

        {/* Desktop SlideShow */}
        <ProductSlideShow
          className="hidden md:block"
          title={product.title}
          images={product.images}
        />
      </div>

      {/* Details product */}
      <div className="col-span-1 px-5">
        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>
        <p className="text-lg mb-5">
          ${product.price}
        </p>

        {/* Stock */}
        <StockLabel slug={product.slug} />

        {/* Selector de cantidad y botón de agregar al carrito*/}
        <AddToCart product={product}/>

        {/* Descripcion */}
        <h3 className="text-sm font-bold">Description</h3>
        <p className="font-light antialiased">{product.description}</p>
      </div>
    </div>
  );
}