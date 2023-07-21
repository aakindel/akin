import React from "react";
import { Button } from "../Button";
import { cn } from "@/utils";

const MiniProjectDisplay = () => {
  return (
    <div
      className={cn(
        "rounded-[48px]",
        "overflow-hidden",
        "group relative flex h-[480px] w-full cursor-pointer dark:bg-white/5"
      )}
    >
      <div
        className={cn(
          "backdrop-blur-[4px]",
          "absolute bottom-0 left-0 right-0 top-0 z-30 flex h-[480px] w-full bg-[rgba(0,_0,_0,_0.05)] dark:bg-white/5"
        )}
      ></div>
      <div
        className={cn(
          "opacity-0 backdrop-blur-[3px] transition-opacity hover:opacity-100",
          "absolute bottom-0 left-0 right-0 top-0 z-40 flex h-[480px] w-full bg-transparent"
        )}
      ></div>
      <picture className="overflow-hidden">
        <img
          className="absolute bottom-0 left-0 right-0 top-0 block h-full w-full overflow-hidden object-cover backdrop-blur-[32px] dark:hidden"
          alt="mini project display screenshot"
          src="/mini-projects/mpd/mpd-light-micro.png"
        ></img>
      </picture>
      <picture className="overflow-hidden">
        <img
          className="relative block h-full w-full overflow-hidden object-cover dark:hidden"
          alt="mini project display screenshot"
          src="/mini-projects/mpd/mpd-light.png"
        ></img>
      </picture>
      <picture className="overflow-hidden">
        <img
          className="absolute bottom-0 left-0 right-0 top-0 hidden h-full w-full overflow-hidden object-cover backdrop-blur-[32px] dark:block"
          alt="mini project display screenshot"
          src="/mini-projects/mpd/mpd-dark-micro.png"
        ></img>
      </picture>
      <picture className="overflow-hidden">
        <img
          className="relative hidden h-full w-full overflow-hidden object-cover dark:block"
          alt="mini project display screenshot"
          src="/mini-projects/mpd/mpd-dark.png"
        ></img>
      </picture>
      <div className="absolute left-[50%] top-[50%] z-50 translate-x-[-50%] translate-y-[-50%]">
        <Button
          variant={"outline"}
          className="flex h-auto scale-100 transform flex-col items-center whitespace-normal rounded-xl px-5 py-6 text-base transition hover:bg-[#fcfcfc] group-hover:scale-105 min-[260px]:h-7 min-[260px]:whitespace-nowrap"
        >
          <span className="block">See All Mini Projects</span>
        </Button>
      </div>
    </div>
  );
};
MiniProjectDisplay.displayName = "MiniProjectDisplay";

export default MiniProjectDisplay;
