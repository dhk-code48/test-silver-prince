"use client";
import InfoCard from "@/components/Admin/InfoCard";
import MenuBar from "@/components/Admin/MenuBar";
import BasicSkeleton from "@/components/Skleaton";
import { useAuth } from "@/context/AuthContext";
import React, { FC } from "react";
import { LuBook, LuUser } from "react-icons/lu";

const Admin: FC = () => {
  const { isLoading } = useAuth();

  return (
    <>
      {isLoading ? (
        <div className="flex flex-col justify-center items-center gap-10">
          <BasicSkeleton />
          <BasicSkeleton />
        </div>
      ) : (
        <div className="p-10">
          <h2 className="font-bold text-3xl tracking-tight">Dashboard</h2>
          <div className="flex flex-wrap gap-4 mt-5">
            <InfoCard icon={<LuBook />} number={2} title="Total Novel" />
            <InfoCard icon={<LuUser />} number={2} title="Total User" />
          </div>
        </div>
      )}
    </>
  );
};

export default Admin;
