// import React is not required in Next.js with React 17+
import Image from "next/image";

export default function FuneralPage() {
  return (
    <>
      {/* Hero Banner */}
      <section
        className="relative h-[200px] bg-cover bg-center opacity-90"
        style={{ backgroundImage: 'url("/Pictures/Banner-1.jpg")' }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 px-4 text-center">
          <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">
            Funeral Arrangements
          </h1>
          <p className="text-sm text-white md:text-base">
            Home / Services / Funeral Arrangements
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl space-y-12 px-4 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-semibold tracking-widest uppercase">
            Funeral Arrangements
          </h1>
          <p className="mt-4 text-gray-600">
            Thoughtful and respectful floral tributes to honor your loved ones.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-8">
          <Image
            src="/Pictures/Funeral-Arrangement.jpg"
            alt="Funeral Flowers"
            className="w-full rounded shadow-md md:w-1/2"
            width={600}
            height={400}
            style={{ objectFit: "cover" }}
          />
          <div className="space-y-4 text-gray-700">
            <p>
              We offer a variety of funeral flower arrangements, from wreaths to
              standing sprays, to convey your condolences with grace.
            </p>
            <p>
              Personalized designs are available to reflect the unique life
              being celebrated.
            </p>
          </div>
        </div>

        {/* Contact Section (Mini Hero Style) */}
        <div className="flex justify-center">
          <div
            className="relative h-[200px] w-full rounded bg-cover bg-center shadow-md md:w-[100%]"
            style={{ backgroundImage: 'url("/Pictures/Funeral-designs.jpg")' }}
          >
            <div className="absolute inset-0 flex items-center justify-center rounded bg-black/40">
              <a
                href="/User/Contacts"
                className="bg-opacity-70 hover:bg-opacity-90 rounded bg-gray-700 px-6 py-3 font-semibold text-white shadow-lg hover:bg-gray-800 inline-block text-center"
              >
                Contact Us for Funeral Services
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
