"use client";
import { signOut } from "next-auth/react";
import React from "react";

export default function SignoutHandle({ handleSignout }) {
  return (
    <>
      <button
        className="block w-full text-left py-2 px-4 -ml-4 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        onClick={() => {
          signOut({ callbackUrl: "/login" });
        }}
      >
        Sign Out
      </button>
    </>
  );
}
