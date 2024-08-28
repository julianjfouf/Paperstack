"use client";
const xml2js = require("xml2js");
const axios = require("axios");

import { auth, db } from "@/utils/firebase";
import { collection, doc, getDoc, query, setDoc } from "firebase/firestore";
import { useState } from "react";

async function addPaperToLocalStorage(paperId, setError, setUpdate) {
  let apiUrl = `https://export.arxiv.org/api/query?id_list=${paperId}`;
  axios
    .get(apiUrl)
    .then((response) => {
      setError(() => "");
      const parser = new xml2js.Parser();
      parser.parseString(response.data, (err, result) => {
        const entry = result.feed.entry[0];
        const title = entry.title[0];
        const authors = entry.author.map((author) => author.name[0]);

        let papers = JSON.parse(localStorage.getItem("papers"))["papers"];
        let paperExists = papers.some((paper) => paper.paperId == paperId);
        if (paperExists) {
          setError(
            () => "Oops. It seems you have already added this paper before."
          );
        } else {
          papers.push({
            id: papers.length,
            paperId: paperId,
            title: title,
            authors: authors,
            location: "desk",
          });
          localStorage.setItem("papers", JSON.stringify({ papers: papers }));
          setUpdate((prev) => !prev);
        }
      });
    })
    .catch(() => setError(() => "Oops. Did not find paper on arXiv."));
}

async function addPaperToFirebase(paperId, setError, setUpdate) {
  let apiUrl = `https://export.arxiv.org/api/query?id_list=${paperId}`;
  axios
    .get(apiUrl)
    .then((response) => {
      setError(() => "");
      const parser = new xml2js.Parser();
      parser.parseString(response.data, async (err, result) => {
        const entry = result.feed.entry[0];
        const title = entry.title[0];
        const authors = entry.author.map((author) => author.name[0]);
        const uid = JSON.parse(localStorage.getItem("user"))["uid"];
        const docRef = doc(db, "users", uid, "papers", paperId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setError(
            () => "Oops. It seems you have already added this paper before."
          );
        } else {
          await setDoc(doc(db, "users", uid, "papers", paperId), {
            paperId: paperId,
            title: title,
            authors: authors,
            location: "desk",
          });
          setUpdate((prev) => !prev);
        }
      });
    })
    .catch(() => setError(() => "Oops. Did not find paper on arXiv."));
}

async function addPaper(event, text, setText, error, setError, setUpdate) {
  event.preventDefault();
  let paperIdParts = text.split("/");
  let paperId = paperIdParts[paperIdParts.length - 1];
  if (localStorage.getItem("user")) {
    addPaperToFirebase(paperId, setError, setUpdate);
  } else {
    addPaperToLocalStorage(paperId, setError, setUpdate);
  }
  setText("");
}

export default function PaperAdd({ setUpdate }) {
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  return (
    <div className="hover:rotate-[0.1deg]">
      <form
        onSubmit={(event) =>
          addPaper(event, text, setText, error, setError, setUpdate)
        }
        className="w-full flex"
      >
        <input
          onChange={(event) => setText(event.target.value)}
          value={text}
          className="outline-none ring-none border-black border-2 w-4/5 p-2"
          type="text"
          placeholder="arXiv url"
        ></input>
        <button
          type="submit"
          className="w-1/5 border-black border-2 border-l-0 font-bold"
        >
          Add Paper
        </button>
      </form>
      <p className={`${error ? `flex` : `hidden`}`}>{error}</p>
    </div>
  );
}
