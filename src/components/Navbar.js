import Link from "next/link";
import Icon from "./subcomponents/Icon";
import Login from "./subcomponents/Login";

export default function Navbar() {
  return (
    <nav className="container mx-auto py-9 px-6 flex justify-between items-center">
      <Icon />
      <div className="flex gap-6 items-center">
        <Link className="outline outline-black outline-2 px-6 py-1 hover:rotate-1 font-bold" href="/">Desk</Link>
        <Link className="outline outline-black outline-2 px-6 py-1 hover:rotate-1 font-bold" href="/aside">Aside</Link>
        <Link className="outline outline-black outline-2 px-6 py-1 hover:rotate-1 font-bold" href="/bin">Bin</Link>
        <Link className="outline outline-black outline-2 px-6 py-1 hover:rotate-1 font-bold" href="/saved">Saved</Link>
        <Link className="outline outline-black outline-2 px-6 py-1 hover:rotate-1 font-bold" href="/all">All Papers</Link>
        <Login />
      </div>
    </nav>
  );
}
