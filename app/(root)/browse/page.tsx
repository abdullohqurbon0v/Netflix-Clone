/* eslint-disable react-hooks/rules-of-hooks */
import Login from "@/components/shared/login";
import { useGlobalContext } from "@/context";
import React from "react";

const page = () => {
  const { account } = useGlobalContext();

  if (account === null) {
    return <Login />;
  }
  return <div></div>;
};

export default page;
