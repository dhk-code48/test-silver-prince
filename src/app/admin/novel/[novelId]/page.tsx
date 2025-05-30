import React, { FC } from "react";
import AdminNovelClient from "./_components/novel-client";

interface pageProps {
  params: Promise<{
    novelId: string;
  }>;
}

const AdminNovel: FC<pageProps> = async (props) => {
  const params = await props.params;

  return <AdminNovelClient params={params} />;
};

export default AdminNovel;
