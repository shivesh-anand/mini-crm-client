"use client";

import { Spinner } from "@nextui-org/spinner";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

const Callback: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      try {
        localStorage.setItem("token", token);
        toast.success("Logged in successfully", { id: "logged-in" });
        router.push("/audience");
      } catch (error) {
        console.error("Token storage error:", error);
        toast.error("Failed to store token. Please try again.");
        router.push("/login");
      }
    } else {
      toast.error("Some error occurred. Please try again.");
      router.push("/login");
    }
  }, [router, searchParams]);

  return <Spinner size="lg" />;
};

export default Callback;
