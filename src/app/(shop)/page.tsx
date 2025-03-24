export const revalidate = 60 // 60 segundos para que se actualice la página

import { redirect } from "next/navigation";
import { Title, ProductGrid, Pagination } from "@/components";
import { getPaginationProductsWithImages } from "@/actions";


interface Props {
    searchParams: {
        page?: string;
    }
}

export default async function Home({ searchParams }: Props) {

    const page = await searchParams.page ? parseInt( !!searchParams.page ? searchParams.page:'1' ) : 1;

    const { products, totalPages } = await getPaginationProductsWithImages({ page });

    if( products.length === 0 ) {
       redirect("/");
    }

    return (
        <>
            <Title
                title="Tienda"
                subtitle="Todos los productos"
                className="mb-5 mx-2"
            />

            <ProductGrid products={products} />

            <Pagination totalPages={totalPages} />
        </>
    );
}
