// import { auth } from "@/auth.config"; // Se comenta porque se uso el middleware authorized
// import { redirect } from "next/navigation"; // Se comenta porque se uso el middleware authorized

export default async function CheckOutLayout({ children }: {
    children: React.ReactNode;
}) {

    // Se comenta porque se uso el middleware authorized
    // const session = await auth();
    // if (!session?.user) {
    //     // redirect('/auth/login?callbackUrl=/profile');
    //     redirect('/auth/login');
    // }

    return (
        <>
            {children}
        </>
    );
}