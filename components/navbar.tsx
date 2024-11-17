"use client";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import {
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Navbar as NextUINavbar,
} from "@nextui-org/navbar";
import { link as linkStyles } from "@nextui-org/theme";
import clsx from "clsx";
import NextLink from "next/link";
import { Image } from "@nextui-org/image";
import { useSession, signOut } from "next-auth/react";
import { Spinner } from "@nextui-org/spinner";

import { SignIn } from "@/components/icons";
import { siteConfig } from "@/config/site";

export const Navbar = () => {
  const { data: session, status } = useSession();

  console.log(session);

  if (status === "loading") return <Spinner />;

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    window.location.href = "/";
  };

  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Image alt="Logo" radius="none" src="/xeno.svg" width={100} />
          </NextLink>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-4 justify-start ml-2">
          {session &&
            siteConfig.navItems.map((item) => (
              <NavbarItem key={item.href}>
                <NextLink
                  className={clsx(
                    linkStyles({ color: "foreground" }),
                    "data-[active=true]:text-primary data-[active=true]:font-medium"
                  )}
                  color="foreground"
                  href={item.href}
                >
                  {item.label}
                </NextLink>
              </NavbarItem>
            ))}
        </ul>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden md:flex">
          {session ? (
            <Button
              className="text-sm font-normal"
              color="danger"
              radius="full"
              size="lg"
              onClick={handleSignOut}
            >
              Sign Out
            </Button>
          ) : (
            <Button
              as={Link}
              className="text-sm font-normal"
              color="primary"
              href="/login"
              radius="full"
              size="lg"
              startContent={<SignIn />}
            >
              Sign In
            </Button>
          )}
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {session &&
            siteConfig.navMenuItems.map((item, index) => (
              <NavbarMenuItem key={`${item}-${index}`}>
                <Link color="foreground" href="#" size="lg">
                  {item.label}
                </Link>
              </NavbarMenuItem>
            ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
