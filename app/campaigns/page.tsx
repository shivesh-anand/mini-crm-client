"use client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useEffect } from "react";

import CampaignHistory from "@/components/CampaignHistory";

export default function CampaignPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("User is not logged in");
      router.push("/login");
    }
  }, [router]);

  return <CampaignHistory />;
}
