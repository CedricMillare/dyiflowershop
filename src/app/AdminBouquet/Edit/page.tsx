'use client';
import { use, useEffect, useState } from "react";
import { type Bouquet, type Row, bouquetRows } from "../../bouquetRows.tsx";
import { inventory } from "../../inventory.tsx";
export default function EditPage({searchParams}) {
    const { rowIndex, itemIndex } : {[key : string]: number} = use(searchParams);
    const [rows, updateRows] = useState<Row[] | null>(null); // Defer rendering until mounted
    const [tempPrice, setTempPrice] = useState<number>(0);
    const [tempImage, setTempImage] = useState<number>(0);
    const [tempLabel, setTempLabel] = useState<string | null>(null);
    const [tempFlowers, setTempFlowers] = useState<{[key : string] : number} | null>({});
    const [tempConsumables, setTempConsumables] = useState<string[] | null>([]);
   
    const [selectedFlower, setSelectedFlower] = useState<string | null>(null);
    const [selectedFlowerQty, setSelectedFlowerQty] = useState<number | null>(null);
    const [selectedConsumable, setSelectedConsumable] = useState<string | null>(null);
    
      useEffect(() => {
        // Set initial rows from bouquetRows after mount
        console.log(rowIndex);
        
        const currentItem = bouquetRows.value[rowIndex].items[itemIndex]
        setTempPrice(currentItem.price || 0);
        setTempImage(currentItem.image || "");
        setTempLabel(currentItem.label || "Sample Bouquet");
        setTempFlowers(currentItem.flowers || {});
        setTempConsumables(currentItem.consumables || []);
        updateRows(bouquetRows.value);
        bouquetRows.onChange(updateRows);
      }, []);

    if (!rows) return null;
return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#454446] to-[#1d1d22] text-white">
      <div className="container max-w-2xl flex flex-col gap-8 px-4 py-16">
        <h1 className="text-4xl font-bold text-center">Editing {rows[rowIndex].title} &gt; {rows[rowIndex].items[itemIndex].label}</h1>
        <div className="h-48 border-2 border-dashed border-gray-400 flex items-center justify-center rounded bg-white/10">
          <span className="text-gray-300">Drag or Add Pictures</span>
        </div>

        <div className="inline-block">
          <div>
            <label className="block mb-1 text-sm font-medium">Label</label>
            <input
              defaultValue={tempLabel}
              onChange={(e) => setTempLabel(e.target.value)}
              className="w-full rounded bg-white/20 px-2 py-1 text-white text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          
          <div>
            <label className="block mb-1 text-sm font-medium">Flowers</label>
            {Object.entries(tempFlowers).map(([key, value]) => (
              <div key={key}>
                <label className="block mb-1 text-sm font-medium">{key}</label>
                <div className="flex">
                  <input
                  type="number"
                  min="0"
                  value={value || 0}
                  onChange={(e) => {
                    const newDict = {...tempFlowers};
                    const newVal = Number(e.target.value)
                    newDict[key] = newVal;
                    e.target.value = newVal;
                    setTempFlowers(newDict);
                  }}
                  className="w-full rounded bg-white/20 px-2 py-1 text-white text-sm"
                  placeholder="Qty"
                />
         
              <button
                className="w-10 p-2 mx-2 bg-gray-700 relative p-1 font-bold"
                onClick={() => {
                      const newDict = {...tempFlowers};
                      delete newDict[key];
                      setTempFlowers(newDict);
                  }}
              >╳</button>
                </div>
              </div>
            ))}
          </div>
          
          <div>
            <div className="flex">
              <select
              value={undefined}
              onChange={(e) => {
                setSelectedFlower((e.target.value !== undefined) ? e.target.value : null);
              }}
              className="w-full rounded bg-white/20 px-2 py-1 text-white text-sm"
            >
              <option value={undefined} className="text-gray-400">Select Flower</option>
              {Object.keys(inventory.flowers).map((flower, flowerIndex) => (
                <option value={flower}>{flower}</option>
              ))}
            </select>
              <button
                className="w-10 p-2 mx-2 bg-gray-700 relative p-1 font-bold"
                onClick={() => {
                    if (selectedFlower !== null) {
                      const newDict = {...tempFlowers};
                      newDict[selectedFlower] = (newDict[selectedFlower] || 0)+1;
                      setTempFlowers(newDict);
                      console.log("hi");
                    }
                    
                  }}
          >+</button>
            </div>
          </div>
            
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-sm font-medium">Consumables</label>
            {tempConsumables.map((consumable, consumableIndex) => (
              <div key={consumableIndex} className="flex items-center">
                <button
                className="w-10 p-2 mx-2 bg-gray-700 relative font-bold"
                onClick={() => {
                  const newArr = [...(tempConsumables || [])];
                  const index = newArr.indexOf(consumable);
                  if (index > -1) {
                    newArr.splice(index, 1);
                   }
                  setTempConsumables(newArr);
                }}
                >╳</button>
                <label className="block text-sm font-medium">{consumable}</label>
              </div>
            ))}
          </div>

          <div>
            <div className="flex">
              <select
              value={selectedConsumable || 0}
              onChange={(e) => setSelectedConsumable((e.target.value !== undefined) ? e.target.value : null)}
              className="w-full rounded bg-white/20 px-2 py-1 text-white text-sm"
            >
              {inventory.consumables.map((consumable, consumableIndex) => (
                <option value={consumable}>{consumable}</option>
              ))}
            </select>

            <button
                className="w-10 p-2 mx-2 bg-gray-700 relative p-1 font-bold"
                onClick={() => {
                      const newArr = [...tempConsumables];
                      if (newArr.indexOf(selectedConsumable) == -1) {
                        newArr.push(selectedConsumable);
                      }
                      setTempConsumables(newArr);
                  }}
          >+</button>
            </div>
          </div>
        </div>



        <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Price:</span>
            <input
              type="text"
              defaultValue={tempPrice || 0}
              onChange={(e) => {
                const val = Number(e.target.value) || 0;
                setTempPrice(val);
                e.target.value = val;
              }}
              className="w-32 rounded bg-white/20 px-2 py-1 text-white text-sm"
            />
          </div>
          <button
            className="rounded bg-black px-4 py-2 text-sm hover:bg-gray-800"
            onClick={() => {
              const newRows = [...bouquetRows.value];
              const currentItem = newRows[rowIndex].items[itemIndex];
              currentItem.label = tempLabel;
              currentItem.image = tempImage;
              currentItem.price = tempPrice;
              currentItem.flowers = tempFlowers;
              currentItem.consumables = tempConsumables;
              bouquetRows.set(newRows);
            }
            }
          >
            Save
          </button>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="hideDisplay"
            defaultChecked={rows[rowIndex].items[itemIndex].doNotDisplay || false}
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

/*
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
*/

/*
<div>
            <label className="block mb-1 text-sm font-medium">Add/Delete</label>
            <input
              type="number"
              min="0"
              value={selectedFlowerQty || 0}
              onChange={(e) => setSelectedFlowerQty(Number((e.target.value !== undefined) ? e.target.value : null))}
              className="w-full rounded bg-white/20 px-2 py-1 text-white text-sm"
              placeholder="Qty"
            />
          </div>
*/