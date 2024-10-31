"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function useSetParams() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Set or update multiple URL parameters, keeping previous ones intact
  return (newParams) => {
    const params = new URLSearchParams(searchParams.toString());

    // Add new parameters or update existing ones
    Object.entries(newParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.set(key, value);
      } else {
        params.delete(key); // remove param if value is null or undefined
      }
    });

    // Update the URL with combined parameters
    router.replace(`${pathname}?${params.toString()}`);
  };
}
