"use client";

import { useEffect, useState } from "react";
import Paper from "./Paper";
import Image from "next/image";
import Title from "../Title";
import { collection, getDocs, where } from "firebase/firestore";
import { auth, db } from "@/utils/firebase";

export default function PaperStack({ setUpdate, update, location }) {
  const [papers, setPapers] = useState([]);
  function getPapersFromLocalStorage() {
    let papers = JSON.parse(localStorage.getItem("papers"))["papers"];
    if (location != "all") {
      papers = papers.filter((paper) => paper["location"] == location);
    }
    setPapers(papers.reverse());
  }
  async function getPapersFromFirebase() {
    const uid = JSON.parse(localStorage.getItem("user"))["uid"];
    let querySnapshot = await getDocs(collection(db, "users", uid, "papers"));
    let papers = [];
    querySnapshot.forEach((doc) => {
      papers.push(doc.data());
    });
    if (location != "all") {
      papers = papers.filter((paper) => paper.location == location);
    }
    console.log(papers);
    setPapers(papers);
  }
  useEffect(() => {
    window.addEventListener("storage", () => {
      console.log("storage changed");
    });
  }, []);
  useEffect(() => {
    if (!localStorage.getItem("papers")) {
      localStorage.setItem("papers", JSON.stringify({ papers: [] }));
    }
    if (localStorage.getItem("user")) {
      getPapersFromFirebase();
      console.log("getting papers from firebase");
    } else {
      getPapersFromLocalStorage();
    }
  }, [update]);
  return (
    <div className="flex flex-col gap-1">
      {papers?.map((paper, id) => (
        <Paper
          key={id}
          paperId={`${paper.paperId}`}
          data={paper}
          setUpdate={setUpdate}
        />
      ))}
      {papers?.length == 0 && (
        <div className="flex flex-col items-center gap-4">
          <Title text="No papers found here" />
          <Image
            alt="No Results Picture"
            src="/icons/NoResults.png"
            width={318}
            height={318}
          />
        </div>
      )}
    </div>
  );
}
