import Image from "next/image";
// import Link from "next/link";

import { Title } from "@/components";

import { redirect } from "next/navigation";
import { currencyFormat } from "@/utils";
import { getCategories, getProductBySlug } from "@/actions";
import { ProductForm } from "./ui/ProductForm";

interface Props {
    params: {
        slug: string
    }
}

export default async function ProductPage({ params }: Props) {

    const { slug } = await params;
    const [product, cat] = await Promise.all([
        getProductBySlug(slug),
        getCategories()
    ]);
    const { categories } = cat;

    if (!product && slug !== 'new') {
        redirect("/admin/products");
    }

    const title = (slug === 'new') ? 'New Product' : 'Edit Product';

    return (
        <div className="flex justify-center items-center px-5 sm:px-0">
            <div className="flex flex-col w-[1024px]">
                <Title title={title} />
                <ProductForm product={product ?? {}} categories={categories} />
            </div>
        </div>
    );
}