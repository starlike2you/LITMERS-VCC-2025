"use client";

import { signOut } from "next-auth/react";

interface SignOutButtonProps {
  className?: string;
  children: React.ReactNode;
}

export function SignOutButton({ className, children }: SignOutButtonProps) {
  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <button onClick={handleSignOut} className={className}>
      {children}
    </button>
  );
}

