"use client";

import ModalWrapper from "@/components/modal/ModalWrapper";
import React, { useState } from "react";
import ForgotPasswordForm from "./ForgotPasswordForm";
import LoginForm from "./LoginForm";
import MainAuth from "./MainAuth";
import RegisterForm from "./RegisterForm";
import LegacyLoginForm from "./LegacyLoginForm";
import UpdateUserForm from "./UpdateUserForm";
import OldUserPhoneCheck from "./OldUserPhonecheck";
import { ArrowRight } from "lucide-react";

type AuthStep =
  | "phoneNumber"
  | "login"
  | "register"
  | "forgotPassword"
  | "legacyLogin"
  | "updateUser"
  | "oldUserPhoneCkeck";

type AuthStepControllerProps = {
  triggerButton: React.ReactNode;
  id?: string;
};

export default function AuthStepController({
  triggerButton,
  id = "",
}: AuthStepControllerProps) {
  const [step, setStep] = useState<AuthStep>("phoneNumber");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleNextStep = (nextStep: AuthStep, mobileValue?: string) => {
    if (mobileValue) setPhoneNumber(mobileValue);
    setStep(nextStep);
  };
  const handleForgotPassword = () => {
    setStep("forgotPassword");
  };

  const goBack = () => {
    setStep("phoneNumber");
    setPhoneNumber("");
  };

  return (
    <ModalWrapper
      modalId={"auth" + id}
      triggerButton={triggerButton}
      modalHeight="420px"
      modalWidth="410px"
      onClose={() => {
        setStep("phoneNumber");
        setPhoneNumber("");
      }}
    >
      <div className="h-full w-full p-8 px-4">
        {step === "phoneNumber" && <MainAuth onNextStep={handleNextStep} />}

        {step === "login" && (
          <>
            <LoginForm
              phoneNumber={phoneNumber}
              onForgotPassword={handleForgotPassword}
            />
            <div
              className="absolute cursor-pointer flex flex-row gap-1 top-6 right-6"
              onClick={goBack}
            >
              <ArrowRight />
              ویرایش شماره
            </div>
          </>
        )}

        {step === "register" && (
          <>
            <RegisterForm phoneNumber={phoneNumber} />
            <div
              className="absolute cursor-pointer flex flex-row gap-1 top-6 right-6"
              onClick={goBack}
            >
              <ArrowRight />
              ویرایش شماره
            </div>
          </>
        )}

        {step === "forgotPassword" && (
          <>
            <ForgotPasswordForm
              onBackAction={goBack}
              phoneNumber={phoneNumber}
            />
            <div
              className="absolute cursor-pointer flex flex-row gap-1 top-6 right-6"
              onClick={goBack}
            >
              <ArrowRight />
              بازگشت
            </div>
          </>
        )}

        {step === "legacyLogin" && (
          <>
            <LegacyLoginForm onNextStep={handleNextStep} />
            <div
              className="absolute cursor-pointer flex flex-row gap-1 top-6 right-6"
              onClick={goBack}
            >
              <ArrowRight />
              بازگشت
            </div>
          </>
        )}

        {step === "updateUser" && (
          <>
            <UpdateUserForm phoneNumber={phoneNumber} />
            <div
              className="absolute cursor-pointer flex flex-row gap-1 top-6 right-6"
              onClick={goBack}
            >
              <ArrowRight />
              ویرایش شماره
            </div>
          </>
        )}

        {step === "oldUserPhoneCkeck" && (
          <>
            <OldUserPhoneCheck onNextStep={handleNextStep} />
            <div
              className="absolute cursor-pointer flex flex-row gap-1 top-6 right-6"
              onClick={goBack}
            >
              <ArrowRight />
              بازگشت
            </div>
          </>
        )}
      </div>
    </ModalWrapper>
  );
}
