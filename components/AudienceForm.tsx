"use client";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

import ConditionRow from "./ConditionRow";
import { AddIcon } from "./icons";

export default function AudienceForm() {
  const [name, setName] = useState("");
  const [conditions, setConditions] = useState([
    { field: "", operator: "", value: "", logic: "AND" },
  ]);
  const [segmentSize, setSegmentSize] = useState<number | null>(null);

  const router = useRouter();

  const handleConditionChange = (index: number, field: string, value: any) => {
    const newConditions = [...conditions];

    (newConditions[index] as any)[field] = value;
    setConditions(newConditions);
  };

  const handleAddCondition = () => {
    setConditions([
      ...conditions,
      { field: "", operator: "", value: "", logic: "AND" },
    ]);
  };

  const handleRemoveCondition = (index: number) => {
    const newConditions = conditions.filter((_, i) => i !== index);

    setConditions(newConditions);
  };

  const handleCreateSegment = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("User is not logged in");
      router.push("/login");

      return;
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/audiences`,
        {
          name,
          conditions,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSegmentSize(response.data.size);
      toast.success(
        `Segment "${name}" created successfully! Audience Size: ${response.data.size}`
      );
      router.push("/campaigns");
    } catch (error) {
      console.error(error);
      toast.error("Failed to create audience segment");
    }
  };

  return (
    <Card className="bg-blue-600" shadow="lg">
      <CardHeader className="text-center text-5xl font-extrabold justify-center text-white">
        Create Audience Segment
      </CardHeader>

      <CardBody className="gap-4 px-4">
        <Input
          isRequired
          placeholder="Segment Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {conditions.map((condition, index) => (
          <ConditionRow
            key={index}
            condition={condition}
            handleConditionChange={handleConditionChange}
            handleRemoveCondition={handleRemoveCondition}
            index={index}
          />
        ))}

        <Button
          className="bg-white font-bold mt-4"
          startContent={<AddIcon />}
          variant="solid"
          onClick={handleAddCondition}
        >
          Add Condition
        </Button>
        <Button
          className="bg-white font-bold mt-4"
          variant="solid"
          onClick={handleCreateSegment}
        >
          Create Segment
        </Button>

        {segmentSize !== null && <p>Audience Size: {segmentSize}</p>}
      </CardBody>
    </Card>
  );
}
