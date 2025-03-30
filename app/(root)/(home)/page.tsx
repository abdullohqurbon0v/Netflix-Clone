/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { useGlobalContext } from "@/context";
import { redirect } from "next/navigation";

const page = () => {
  const { account } = useGlobalContext();
  console.log(account);
  return redirect("/browse");
};

export default page;
