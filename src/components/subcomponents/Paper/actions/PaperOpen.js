import Image from "next/image";

export default function PaperOpen({ paperURL }) {
  return (
    <a target="_blank" href={`https://arxiv.org/pdf/${String(paperURL)}`}>
      <Image
        src="/icons/External Link.png"
        alt="External Link Icon"
        width={30}
        height={30}
      ></Image>
    </a>
  );
}
