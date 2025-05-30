"use client";
import Link from "next/link";
import React, { FC, useEffect, useState } from "react";
import { LuMegaphone } from "react-icons/lu";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "../ui/skeleton";
import { Button, buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import { CalendarDays } from "lucide-react";

interface cardProps {
  title: string;
  description: string;
  date: Date;
  onClick?: () => void;
  id: string;
  to: string;
  className?: string;
}

const AnnouncementCard: FC<cardProps> = ({
  title,
  description,
  to,
  date,
  onClick,
  id,
  className,
}) => {
  return (
    <>
      <Card
        onClick={onClick}
        className={cn(
          "shadow-sm hover:shadow-md border h-full transition-all hover:-translate-y-1 duration-300",
          className
        )}
      >
        <CardHeader className="pb-2">
          <CardTitle className="font-bold text-lg">{title}</CardTitle>
          <div className="flex items-center text-gray-500 text-sm">
            <CalendarDays className="mr-1 w-3.5 h-3.5" />
            <span>
              Published on :{" "}
              {date &&
                date?.getFullYear() +
                  "/" +
                  date?.getMonth() +
                  "/" +
                  date?.getDay()}
            </span>{" "}
          </div>
        </CardHeader>

        <CardContent className="py-2">
          <p className="text-gray-600 text-sm line-clamp-3">{description}</p>
        </CardContent>
        <CardFooter className="pt-2">
          <Link
            href={to + "/" + id}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "text-blue-500 hover:text-blue-700 hover:underline"
            )}
          >
            Read More
          </Link>
        </CardFooter>
      </Card>
    </>
  );
};

/*
        
        {content}</p>
      </CardContent>
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="ml-auto text-red-600 hover:text-red-700 transition-all hover:translate-x-1"
        >
          <Link href={`/news/${slug}`}>Read More</Link>
        </Button>
      </CardFooter>
    </Card>

*/
export default AnnouncementCard;
