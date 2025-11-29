import { getServerAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { SignOutButton } from "@/components/SignOutButton";

export default async function DashboardPage() {
  const session = await getServerAuthSession();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Welcome back, {session.user.name || session.user.email}!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-zinc-900 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Profile Information
            </h2>
            <div className="space-y-2">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                <p className="text-gray-900 dark:text-white">
                  {session.user.email}
                </p>
              </div>
              {session.user.name && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Name
                  </p>
                  <p className="text-gray-900 dark:text-white">
                    {session.user.name}
                  </p>
                </div>
              )}
            </div>
            <Link
              href="/profile"
              className="mt-4 inline-block text-blue-600 hover:text-blue-700 dark:text-blue-400 text-sm font-medium"
            >
              View Profile →
            </Link>
          </div>

          <div className="bg-white dark:bg-zinc-900 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Quick Actions
            </h2>
            <div className="space-y-3">
              <button className="w-full text-left px-4 py-2 rounded-md bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                Create New Item
              </button>
              <button className="w-full text-left px-4 py-2 rounded-md bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                View All Items
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-zinc-900 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Account Settings
            </h2>
            <div className="space-y-3">
              <Link
                href="/profile"
                className="block w-full text-left px-4 py-2 rounded-md bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                Edit Profile
              </Link>
              <SignOutButton className="w-full text-left px-4 py-2 rounded-md bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors">
                Sign Out
              </SignOutButton>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white dark:bg-zinc-900 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Recent Activity
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            No recent activity to display.
          </p>
        </div>
      </div>
    </div>
  );
}

