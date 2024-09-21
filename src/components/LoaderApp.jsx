"use client";
import { useState } from "react";
import { MultiStepLoader as Loader } from "./Loader";

const loadingStates = [
  {
    text: "Searching for a match",
  },
  {
    text: "On the verge to connect",
  },
  {
    text: "Just in time",
  },
  {
    text: "Making a secure gateway",
  },
  {
    text: "Get Ready for your randomly connection",
  },
  {
    text: "Getting Encrption ready",
  },
  {
    text: "Almost done",
  },
];

export function MultiStepLoaderDemo() {
  const [loading, setLoading] = useState(true);
  return (
    (<div className="w-full h-[100vh] flex items-center justify-center bg-[#343333] ">

      <Loader loadingStates={loadingStates} loading={loading} duration={1000} />
     
     
    </div>)
  );
}
