"use client";

import { useState } from "react";

export default function PaperStatus() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("NEW");
  return (
    <div className="relative">
      <p
        onClick={() => setOpen(!open)}
        className="py-6 flex justify-center items-center h-full w-full font-bold cursor-pointer"
      >
        {status}
      </p>
      <div className={`absolute left-0 z-10 ${open ? `flex` : `hidden`}`}>
        <div className="min-w-64 max-w-64 w-64 relative min-h-full border-2 border-black bg-white">
          <p className="py-6 flex justify-center items-center h-full w-full font-bold cursor-pointer">
            {status}
          </p>
        </div>
      </div>
    </div>
  );
}
