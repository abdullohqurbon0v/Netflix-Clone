"use client";

import React, { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { createAccountSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PinInput from "react-pin-input";
import axios from "axios";
import { AccountProps, AccountResponse } from "@/types";
import { toast } from "@/components/ui/use-toast";

interface Props {
  uid: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setAccounts: Dispatch<SetStateAction<AccountProps[]>>;
  accounts: AccountProps[];
}
const CreateAccountForm = ({ uid, setOpen, setAccounts, accounts }: Props) => {
  const form = useForm<z.infer<typeof createAccountSchema>>({
    resolver: zodResolver(createAccountSchema),
    defaultValues: { name: "", pin: "" },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values: z.infer<typeof createAccountSchema>) {
    try {
      const { data } = await axios.post<AccountResponse>("/api/account", {
        ...values,
        uid,
      });
      console.log(data);
      if (data.success) {
        setOpen(false);
        form.reset();
        console.log(data);
        setAccounts([...accounts, data.data as AccountProps]);
        return toast({
          title: "Account created successfully",
          description: "Your account has been created successfully",
        });
      } else {
        return toast({
          title: "Error",
          description: data.message,
          variant: "destructive",
        });
      }
    } catch (e) {
      console.log(e);
      return toast({
        title: "Error",
        description: "An error occurred while creating your account",
        variant: "destructive",
      });
    }
  }

  return (
    <>
      <h1 className={"text-white text-center font-bold text-3xl"}>
        Create your account
      </h1>

      <div className={"w-full h-[2px] bg-slate-500/20 mb-4"} />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-3"}>
          <FormField
            control={form.control}
            name={"name"}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    autoComplete={"off"}
                    className={"h-[56px]"}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormDescription>
                  Your name is used to identify your account.
                </FormDescription>
                <FormMessage className={"text-red-600"} />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={"pin"}
            render={({ field }) => (
              <FormItem>
                <FormLabel>PIN Code</FormLabel>
                <FormControl>
                  <PinInput
                    length={4}
                    initialValue={field.value}
                    secret
                    disabled={isSubmitting}
                    secretDelay={100}
                    onChange={(value) => field.onChange(value)}
                    type={"numeric"}
                    inputMode={"number"}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(4, 1fr)",
                      gap: "10px",
                    }}
                    inputStyle={{
                      borderColor: "RGBA(255, 255, 255, 0.16)",
                      height: "56px",
                      width: "100%",
                      fontSize: "40px",
                    }}
                    inputFocusStyle={{
                      borderColor: "RGBA(255, 255, 255, 0.80)",
                    }}
                    autoSelect={true}
                  />
                </FormControl>
                <FormDescription>
                  Your pin is used to identify your account.
                </FormDescription>
                <FormMessage className={"text-red-600"} />
              </FormItem>
            )}
          />

          <Button
            className={
              "w-full bg-red-600 hover:bg-red-700 flex justify-center items-center h-[56px] !text-white mt-4"
            }
            disabled={isSubmitting}
            type={"submit"}
          >
            Create account
          </Button>
        </form>
      </Form>
    </>
  );
};

export default CreateAccountForm;
