import React from "react";

const products = [
  {
    id: 1,
    name: "Bouquet 1",
    price: (250).toFixed(2),
    image: "/Pictures/Bouquet-1.jpg",
    flowers: "Roses, Lilies, and Baby's Breath",
    wrapper: "Classic white paper wrap",
  },
  {
    id: 2,
    name: "Bouquet 2",
    price: (350).toFixed(2),
    image: "/Pictures/Bouquet-2.jpg",
    flowers: "Orchids, Tulips, and Ferns",
    wrapper: "Rustic burlap wrap",
  },
  {
    id: 3,
    name: "Bouquet 3",
    price: (450).toFixed(2),
    image: "/Pictures/Bouquet-3.jpg",
    flowers: "Sunflowers, Daisies, and Eucalyptus",
    wrapper: "Elegant silk ribbon wrap",
  },
];

export default function ShopPage() {
  const handleContactClick = () => {
    window.location.href = "/contact";
  };

  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-b from-[#fefefe] to-[#f5f5f5] font-serif text-gray-800">
      {/* Hero Banner */}
      <section
        className="relative h-[200px] bg-cover bg-center opacity-90"
        style={{ backgroundImage: 'url("/Pictures/Banner-1.jpg")' }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 px-4 text-center">
          <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">
            Shop
          </h1>
          <p className="text-m text-white md:text-base">Home / Shop</p>
        </div>
      </section>

      {/* Product Grid */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex flex-wrap justify-center gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="w-full max-w-xs rounded-lg bg-white shadow transition hover:shadow-lg"
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-auto w-full object-contain"
              />
              <div className="p-4">
                <h3 className="mb-1 text-lg font-semibold">{product.name}</h3>
                <p className="mb-1 text-sm text-gray-500">
                  Flowers: {product.flowers}
                </p>
                <p className="mb-2 text-sm text-gray-500">
                  Wrapper: {product.wrapper}
                </p>
                <p className="mb-2 text-gray-600">₱{product.price}</p>
                <button className="mt-2 w-full rounded bg-[#f6a29d] px-4 py-2 text-white hover:bg-[#e69087]">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-white py-12 text-center">
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">
          Want a Customized Bouquet?
        </h2>
        <p className="mx-auto mb-6 max-w-md text-gray-600">
          Contact us to create a bouquet tailored just for you!
        </p>
        <a href="/Contacts">
          <button className="inline-block rounded bg-rose-400 px-6 py-3 font-semibold text-white transition hover:bg-rose-500">
            Contact Us
          </button>
        </a>
      </section>
    </main>
  );
}
