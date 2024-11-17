"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";
import { Spinner } from "@nextui-org/spinner";
import { Card, CardHeader } from "@nextui-org/card";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import toast from "react-hot-toast";

interface CampaignStats {
  segmentId: string;
  segmentName: string;
  audienceSize: number;
  sentMessages: number;
  failedMessages: number;
  pendingMessages: number;
  totalMessages: number;
  createdAt: string;
}

export default function CampaignHistory() {
  const [campaignStats, setCampaignStats] = useState<CampaignStats[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [statusMessage, setStatusMessage] = useState<string>("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedSegment, setSelectedSegment] = useState<string | null>(null);

  useEffect(() => {
    const fetchCampaignStats = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/campaigns`
        );

        console.log(response.data);
        setCampaignStats(response.data);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchCampaignStats();
  }, []);

  const columns = [
    { key: "segmentName", label: "SEGMENT NAME" },
    { key: "audienceSize", label: "AUDIENCE SIZE" },
    { key: "sentMessages", label: "SENT MESSAGES" },
    { key: "failedMessages", label: "FAILED MESSAGES" },
    { key: "pendingMessages", label: "PENDING MESSAGES" },
    { key: "createdAt", label: "SENT AT" },
    { key: "sendMessage", label: "SEND MESSAGE" },
  ];

  const handleSendMessage = async () => {
    if (!message || !selectedSegment) {
      toast.error("Please enter a message and select a segment.");
      setStatusMessage("Please enter a message and select a segment.");

      return;
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/send-messages`,
        {
          audienceId: selectedSegment,
          messageBody: message,
        }
      );

      setStatusMessage(response.data.message);
      toast.success("Message sent successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Failed to send message:", error);
      setStatusMessage("Failed to send the message.");
    } finally {
      setMessage("");
    }
  };

  return (
    <Card className="container mx-auto p-8 text-center bg-blue-600" shadow="lg">
      <CardHeader className="text-5xl font-bold mb-6 text-white">
        All Campaign Stats
      </CardHeader>
      {loading ? (
        <Spinner />
      ) : (
        <Table aria-label="Campaign Stats Table" selectionMode="none">
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            )}
          </TableHeader>
          <TableBody items={campaignStats}>
            {(item) => (
              <TableRow key={item.segmentId}>
                {(columnKey) => {
                  if (columnKey === "sendMessage") {
                    return (
                      <TableCell>
                        <Button
                          onPress={() => {
                            setSelectedSegment(item.segmentId);
                            onOpen();
                          }}
                        >
                          Send Message
                        </Button>
                      </TableCell>
                    );
                  }

                  return (
                    <TableCell>
                      {columnKey === "createdAt"
                        ? new Date(item.createdAt).toLocaleString()
                        : item[columnKey as keyof CampaignStats]}
                    </TableCell>
                  );
                }}
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}

      <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Send Message
              </ModalHeader>
              <ModalBody>
                <Input
                  fullWidth
                  label="Message"
                  placeholder="Enter your message"
                  value={message}
                  variant="bordered"
                  onChange={(e) => setMessage(e.target.value)}
                />
                {statusMessage && (
                  <div className="text-red-600 mt-2">{statusMessage}</div>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={handleSendMessage}>
                  Send Message
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </Card>
  );
}
