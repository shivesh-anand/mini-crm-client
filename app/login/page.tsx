"use client";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardHeader } from "@nextui-org/card";

import { GoogleIcon } from "@/components/icons";

const LoginPage = () => {
  const handleLogin = () => {
    //console.log("Backend URL:", process.env.NEXT_PUBLIC_BACKEND_URL);
    window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/google`;
  };

  return (
    <Card className="bg-blue-600 text-white" fullWidth={true} shadow="lg">
      <CardHeader className="text-center text-5xl font-extrabold justify-center">
        Sign In
      </CardHeader>
      <CardBody className="items-center justify-center">
        <form className="flex flex-col py-4 px-4 gap-4 w-full">
          <Button
            className="font-bold text-lg w-full bg-white"
            radius="full"
            size="lg"
            startContent={<GoogleIcon />}
            variant="solid"
            onPress={handleLogin}
          >
            Sign In with Google
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default LoginPage;
