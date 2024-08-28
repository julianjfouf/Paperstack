import Link from "next/link";

export default function Icon() {
  return (
    <Link href="/" className="flex justify-center items-center">
      <div className="relative h-20 w-16 group cursor-pointer translate-x-2">
        <div className="h-16 w-12 bg-white outline outline-[2px] outline-black absolute z-[0] -translate-y-2 -translate-x-2  transition-all duration-300"></div>
        <div className="h-16 w-12 bg-white outline outline-[2px] outline-black absolute z-[1] -translate-y-1 -translate-x-1 group-hover:translate-y-0 group-hover:translate-x-0  transition-all duration-300"></div>
        <div className="h-16 w-12 bg-white outline outline-[2px] outline-black absolute z-[2] group-hover:translate-y-2 group-hover:translate-x-2  transition-all duration-300"></div>
        <div className="h-16 w-12 bg-white outline outline-[2px] outline-black absolute z-[3] translate-y-1 translate-x-1 group-hover:translate-y-4 group-hover:translate-x-4  transition-all duration-300"></div>
        <div className="h-16 w-12 bg-white outline outline-[2px] outline-black absolute z-[4] translate-y-2 translate-x-2 group-hover:translate-y-6 group-hover:translate-x-6  transition-all duration-300"></div>
      </div>
    </Link>
  );
}
