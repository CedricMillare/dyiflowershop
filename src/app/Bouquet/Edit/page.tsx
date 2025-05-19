'use client';
import { useEffect, useState } from "react";
import { type Row, bouquetRows } from "../../bouquetRows";
import { inventory } from "../../inventory";
import { UploadDialog } from "../../_components/uploadDialog";

export default function EditPage({ searchParams }: { searchParams: Record<string, any> }) {
  const rowIndex = Number(searchParams.rowIndex);
  const itemIndex = Number(searchParams.itemIndex);

  const [rows, updateRows] = useState<Row[] | null>(null);
  const [tempPrice, setTempPrice] = useState<number>(0);
  const [tempImage, setTempImage] = useState<number>(0);
  const [tempLabel, setTempLabel] = useState<string | null>(null);
  const [tempFlowers, setTempFlowers] = useState<{ [key: string]: number }>({});
  const [tempConsumables, setTempConsumables] = useState<string[]>([]);
  const [checked, setChecked] = useState<boolean>(false);
  const [selectedFlower, setSelectedFlower] = useState<string | null>(null);
  const [selectedConsumable, setSelectedConsumable] = useState<string | null>(null);

  useEffect(() => {
    if (
      typeof rowIndex === "number" &&
      typeof itemIndex === "number" &&
      bouquetRows.value[rowIndex] &&
      bouquetRows.value[rowIndex].items[itemIndex]
    ) {
      const currentItem = bouquetRows.value[rowIndex].items[itemIndex];
      setSelectedFlower(Object.keys(inventory.flowers)[0] ?? null);
      setSelectedConsumable(inventory.consumables[0] ?? null);
      setTempPrice(currentItem.price || 0);
      setChecked(currentItem.doNotDisplay || false);
      setTempImage(currentItem.image || 0);
      setTempLabel(currentItem.label || "Sample Bouquet");
      setTempFlowers(currentItem.flowers || {});
      setTempConsumables(currentItem.consumables || []);
    }

    updateRows(bouquetRows.value);
    bouquetRows.onChange(updateRows);
  }, []);

  if (!rows) return null;

  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#454446] to-[#1d1d22] text-white">
      <div className="container max-w-2xl flex flex-col gap-8 px-4 py-16">
        <h1 className="text-4xl font-bold text-center">
          Editing {rows[rowIndex]?.items[itemIndex]?.label ?? "Invalid selection"}
        </h1>

        <div className="h-48 border-2 border-dashed border-gray-400 flex items-center justify-center rounded bg-white/10">
          <span className="text-gray-300">Drag or Add Pictures</span>
        </div>

        <div className="inline-block">
          <label className="block mb-1 text-sm font-medium">Label</label>
          <input
            value={tempLabel ?? ""}
            onChange={(e) => setTempLabel(e.target.value)}
            className="w-full rounded bg-zinc-600 px-2 py-1 text-white text-sm"
          />
          <UploadDialog />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Existing Flowers */}
          <div>
            <label className="block mb-1 text-sm font-medium">Flowers</label>
            {Object.entries(tempFlowers).map(([key, value]) => (
              <div key={key}>
                <label className="block mb-1 text-sm font-medium">{key}</label>
                <div className="flex">
                  <input
                    type="number"
                    min="0"
                    value={value}
                    onChange={(e) => {
                      const newVal = Number(e.target.value);
                      setTempFlowers({ ...tempFlowers, [key]: newVal });
                    }}
                    className="w-full rounded bg-zinc-600 px-2 py-1 text-white text-sm"
                    placeholder="Qty"
                  />
                  <button
                    className="w-10 mx-2 bg-gray-700 font-bold"
                    onClick={() => {
                      const { [key]: _, ...rest } = tempFlowers;
                      setTempFlowers(rest);
                    }}
                  >╳</button>
                </div>
              </div>
            ))}
          </div>

          {/* Add Flower */}
          <div>
            <div className="flex">
              <select
                value={selectedFlower ?? ""}
                onChange={(e) => setSelectedFlower(e.target.value)}
                className="w-full rounded bg-zinc-600 px-2 py-1 text-white text-sm"
              >
                {Object.keys(inventory.flowers).map((flower, index) => (
                  <option key={index} value={flower}>{flower}</option>
                ))}
              </select>
              <button
                className="w-10 mx-2 bg-gray-700 font-bold"
                onClick={() => {
                  if (selectedFlower) {
                    setTempFlowers({ ...tempFlowers, [selectedFlower]: (tempFlowers[selectedFlower] || 0) + 1 });
                  }
                }}
              >+</button>
            </div>
          </div>
        </div>

        {/* Consumables Section */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-sm font-medium">Consumables</label>
            {tempConsumables.map((consumable, index) => (
              <div key={index} className="flex items-center">
                <button
                  className="w-10 mx-2 bg-gray-700 font-bold"
                  onClick={() => {
                    setTempConsumables(tempConsumables.filter(c => c !== consumable));
                  }}
                >╳</button>
                <label className="text-sm font-medium">{consumable}</label>
              </div>
            ))}
          </div>

          <div>
            <div className="flex">
              <select
                value={selectedConsumable ?? ""}
                onChange={(e) => setSelectedConsumable(e.target.value)}
                className="w-full rounded bg-zinc-600 px-2 py-1 text-white text-sm"
              >
                {inventory.consumables.map((consumable, index) => (
                  <option key={index} value={consumable}>{consumable}</option>
                ))}
              </select>
              <button
                className="w-10 mx-2 bg-gray-700 font-bold"
                onClick={() => {
                  if (selectedConsumable && !tempConsumables.includes(selectedConsumable)) {
                    setTempConsumables([...tempConsumables, selectedConsumable]);
                  }
                }}
              >+</button>
            </div>
          </div>
        </div>

        {/* Price and Save */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Price:</span>
            <input
              type="number"
              value={tempPrice}
              onChange={(e) => setTempPrice(Number(e.target.value) || 0)}
              className="w-32 rounded bg-zinc-600 px-2 py-1 text-white text-sm"
            />
          </div>
          <button
            className="rounded bg-black px-4 py-2 text-sm hover:bg-gray-800"
            onClick={() => {
              const newRows = [...bouquetRows.value];
              const currentItem = newRows[rowIndex].items[itemIndex];
              currentItem.label = tempLabel ?? "Sample Bouquet";
              currentItem.image = tempImage;
              currentItem.price = tempPrice;
              currentItem.flowers = tempFlowers;
              currentItem.consumables = tempConsumables;
              currentItem.doNotDisplay = checked;
              bouquetRows.set(newRows);
              alert("Saved changes!");
            }}
          >
            Save
          </button>
        </div>

        {/* Do Not Display Checkbox */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="hideDisplay"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
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
