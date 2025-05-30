"use client";
import React, { FC, useEffect } from "react";
import { Button } from "../ui/button";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import MainNav from "./MainNav";
import ThemeToggle from "../App/ThemeToggle";
import { useRouter } from "next/navigation";
import { AiOutlineLoading } from "react-icons/ai";

interface label {
  label: "admin" | "novel" | "news";
}

const MenuBar: FC<label> = ({ label }) => {
  const { user, isLoading, isAdmin } = useAuth();
  const route = useRouter();

  useEffect(() => {
    if (isLoading === false) {
      if (isAdmin === false) {
        route.push("/auth/signin");
      }
    }
  }, [isLoading, isAdmin, route]);

  return (
    <>
      <div className="top-0 z-10 fixed flex items-center bg-background px-10 border-b w-full h-20">
        <Button variant="outline" className="px-4 py-2 whitespace-nowrap">
          <Image
            src={user?.photoURL || "/logo.png"}
            width={25}
            height={25}
            className="mr-2 rounded-full"
            alt="user profile"
          />
          {user?.displayName}
        </Button>
        <MainNav label={label} />
        <div className="flex items-center space-x-4 ml-auto">
          <ThemeToggle />
        </div>
      </div>
    </>
  );
};

export default MenuBar;
