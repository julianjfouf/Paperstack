export default function Title({ text, args }) {
    return (
        <h1 className={`font-bold text-4xl ${args}`}>
            {text}
        </h1>
    )
}