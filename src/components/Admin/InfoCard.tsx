import React, { FC } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface cardProp {
  title: string;
  icon: React.ReactNode;
  number: number;
}

const InfoCard: FC<cardProp> = ({ number, title, icon }) => {
  return (
    <Card className="w-[300px]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{number}</div>
      </CardContent>
    </Card>
  );
};

export default InfoCard;
