import { redirect } from "next/navigation";
import { auth } from "@/auth.config";
import { Title } from "@/components";

export default async function ProfilePage() {

    const session = await auth();

    if (!session?.user) {
        // redirect('/auth/login?callbackUrl=/profile');
        redirect('/auth/login');
    }

    return (
        <div>
            <Title title="Profile" />
            <pre>
                {
                    JSON.stringify(session, null, 4)
                }
            </pre>
        </div>
    )
}
