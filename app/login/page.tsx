"use client";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Link } from "@nextui-org/link";
import { signIn } from "next-auth/react";

import { GoogleIcon } from "@/components/icons";

const LoginPage = () => {
  const handleLogIn = () => {
    signIn("google", {
      callbackUrl: "/audience",
    });
  };

  return (
    <Card className="bg-blue-600 text-white" fullWidth={true} shadow="lg">
      <CardHeader className="text-center text-5xl font-extrabold justify-center">
        Log In
      </CardHeader>
      <CardBody className="items-center justify-center">
        <form className="flex flex-col py-4 px-4 gap-4 w-full">
          <Button
            className="font-bold text-lg w-full bg-white"
            radius="full"
            size="lg"
            startContent={<GoogleIcon />}
            variant="solid"
            onPress={handleLogIn}
          >
            Login with Google
          </Button>
        </form>
      </CardBody>
      <CardFooter className="justify-center">
        Don&apos;t have an account yet?
        <Link
          showAnchorIcon
          className="px-4 font-bold text-lg text-white"
          href="/signup"
        >
          Sign Up
        </Link>
      </CardFooter>
    </Card>
  );
};

export default LoginPage;
