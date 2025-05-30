"use client";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import NovelComments from "../App/Navbar/NovelComments";

interface ReaderCommentsProps {
  chapId: string;
  novelId: string;
  novelTitle: string;
  volId: string;
  showComments: boolean;
  setShowComments: (show: boolean) => void;
}

export function ReaderComments({
  chapId,
  novelId,
  novelTitle,
  volId,
  showComments,
  setShowComments,
}: ReaderCommentsProps) {
  if (!chapId || !volId) {
    return null;
  }

  return (
    <>
      <Drawer open={showComments} onOpenChange={setShowComments}>
        <DrawerContent className="max-h-[85vh]">
          <DrawerHeader>
            <DrawerTitle className="font-bold text-xl">Comments</DrawerTitle>
          </DrawerHeader>
          <div className="px-4 pb-4">
            <NovelComments
              chapId={chapId}
              novelId={novelId}
              novelTitle={novelTitle}
              volId={volId}
            />
          </div>
        </DrawerContent>
      </Drawer>

      {/* Mobile comment button */}
      <div className="md:hidden flex justify-center mt-8 container">
        <Button onClick={() => setShowComments(true)} className="w-full">
          <MessageSquare className="mr-2 w-4 h-4" />
          View Comments
        </Button>
      </div>

      {/* Desktop comments section */}
      <div className="hidden md:block mx-auto mt-16 max-w-3xl container">
        <h2 className="mb-6 font-bold text-2xl">Comments</h2>
        <NovelComments
          chapId={chapId}
          novelId={novelId}
          novelTitle={novelTitle}
          volId={volId}
        />
      </div>
    </>
  );
}
