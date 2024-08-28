import { db } from "@/utils/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import Image from "next/image";

async function movePaper(paperId, location, setUpdate) {
  if (localStorage.getItem("user")) {
    const uid = JSON.parse(localStorage.getItem("user"))["uid"];
    const docRef = doc(db, "users", uid, "papers", paperId);
    await updateDoc(docRef, {
      location: location,
    });
  } else {
    let papers = JSON.parse(localStorage.getItem("papers"))["papers"];
    papers.map((paper) => {
      if (paper.paperId == paperId) {
        paper.location = location;
      }
    });
    localStorage.setItem("papers", JSON.stringify({ papers: papers }));
  }
  setUpdate((prev) => !prev);
}

export default function PaperAction({
  src,
  alt,
  location,
  paperId,
  setUpdate,
}) {
  return (
    <Image
      className="cursor-pointer z-10"
      onClick={() => movePaper(paperId, location, setUpdate)}
      src={src}
      alt={alt}
      width={30}
      height={30}
    ></Image>
  );
}
