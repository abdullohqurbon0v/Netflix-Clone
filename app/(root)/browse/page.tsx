/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import Login from "@/components/shared/login";
import ManageAccount from "@/components/shared/manage-account";
import { useGlobalContext } from "@/context";
import { useSession } from "next-auth/react";
import React from "react";

const page = () => {
  const { account } = useGlobalContext();
  const { data: session } = useSession();
  console.log(session);
  if (session === null) {
    return <Login />;
  }
  if (account === null) {
    return <ManageAccount />;
  }
  return <div></div>;
};

export default page;
