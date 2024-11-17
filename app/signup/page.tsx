"use client";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Link } from "@nextui-org/link";
import { GoogleIcon } from "@/components/icons";
import { signIn } from "next-auth/react";

const SignUpPage = () => {
  const handleSignUp = () => {
    signIn("google", {
      callbackUrl: "/audience",
    });
  };

  return (
    <Card className="bg-blue-50" fullWidth={true} shadow="lg">
      <CardHeader className="text-center text-5xl font-extrabold justify-center">
        Sign Up
      </CardHeader>
      <CardBody className="items-center justify-center">
        <form className="flex flex-col py-4 px-4 gap-4 w-full">
          <Button
            className="font-bold text-lg w-full text-white bg-blue-600"
            size="lg"
            startContent={<GoogleIcon />}
            variant="solid"
            radius="full"
            onPress={handleSignUp}
          >
            Sign Up with Google
          </Button>
        </form>
      </CardBody>
      <CardFooter className="justify-center">
        Already have an account?
        <Link showAnchorIcon className="px-4 font-bold text-lg" href="/login">
          Log In
        </Link>
      </CardFooter>
    </Card>
  );
};

export default SignUpPage;
