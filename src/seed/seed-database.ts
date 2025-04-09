import prisma from "../lib/prisma";
import { initialData } from "./seed";


async function main() {

    //? 1. Borrar registros previos
    await Promise.all([
        await prisma.user.deleteMany(),
        await prisma.productImage.deleteMany(),
        await prisma.product.deleteMany(),
        await prisma.category.deleteMany()
    ])

    //? 2. Create Categories
    const { categories, products, users } = initialData;

    const categoriesData = categories.map((name) => ({ name }))
    await prisma.category.createMany({
        data: categoriesData
    })

    //? 3. Create Products
    const categoriesDB = await prisma.category.findMany();

    const categoriesMap = categoriesDB.reduce((map, category) => {
        map[category.name.toLowerCase()] = category.id;
        return map;
    }, {} as Record<string, string>); //<string=shirt, string=categoryID>

    products.forEach(async (product) => {

        const { type, images, ...rest } = product;

        const dbProduct = await prisma.product.create({
            data: {
                ...rest,
                categoryId: categoriesMap[type]
            }
        })

        // Images
        const imagesData = images.map(image => ({
            url: image,
            productId: dbProduct.id
        }));

        await prisma.productImage.createMany({
            data: imagesData
        });
    });

    //? 4. Create Users
    //! Porque toma la hora con 3 horas de diferencia?
    await prisma.user.createMany({
        data: users
    })

    console.log('Seed ejecutado correctamente..')
}



(() => {
    if (process.env.NODE_ENV === 'production') return;
    main();
})();