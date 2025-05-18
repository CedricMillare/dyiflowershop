"use client";

import { useState } from "react";

export default function BouquetBuilder() {
  const [flower, setFlower] = useState("");
  const [flowerQty, setFlowerQty] = useState(0);

  const [consumable, setConsumable] = useState("");
  const [consumableQty, setConsumableQty] = useState(0);

  const [occasion, setOccasion] = useState("");
  const [price, setPrice] = useState("350 Pesos");
  const [doNotDisplay, setDoNotDisplay] = useState(false);

  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#454446] to-[#1d1d22] text-white">
      <div className="container max-w-2xl flex flex-col gap-8 px-4 py-16">
        <h1 className="text-4xl font-bold text-center">Create Bouquet</h1>

        <div className="h-48 border-2 border-dashed border-gray-400 flex items-center justify-center rounded bg-white/10">
          <span className="text-gray-300">Drag or Add Pictures</span>
          <UploadImageButton />
          <UploadDialog />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-sm font-medium">Flowers</label>
            <select
              value={flower}
              onChange={(e) => setFlower(e.target.value)}
              className="w-full rounded bg-white/20 px-2 py-1 text-white text-sm"
            >
              <option value="">Select Flower</option>
              <option value="Rose">Rose</option>
              <option value="Lily">Lily</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Add/Delete</label>
            <input
              type="number"
              min="0"
              value={flowerQty}
              onChange={(e) => setFlowerQty(Number(e.target.value))}
              className="w-full rounded bg-white/20 px-2 py-1 text-white text-sm"
              placeholder="Qty"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-sm font-medium">Consumables</label>
            <select
              value={consumable}
              onChange={(e) => setConsumable(e.target.value)}
              className="w-full rounded bg-white/20 px-2 py-1 text-white text-sm"
            >
              <option value="">Select Item</option>
              <option value="Ribbon">Ribbon</option>
              <option value="Wrapper">Wrapper</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Add/Delete</label>
            <input
              type="number"
              min="0"
              value={consumableQty}
              onChange={(e) => setConsumableQty(Number(e.target.value))}
              className="w-full rounded bg-white/20 px-2 py-1 text-white text-sm"
              placeholder="Qty"
            />
          </div>
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Choose Occasion</label>
          <select
            value={occasion}
            onChange={(e) => setOccasion(e.target.value)}
            className="w-full rounded bg-white/20 px-2 py-1 text-white text-sm"
          >
            <option value="">Select Occasion</option>
            <option value="Funeral">For Funeral</option>
            <option value="Wedding">For Wedding</option>
          </select>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Price:</span>
            <input
              type="text"
              value={price}
              readOnly
              className="w-32 rounded bg-white/20 px-2 py-1 text-white text-sm"
            />
          </div>
          <button
            className="rounded bg-black px-4 py-2 text-sm hover:bg-gray-800"
            onClick={() =>
              alert(
                `Saved:\nFlower: ${flower} x${flowerQty}\nConsumable: ${consumable} x${consumableQty}\nOccasion: ${occasion}`
              )
            }
          >
            Save
          </button>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="hideDisplay"
            checked={doNotDisplay}
            onChange={(e) => setDoNotDisplay(e.target.checked)}
            className="w-4 h-4"
          />
          <label htmlFor="hideDisplay" className="text-sm">
            Do not display
          </label>
        </div>
      </div>
    </main>
  );
}
