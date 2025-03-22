import { ProductMobileSlideShow, ProductSlideShow, QuantitySelector, SizeSelector } from "@/components";
import { titleFont } from "@/config/fonts";
import { initialData } from "@/seed/seed";
import { notFound } from 'next/navigation';


interface Props {
  params: {
    slug: string;
  };
}

export default async function ProductPage({ params }: Props) {

  const { slug } = await params;
  var product = initialData.products.find(prod => prod.slug === slug)

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

        {/* Selector de Tallas */}
        <SizeSelector availableSizes={product.sizes} selectedSize="L" />


        {/* Selector de cantidad */}
        <QuantitySelector quantity={1} />

        {/* boton */}
        {/* //TODO: Falta que tome las clases globales */}
        <button className="btn-primary my-5">
          Add to Cart
        </button>

        {/* Descripcion */}
        <h3 className="text-sm font-bold">Description</h3>
        <p className="font-light antialiased">{product.description}</p>
      </div>
    </div>
  );
}