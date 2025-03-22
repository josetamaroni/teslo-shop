import { Title } from "@/components";
import { ProductGrid } from "@/components";
import { initialData } from "@/seed/seed";


const products = initialData.products;

export default function Home() {
  return (
    <>
      <Title 
        title="Tienda" 
        subtitle="Todos los productos"
        className="mb-5 mx-2"
      />

      <ProductGrid products={products} />
    </>
  );
}
