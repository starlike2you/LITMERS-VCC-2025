import { getServerAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { SignOutButton } from "@/components/SignOutButton";

export default async function ProfilePage() {
  const session = await getServerAuthSession();

  if (!session?.user) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email! },
  });

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link
            href="/dashboard"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 text-sm font-medium"
          >
            ← Back to Dashboard
          </Link>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Profile
          </h1>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email
              </label>
              <p className="text-gray-900 dark:text-white">{user?.email}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Name
              </label>
              <p className="text-gray-900 dark:text-white">
                {user?.name || "Not set"}
              </p>
            </div>

            {user?.image && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Profile Image
                </label>
                <img
                  src={user.image}
                  alt="Profile"
                  className="w-24 h-24 rounded-full"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Account Created
              </label>
              <p className="text-gray-900 dark:text-white">
                {user?.createdAt
                  ? new Date(user.createdAt).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>

            <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Account Actions
              </h2>
              <div className="space-y-3">
                <SignOutButton className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors">
                  Sign Out
                </SignOutButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

