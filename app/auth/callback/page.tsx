"use client";

import { Spinner } from "@nextui-org/spinner";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import toast from "react-hot-toast";

const Callback: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      localStorage.setItem("token", token);
      toast.success("Logged in successfully", { id: "logged in" });
      router.push("/audience");
    } else {
      toast.error("Some Error Occurred, Please try again");
      router.push("/login");
    }
  }, [router, searchParams]);

  return <Spinner size="lg" />;
};

export default function SuspendedCallback() {
  return (
    <Suspense fallback={<Spinner size="lg" />}>
      <Callback />
    </Suspense>
  );
}
