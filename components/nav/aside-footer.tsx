import React from "react";
import { Settings, Moon } from "lucide-react";

const AsideFooter = () => {
  return (
    <div className="bg-brand-50/40 flex flex-col gap-3 pb-3 px-5 w-full text-slate-600 text-sm">
      <hr className="slate-300" />

      <div className="flex items-center justify-start gap-2 ">
        <Moon size={18} />
        <p>Dark mode</p>
      </div>
      <div className="flex items-center gap-2">
        <Settings size={18} />
        <p>Settings</p>
      </div>
      <div className="flex gap-2">
        <div className="h-10 w-10  flex items-center justify-center bg-brand-600 rounded-full">
          <p className="text-xl text-white ">A</p>
        </div>
        <div className="flex flex-col">
          <p className="text-md text-black font-semibold">Username</p>
          <p className="text-sm text-muted-foreground">email@example.com</p>
        </div>
      </div>
    </div>
  );
};

export default AsideFooter;
