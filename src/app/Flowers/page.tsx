"use client";

import { useState, useEffect } from "react";
import { inventory } from "../inventory";

export default function FlowersPage() {
    const [flowers, updateFlowers] = useState<{[key : string] : number} | null>({});

    useEffect(() => {
          // Set initial rows from bouquetRows after mount
          updateFlowers(inventory.flowers);
        }, []);
  
      if (!flowers) return null;

  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#454446] to-[#1d1d22] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          Flowers
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {Object.entries(flowers).map(([flower, qty]) => (
            <div
              key={flower}
              className="flex items-center gap-6 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
            >

              <div className="flex flex-col gap-3 w-full">
                <label className="block mb-1 text-sm font-medium">{flower}</label>

                <input
                  type="number"
                  min="0"
                  value={flowers[flower]}
                  onChange={(e) => {
                    const newFlowers = {...flowers};
                    newFlowers[flower] = Number(e.target.value)
                    updateFlowers(newFlowers)
                  }}
                  className="w-full rounded bg-white/20 px-2 py-1 text-sm text-white focus:outline-none"
                  placeholder="Qty"
                />

    

                <button
                  className="mt-1 rounded bg-black px-3 py-1 text-sm hover:bg-gray-800"
                  onClick={() => {
                    console.log(flowers[flower]);
                    inventory.setFlower(flower, flowers[flower]);
                    alert(`Saved: ${flower}, Qty: ${flowers[flower]}`);
                  }}
                >
                  Save
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
