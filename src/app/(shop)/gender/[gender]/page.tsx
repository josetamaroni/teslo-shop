export const revalidate = 60 // 60 segundos para que se actualice la página

import { notFound, redirect } from "next/navigation";
import { Gender } from "@prisma/client";
import { getPaginationProductsWithImages } from '@/actions';
import { Pagination, ProductGrid, Title } from "@/components";

interface Props {
  params: {
    gender: Gender;
  },
  searchParams: {
    page?: string;
  };
}

export default async function GenderPage({ params, searchParams }: Props) {

  const { gender } = await params;

  const label: Record<string, string> = {
    'men': 'Men',
    'women': 'Women',
    'kid': 'Kids',
    'unisex': 'Unisex'
  }

  if( !label[gender] ) {
    notFound();
  }

  const page = await searchParams.page ? parseInt(!!searchParams.page ? searchParams.page : '1') : 1;

  const { products, totalPages } = await getPaginationProductsWithImages({ page, gender });

  if( products.length === 0 ) {
    redirect(`/gender/${gender}`);
  }

  const productsDB = products.filter(prod => prod.gender === gender);

  return (
    <>
      <Title
        title={`${label[gender]}`}
        subtitle="Category"
        className="mb-5 mx-2"
      />

      <ProductGrid products={productsDB} />

      <Pagination totalPages={totalPages} />
    </>
  )
}