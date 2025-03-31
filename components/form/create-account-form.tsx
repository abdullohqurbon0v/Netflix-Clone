"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { createAcoountSchema } from "@/lib/validation";

const CreateAccountForm = () => {
  const form = useForm<z.infer<typeof createAcoountSchema>>({
    resolver: zodResolver(createAcoountSchema),
    defaultValues: {
      name: "",
      pin: "",
    },
  });

  const { isValid, isSubmitting } = form.formState;

  async function onSubmit(values: z.infer<typeof createAcoountSchema>) {
    console.log(values);
  }

  return (
    <div>
      <h1 className="text-white text-center font-bold text-3xl">
        Create your account
      </h1>
      <div className="w-full h-[2px] bg-slate-500/20 mb-4"></div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    autoComplete="off"
                    className="h-10"
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormDescription>
                  Your name is used to identify your account
                </FormDescription>
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="pin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>PIN code</FormLabel>
                <FormControl>
                  <InputOTP
                    maxLength={4}
                    value={field.value}
                    onChange={(value) => {
                      const numericValue = value.replace(/[^0-9]/g, "");
                      field.onChange(numericValue);
                    }}
                    disabled={isSubmitting}
                    inputMode="numeric"
                    pattern="[0-9]*"
                    className="focus-visible:ring-0"
                  >
                    <InputOTPGroup className="gap-3">
                      {[...Array(4)].map((_, index) => (
                        <InputOTPSlot
                          key={index}
                          index={index}
                          className={`
                            w-14 h-14 
                            text-xl 
                            bg-gray-800 
                            border-2 
                            border-gray-700
                            rounded-lg 
                            text-white 
                            font-semibold 
                            transition-all 
                            duration-200 
                            focus:border-blue-500 
                            focus:ring-2 
                            focus:ring-blue-500/20
                            disabled:opacity-50
                            shadow-md
                            hover:border-gray-600
                          `}
                        />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormDescription>
                  Your pin is used to identify your account (4 digits)
                </FormDescription>
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={!isValid || isSubmitting}
            className="w-full bg-red-600 hover:bg-red-500 flex justify-center items-center gap-2 text-white py-3 cursor-pointer"
          >
            Create account
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateAccountForm;
