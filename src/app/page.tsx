import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#454446] to-[#1d1d22] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          DIY <span className="text-[#000000]">Flower</span> Shop
        </h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
          <Link
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
            href="#"
            target="#"
          >
            <h3 className="text-2xl font-bold">Flowers:</h3>
            <div className="text-lg">
              All available flowers.
            </div>
          </Link>
          <Link
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
            href="#"
            target="_blank"
          >
            <h3 className="text-2xl font-bold">Bouquet:</h3>
            <div className="text-lg">
              ------.
            </div>
          </Link>
          <Link
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
            href="#"
            target="_blank"
          >
            <h3 className="text-2xl font-bold">Order:</h3>
            <div className="text-lg">
              -----.
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
