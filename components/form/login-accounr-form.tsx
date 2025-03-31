import React, { useState } from "react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { Loader2 } from "lucide-react";

const LoginAccounrForm = () => {
  const [error, setError] = useState(false);
  const [pin, setPin] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (value: string) => {
    setIsLoading(true);
    console.log(value);
  };

  return (
    <div className="max-w-md mx-auto p-6 rounded-xl shadow-lg">
      <h1 className="text-gray-400 font-bold text-[16px] mb-4 text-center">
        Profile Lock is currently ON
      </h1>
      {error ? (
        <h2 className="text-red-500 text-center font-bold text-[20px] mb-6 animate-pulse">
          Whoops, wrong PIN. Please try again
        </h2>
      ) : (
        <h2 className="text-white text-center font-bold text-[20px] mb-6">
          Enter your PIN to access this profile
        </h2>
      )}

      <div className="flex items-center justify-center gap-4">
        <InputOTP
          maxLength={4}
          value={pin}
          onChange={(value) => {
            const numericValue = value.replace(/[^0-9]/g, "");
            setPin(numericValue);
          }}
          disabled={isLoading}
          inputMode="numeric"
          pattern="[0-9]*"
          onComplete={(value) => onSubmit(value)}
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
                  ${error ? "border-red-500" : "border-gray-700"}
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
        {isLoading && (
          <Loader2 className="animate-spin w-8 h-8 text-blue-500" />
        )}
      </div>
    </div>
  );
};

export default LoginAccounrForm;
