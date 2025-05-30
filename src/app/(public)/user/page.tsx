"use client";

import { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Mail, LogOut, Trash2, Eye, MoreVertical, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import MaxWidthWrapper from "@/components/shared/max-width-wrapper";

import { signOut } from "firebase/auth";
import { auth, db } from "@/lib/firebaseConfig";
import { useCollectionQuery, useDocumentQuery } from "@tanstack-query-firebase/react/firestore";
import { collection, deleteDoc, doc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import UserAvatar from "@/components/shared/user-avatar";
import { ProtectedRoute } from "@/components/shared/protected-route";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

// Mock data types
interface UserComment {
  id: string;
  message: string;
  novelTitle: string;
  chapterTitle: string;
  timestamp: Date;
  novelId: string;
  volId: string;
  chapterId: string;
}

export default function ProfilePage() {
  const { isLoggedIn, isLoading, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn && !isLoading) {
      router.push("/auth/signin");
    }
  }, [isLoggedIn, isLoading, router]);

  const docRef = useMemo(() => collection(db, "Users", user?.uid || "-", "Comments"), [user?.uid]);

  const {
    data,
    refetch,
    isLoading: commentLoading,
  } = useCollectionQuery(docRef, {
    queryKey: ["UserComment"],
  });

  const userComments = data?.docs.map((doc) => doc.data() as UserComment) || [];

  const handleDeleteComment = async (comment: UserComment) => {
    if (!user?.uid) return;
    try {
      refetch();

      const allPromise = Promise.all([
        deleteDoc(doc(db, "Users", user.uid, "Comments", comment.id)),
        deleteDoc(doc(db, "Novels", comment.novelId, "Volumes", comment.volId, "Chapters", comment.chapterId)),
      ]);

      toast.promise(allPromise, {
        loading: "Deleting Comment",
        success: "Comment Deleted!",
        error: "Unexpected Error!",
      });
    } catch (error) {
      toast.error("Unexpected Error!");
    }
  };

  const formatDate = (date: Date) => {
    return date?.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <ProtectedRoute requireEmailVerification>
      <div className="bg-background min-h-screen">
        <MaxWidthWrapper className="z-10 relative py-8">
          {/* Profile Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <Card className="bg-card/50 shadow-xl backdrop-blur-sm border-border">
              <CardContent className="p-8">
                <div className="flex md:flex-row flex-col md:items-center gap-6">
                  <div className="relative">
                    <UserAvatar size="large" displayName={user?.displayName} photoURL={user?.photoURL} />
                    <div className="-right-2 -bottom-2 absolute flex justify-center items-center bg-green-500 border-4 border-background rounded-full w-8 h-8">
                      <div className="bg-white rounded-full w-3 h-3" />
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex md:flex-row flex-col md:justify-between md:items-center gap-4">
                      <div>
                        <h1 className="mb-2 font-bold text-foreground text-3xl">{user?.displayName}</h1>

                        <div className="flex flex-wrap items-center gap-4 text-muted-foreground text-sm">
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            <span>{user?.email}</span>
                          </div>
                        </div>
                      </div>

                      <Button
                        variant="secondary"
                        className="cursor-pointer"
                        size="icon"
                        onClick={() => router.push("/profile")}
                      >
                        <Settings className="size-6 text-muted-foreground" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-2 lg:col-span-2"
          >
            <p className="flex items-center gap-3">
              <MessageCircle className="w-4 h-4" />
              My Comments ({userComments.length})
            </p>
            {commentLoading ? (
              <Card className="bg-card/50 backdrop-blur-sm border-border">
                {" "}
                <CardHeader>
                  <div className="flex md:flex-row flex-col md:justify-between md:items-center gap-4">
                    <CardTitle>My Comments</CardTitle>
                  </div>
                </CardHeader>{" "}
                <CardContent>
                  <div className="place-content-center grid size-full">
                    <LoadingSpinner />
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-card/50 backdrop-blur-sm border-border">
                <CardHeader>
                  <div className="flex md:flex-row flex-col md:justify-between md:items-center gap-4">
                    <CardTitle>My Comments</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  {userComments.length === 0 ? (
                    <div className="py-12 text-center">
                      <MessageCircle className="mx-auto mb-4 w-12 h-12 text-muted-foreground" />
                      <h3 className="mb-2 font-semibold text-foreground text-lg">No comments found</h3>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {userComments.map((comment) => (
                        <div
                          key={comment.id + comment.message}
                          className="bg-background/50 hover:bg-background/80 p-4 border border-border rounded-lg transition-colors"
                        >
                          <div className="flex justify-between items-start gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <Badge variant="outline" className="text-xs">
                                  {comment.novelTitle}
                                </Badge>
                                <span className="text-muted-foreground text-xs">•</span>
                                <span className="text-muted-foreground text-xs">{comment.chapterTitle}</span>
                              </div>
                              <p className="mb-3 text-foreground leading-relaxed">{comment.message}</p>
                              <div className="flex items-center gap-4 text-muted-foreground text-xs">
                                <span>{formatDate(comment.timestamp)}</span>
                              </div>
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreVertical className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Eye className="mr-2 w-4 h-4" />
                                  View Chapter
                                </DropdownMenuItem>
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                      <Trash2 className="mr-2 w-4 h-4" />
                                      Delete Comment
                                    </DropdownMenuItem>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Delete Comment</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Are you sure you want to delete this comment? This action cannot be undone.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                      <AlertDialogAction
                                        onClick={() => handleDeleteComment(comment)}
                                        className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                                      >
                                        Delete
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </motion.div>
        </MaxWidthWrapper>
      </div>
    </ProtectedRoute>
  );
}
