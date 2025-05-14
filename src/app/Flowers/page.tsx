"use client";

import { useState } from "react";

export default function FlowersPage() {
  const [flowers, setFlowers] = useState(
    Array.from({ length: 9 }, (_, i) => ({
      name: `Flower ${i + 1}`,
      quantity: 0,
      image: "",
    }))
  );

  const handleChange = (
    index: number,
    field: string,
    value: string | number
  ) => {
    const updated = [...flowers];

    if (field === "quantity") {
      const parsedValue = typeof value === "string" ? parseInt(value) : value;
      if (updated[index]) {
        updated[index].quantity = Math.max(0, parsedValue || 0); // Enforce non-negative
      }
    } else {
      (updated[index] as any)[field] = value;
    }

    setFlowers(updated);
  };

  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#454446] to-[#1d1d22] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          Flowers
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {flowers.map((flower, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-3 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
            >
              <div className="w-24 h-24 border-2 border-gray-300 flex items-center justify-center bg-white/5">
                {flower.image ? (
                  <img
                    src={flower.image}
                    alt={`Flower ${index + 1}`}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <span className="text-sm text-gray-300">No Image</span>
                )}
              </div>

              <input
                type="text"
                value={flower.name}
                onChange={(e) => handleChange(index, "name", e.target.value)}
                className="w-full rounded bg-white/20 px-2 py-1 text-sm text-white focus:outline-none"
                placeholder="Flower Name"
              />

              <input
                type="number"
                min="0"
                value={flower.quantity}
                onChange={(e) => handleChange(index, "quantity", e.target.value)}
                className="w-full rounded bg-white/20 px-2 py-1 text-sm text-white focus:outline-none"
                placeholder="Qty"
              />

              <input
                type="text"
                value={flower.image}
                onChange={(e) => handleChange(index, "image", e.target.value)}
                className="w-full rounded bg-white/20 px-2 py-1 text-sm text-white focus:outline-none"
                placeholder="Image URL"
              />

              <button
                className="mt-1 rounded bg-black px-3 py-1 text-sm hover:bg-gray-800"
                onClick={() =>
                  alert(`Saved: ${flower.name}, Qty: ${flower.quantity}`)
                }
              >
                Save
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
