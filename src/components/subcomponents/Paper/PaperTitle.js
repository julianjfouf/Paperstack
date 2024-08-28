export default function PaperTitle({ text }) {
  return (
    <h2 className="font-bold w-96 text-ellipsis text-nowrap overflow-hidden">
      {text}
    </h2>
  );
}
