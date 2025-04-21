// import { auth } from "@/auth.config"; // Se comenta porque se uso el middleware authorized
// import { redirect } from "next/navigation"; // Se comenta porque se uso el middleware authorized

export default async function AuthLayout({
	children
}: {
	children: React.ReactNode;
}) {

	// Se comenta porque se uso el middleware authorized
	// const session = await auth();
	// if (session?.user) {
	// 	redirect('/');
	// }

	return (
		<main className="flex justify-center">
			<div className="w-full sm:w-[350px] px-10">
				{children}
			</div>
		</main>
	);
}