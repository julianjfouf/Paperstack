import PaperAction from "./actions/PaperAction";
import PaperAuthors from "./PaperAuthors";
import PaperTitle from "./PaperTitle";

export default function Paper({ paperId, data, setUpdate }) {
  // href={`https://arxiv.org/pdf/${String(paperId)}`} target="_blank"
  return (
    <div className="border-2 hover:rotate-[0.1deg] flex justify-between border-black p-2">
      <a
        href={`https://arxiv.org/pdf/${String(paperId)}`}
        target="_blank"
        className="flex items-center gap-4"
      >
        <PaperTitle text={data?.title} />
        <PaperAuthors text={data?.authors?.join(", ")} />
      </a>
      <div className="flex items-center gap-4">
        <PaperAction
          src="/icons/Front Desk.png"
          alt="Front Desk Icon"
          location="desk"
          paperId={paperId}
          setUpdate={setUpdate}
        />
        <PaperAction
          src="/icons/Push.png"
          alt="Push Aside Icon"
          location="aside"
          paperId={paperId}
          setUpdate={setUpdate}
        />
        <PaperAction
          src="/icons/Trash.png"
          alt="Bin Icon"
          location="bin"
          paperId={paperId}
          setUpdate={setUpdate}
        />
        <PaperAction
          src="/icons/Bookmark.png"
          alt="Save Icon"
          location="saved"
          paperId={paperId}
          setUpdate={setUpdate}
        />
      </div>
    </div>
  );
}
