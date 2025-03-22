import { ProductGrid, Title } from "@/components";
import { notFound } from "next/navigation";
import { initialData } from "@/seed/seed";
import { Category } from "@/interfaces";


const seedProducts = initialData.products;

interface Props {
  params: {
    id: Category;
  };
}

export default async function CategoryPage({ params }: Props) {

  const { id } = await params;
  const label: Record<Category, String> = {
    'men': 'Men',
    'women': 'Women',
    'kid': 'Kids',
    'unisex': 'Unisex'
  }

  if( !label[id] ) {
    notFound();
  }

  const products = seedProducts.filter(prod => prod.gender === id);

  return (
    <>
      <Title
        title={`${label[id]}`}
        subtitle="Category"
        className="mb-5 mx-2"
      />

      <ProductGrid products={products} />
    </>
  )
}