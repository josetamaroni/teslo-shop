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
            <Title title="My Profile" />

            <div className="max-w-2xl m-auto mt-4">
                <div className="px-4 py-6 m-2 bg-white rounded-lg shadow">
                    <div className="flex items-center space-x-4">
                        <img
                            src={session.user?.image ?? '/imgs/avatar.jpeg'}
                            alt="Profile"
                            className="w-20 h-20 rounded-full"
                        />
                        <div>
                            <h2 className="text-2xl font-bold">{session.user?.name ?? 'User'}</h2>
                            <p className="text-gray-600 mb-1">{session.user?.email}</p>
                            {
                                !!session.user?.emailVerified
                                    ? <span className="text-green-700 border border-green-700 rounded-full p-1 text-xs">Verficated</span>
                                    : <span className="text-red-700 border border-red-700 rounded-full p-1 text-xs">Not verificated</span>
                            }

                        </div>
                    </div>

                    <div className="mt-5">
                        <h3 className="text-lg font-semibold mb-2">Account Information</h3>
                        <div className="grid grid-cols-1 gap-4">
                            <div className="p-4 rounded bg-gray-50">
                                <p className="text-sm text-gray-500">Role</p>
                                <p className="font-medium">{session.user?.role ?? 'User'}</p>
                            </div>
                            <div className="p-4 rounded bg-gray-50">
                                <p className="text-sm text-gray-500">Member Since</p>
                                <p className="font-medium">
                                    {session.user?.createdAt ? new Date(session.user?.createdAt).toLocaleDateString() : 'N/A'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



            {/* <pre>
                {
                    JSON.stringify(session, null, 4)
                }
            </pre> */}
        </div>
    )
}
