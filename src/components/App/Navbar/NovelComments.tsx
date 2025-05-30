"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/context/AuthContext";
import addComment from "@/firebase/Create/addComment";
import useComments from "@/firebase/Read/getComments";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import React, { FC, useState } from "react";
import { LuSend, LuX } from "react-icons/lu";

interface pagePros {
  volId: string;
  novelId: string;
  chapId: string;
  novelTitle: string;
}
const NovelComments: FC<pagePros> = ({ volId, novelId, chapId, novelTitle }) => {
  const { isLoggedIn, user } = useAuth();
  const [newComment, setNewComment] = useState<string>("");
  const [focusState, setFocusState] = useState<boolean>(false);
  const comments = useComments(novelId, volId, chapId);

  function handleCommentAddition() {
    if (volId && chapId && user?.displayName && isLoggedIn && newComment.length > 1) {
      addComment({
        volId: volId,
        chapterId: chapId,
        message: newComment,
        novelId: novelId,
        user: user,
        novelTitle: novelTitle,
      });

      setNewComment("");
    }
  }
  return (
    <div className="mt-10">
      {isLoggedIn ? (
        <div className="flex items-center mt-5 lg:p-5 pb-3">
          <Image
            alt="user profile"
            src={user?.photoURL || "/logo.png"}
            width={48}
            height={48}
            className="rounded-full"
          />
          <div className="relative w-full">
            <Textarea
              rows={3}
              onFocus={() => setFocusState(true)}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Enter your Comment..."
              className="mx-2 lg:mx-5 py-2 focus:border-b-2 focus:border-blue-300 outline-none w-full font-body"
            />
            {focusState && (
              <div className="right-2 bottom-2 absolute flex justify-end items-center mt-1 w-full">
                <div
                  onClick={() => {
                    setNewComment("");
                    setFocusState(false);
                  }}
                  className="flex justify-center items-center bg-red-500 mx-1 rounded-lg w-8 h-8 text-white"
                >
                  <LuX size={18} />
                </div>
                <div
                  onClick={handleCommentAddition}
                  className="flex justify-center items-center bg-blue-500 mx-1 rounded-lg w-8 h-8 text-white"
                >
                  <LuSend size={18} />
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <Link href={"/auth/signin"} className={buttonVariants()}>
          Login To Comment
        </Link>
      )}
      {comments !== null &&
        comments.map((comment, index) => {
          return (
            <div className="my-5" key={comment.id + index}>
              <div className="flex items-start gap-2">
                <Image src={comment.photoUrl} width={40} height={40} alt="commenter profile" className="rounded-full" />
                <div>
                  <p className="font-bold text-muted-foreground">{comment.displayName}</p>
                  <p className="text-muted-foreground text-sm">
                    {comment.timestamp && moment(comment.timestamp.toDate()).fromNow()}
                  </p>
                </div>
              </div>
              <p className="mt-1 ml-11">{comment.message}</p>
            </div>
          );
        })}
    </div>
  );
};

export default NovelComments;
