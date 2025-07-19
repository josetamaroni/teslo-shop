"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ProductImage } from "@prisma/client";
import Image from "next/image";
import clsx from "clsx";
import { createUpdateProduct, deleteProductImage } from "@/actions";
import { Category, Gender, Product } from "@/interfaces";
import { IoTrashOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";

interface Props {
    product: Partial<Product> & { ProductImage?: ProductImage[] };
    categories: Category[];
}
interface FormInputs {
    title: string;
    description: string;
    inStock: number;
    price: number;
    sizes: string[];
    slug: string;
    tags: string; // Etiquetas: hoodie, t-shirt, pants, etc.
    gender: Gender;
    categoryId: string;
    images?: FileList; // Para manejar la subida de imágenes
}

//Todo: hay que crear la tabla de sizes en la base de datos y traerla desde ahí
const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

export const ProductForm = ({ product, categories }: Props) => {

    const router = useRouter();

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting, isValidating, isDirty, isSubmitSuccessful },
        getValues,
        setValue,
        watch
    } = useForm<FormInputs>({
        defaultValues: {
            ...product,
            tags: product.tags?.join(', '),
            sizes: product.sizes ?? [],
            images: undefined, // Para manejar la subida de imágenes
        }
    });
    watch('sizes'); // Para que se actualice el valor en el formulario
    // Observar cambios en el título
    const title = watch('title');
    useEffect(() => {
        if (title) {
            const newSlug = title.toLowerCase()
                .trim()
                .replaceAll(' ', '_')
                .replaceAll("'", '')
                .replaceAll('"', '')
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, '');

            setValue('slug', newSlug, { shouldValidate: true });
        }
    }, [title, setValue]);
    const [errorMessage, setErrorMessage] = useState('');

    const onSizeChanged = (size: string) => {
        const currentSizes = new Set(getValues('sizes'));
        currentSizes.has(size) ? currentSizes.delete(size) : currentSizes.add(size);
        setValue('sizes', Array.from(currentSizes));
    }

    const onSubmit = async (data: FormInputs) => {
        setErrorMessage('');
        const formData = new FormData();
        const { images, ...productToSave } = data;

        if (product.id) {
            formData.append('id', product.id ?? '');
        }

        formData.append('title', productToSave.title);
        formData.append('slug', productToSave.slug);
        formData.append('description', productToSave.description);
        formData.append('price', productToSave.price.toString());
        formData.append('tags', productToSave.tags);
        formData.append('gender', productToSave.gender);
        formData.append('categoryId', productToSave.categoryId);
        formData.append('sizes', productToSave.sizes.toString());
        formData.append('inStock', productToSave.inStock.toString());

        if (images) {
            // Añadir las imágenes al FormData
            for (let i = 0; i < images.length; i++) {
                formData.append('images', images[i]);
            }
        }

        console.log(formData.getAll('images'));
        // Server action
        const resp = await createUpdateProduct(formData);
        console.log({ resp });
        if (!resp.ok || !resp.product) {
            //     setErrorMessage(resp.message);

            // ! Cambiar esto por un toast
            alert('Producto no se pudo actualizar');
            return;
        }

        router.replace(`/admin/product/${resp.product?.slug}`);
    };

    const onDeleteImage = async (imageId: number, imageUrl: string) => {
        const resp = await deleteProductImage(imageId, imageUrl);
        if (!resp.ok) {
            alert(resp.message);
            return;
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="grid px-5 mb-16 grid-cols-1 sm:px-0 sm:grid-cols-2 gap-3">
            <div className="w-full">
                <div className="flex flex-col mb-2">
                    <label htmlFor="title" className="font-bold">Title</label>
                    <input type="text" {...register("title", { required: true })} className="p-2 border rounded-md bg-gray-200" />
                </div>

                <div className="flex flex-col mb-2">
                    <label htmlFor="slug" className="font-bold">Slug</label>
                    <input type="text" {...register("slug", { required: true })} className="p-2 border rounded-md bg-gray-200" disabled />
                </div>

                <div className="flex flex-col mb-2">
                    <label htmlFor="description" className="font-bold">Description</label>
                    <textarea
                        rows={5}
                        {...register("description", { required: true })}
                        className="p-2 border rounded-md bg-gray-200"
                    ></textarea>
                </div>

                <div className="flex flex-col mb-2">
                    <label htmlFor="price" className="font-bold">Price</label>
                    <input type="number" {...register("price", { required: true, min: 0 })} className="p-2 border rounded-md bg-gray-200" />
                </div>


                <div className="flex flex-col mb-2">
                    <label htmlFor="tags" className="font-bold">Tags</label>
                    <input type="text" {...register("tags", { required: true })} className="p-2 border rounded-md bg-gray-200" />
                </div>

                <div className="flex flex-col mb-2">
                    <label htmlFor="gender" className="font-bold">Gender</label>
                    <select {...register("gender", { required: true })} className="p-2 border rounded-md bg-gray-200">
                        <option value="">[Seleccione]</option>
                        <option value="men">Men</option>
                        <option value="women">Women</option>
                        <option value="kid">Kid</option>
                        <option value="unisex">Unisex</option>
                    </select>
                </div>

                <div className="flex flex-col mb-2">
                    <label htmlFor="category" className="font-bold">Category</label>
                    <select {...register("categoryId", { required: true })} className="p-2 border rounded-md bg-gray-200">
                        <option value="">[Seleccione]</option>
                        {
                            categories.map(category => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))
                        }
                    </select>
                </div>

                <button type="submit" className="btn-primary w-full">
                    Save
                </button>
            </div>

            {/* Selector de tallas y fotos */}
            <div className="w-full">
                {/* As checkboxes */}
                <div className="flex flex-col">

                    <div className="flex flex-col mb-2">
                        <label htmlFor="inStock" className="font-bold">In Stock</label>
                        <input type="number" {...register("inStock", { required: true, min: 0 })} className="p-2 border rounded-md bg-gray-200" />
                    </div>

                    <label htmlFor="sizes" className="font-bold">Size</label>
                    <div {...register("sizes", { required: true })} className="flex flex-wrap">
                        {
                            sizes.map(size => (
                                <div
                                    key={size}
                                    onClick={() => onSizeChanged(size)}
                                    className={
                                        clsx(
                                            "flex items-center justify-center w-10 h-10 mr-2 border rounded-md transition-all cursor-pointer",
                                            {
                                                "bg-primary text-white": getValues('sizes').includes(size)
                                            }
                                        )
                                    }>
                                    <span>{size}</span>
                                </div>
                            ))
                        }
                    </div>

                    <div className="flex flex-col mb-2">
                        <label htmlFor="image" className="font-bold">Image</label>
                        <input
                            type="file"
                            {...register("images")}
                            multiple
                            className="p-2 border rounded-md bg-gray-200"
                            accept="image/png, image/jpeg, image/avif, image/webp"
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        {
                            product.ProductImage?.map((image) => (
                                <div key={image.id} className="flex flex-col items-center">
                                    <Image
                                        src={`/products/${image.url}`}
                                        alt={product.title || 'Product Image'}
                                        width={300}
                                        height={300}
                                        className="w-full shadow-md rounded-t"
                                        priority={true}
                                    />

                                    <button
                                        type="button"
                                        onClick={() => onDeleteImage(image.id, image.url)}
                                        className="btn-danger w-full rounded-b flex justify-center items-center">
                                        <IoTrashOutline size={20} className="mr-2" /> Delete
                                    </button>
                                </div>
                            ))
                        }
                    </div>

                </div>
            </div>
        </form>
    );
};