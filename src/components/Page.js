"use client";

import { useState } from "react";
import PaperAdd from "./subcomponents/Paper/PaperAdd";
import PaperStack from "./subcomponents/Paper/PaperStack";
import Title from "./subcomponents/Title";

export default function Page({ location = "desk", header }) {
  const [update, setUpdate] = useState(false);
  return (
    <div className="container mx-auto p-6 flex flex-col gap-6">
      <div className="flex flex-col">
        <Title text="Add a paper" />
        <p>New papers get added to desk.</p>
      </div>
      <PaperAdd setUpdate={setUpdate} />
      <div className="flex flex-col mt-6">
        <Title text={header} />
        <p>Thank you to arXiv for use of its open access interoperability.</p>
      </div>
      <PaperStack setUpdate={setUpdate} update={update} location={location} />
    </div>
  );
}
