import { FaEllipsisVertical } from "react-icons/fa6";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FC } from "react";
import ThemeToggle from "../ThemeToggle";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import UserAvatar from "@/components/shared/user-avatar";

const DropDown: FC = () => {
  const { isLoggedIn, isLoading, user } = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="my-auto">
        <Button variant="outline" className="p-0 border-0 h-auto">
          <FaEllipsisVertical size={24} className="text-slate-700 dark:text-slate-400" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>The Silver Prince</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            {isLoggedIn ? (
              <UserAvatar displayName={user?.displayName} photoURL={user?.photoURL} />
            ) : (
              <Link href={"/auth/signin"}>
                <Button isLoading={isLoading}>Login</Button>
              </Link>
            )}
          </DropdownMenuItem>

          <DropdownMenuItem>
            <ThemeToggle />
            <span className="ml-2">Theme Toggle</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default DropDown;
