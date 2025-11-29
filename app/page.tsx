import { getServerAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function Home() {
  const session = await getServerAuthSession();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 dark:bg-black px-4">
      <main className="flex min-h-screen w-full max-w-4xl flex-col items-center justify-center py-16">
        <div className="flex flex-col items-center gap-8 text-center">
          <h1 className="text-5xl font-bold leading-tight tracking-tight text-black dark:text-zinc-50 sm:text-6xl">
            Welcome to Litmers
          </h1>
          <p className="max-w-2xl text-xl leading-8 text-zinc-600 dark:text-zinc-400">
            Your platform for managing and organizing your work. Get started
            today and experience a seamless workflow.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              href="/signup"
              className="flex h-12 w-full items-center justify-center rounded-full bg-blue-600 px-8 text-white transition-colors hover:bg-blue-700 sm:w-auto"
            >
              Get Started
            </Link>
            <Link
              href="/login"
              className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-gray-300 dark:border-gray-600 px-8 text-gray-700 dark:text-gray-300 transition-colors hover:bg-gray-50 dark:hover:bg-zinc-800 sm:w-auto"
            >
              Sign In
            </Link>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div className="rounded-lg bg-white dark:bg-zinc-900 p-6 shadow">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Secure Authentication
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Sign in with email or Google for a secure experience.
            </p>
          </div>
          <div className="rounded-lg bg-white dark:bg-zinc-900 p-6 shadow">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              User Dashboard
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Access your personalized dashboard with all your information.
            </p>
          </div>
          <div className="rounded-lg bg-white dark:bg-zinc-900 p-6 shadow">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Profile Management
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your profile and account settings easily.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
