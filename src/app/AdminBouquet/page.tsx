'use client';

import { useEffect, useState } from "react";
import { bouquetRows } from "../bouquetRows.tsx";

interface Item {
  label: string;
  image: string;
}

interface Row {
  title: string;
  items: Item[];
}

export default function BouquetPage() {
  const [rows, setRows] = useState<Row[] | null>(null); // Defer rendering until mounted

  useEffect(() => {
    // Set initial rows from bouquetRows after mount
    setRows(bouquetRows.value);
    bouquetRows.onChange(setRows);
  }, []);

  const toggleMenu = () => {
    const menu = document.getElementById("menu");
    if (menu) {
      menu.classList.toggle("hidden");
    }
  };

  const addItem = (item: Item, itemIndex: number, rowIndex: number) => (
    <div
      key={itemIndex}
      className="relative border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition cursor-pointer bg-white"
    >
      <button
        className="bg-gray-700 absolute p-1 right-0 font-bold"
        onClick={() => {
          const newRows = [...(bouquetRows.value || [])];
          const index = newRows[rowIndex].items.indexOf(item);
          if (index > -1) {
            newRows[rowIndex].items.splice(index, 1);
          }
          bouquetRows.set(newRows);
        }}
      >
        ╳
      </button>
      <a href={`/${rowIndex}/${itemIndex}`}>
        <div className="flex flex-col items-center">
          <img
            src={item.image}
            alt={item.label}
            className="w-24 h-24 rounded-full mb-2 object-cover"
          />
          <p className="text-center text-sm font-medium">{item.label}</p>
        </div>
      </a>
    </div>
  );

  const addRow = (row: Row, rowIndex: number) => (
    <div key={rowIndex} className="w-full max-w-5xl" data-id="row">
      <div className="inline-block w-full">
        <h2 className="text-lg font-semibold mb-4 float-left">{row.title}</h2>
        <button
          onClick={() => {
            const item = {
              label: `Bouquet #${row.items.length + 1}`,
              image: "IMAGE",
            };
            const newRows = [...(bouquetRows.value || [])];
            newRows[rowIndex]?.items.push(item);
            bouquetRows.set(newRows);
          }}
          className="bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded w-50 float-right"
        >
          Add Bouquet
        </button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {row.items.map((item, index) => addItem(item, index, rowIndex))}
      </div>
    </div>
  );

  // Don't render until `rows` is set on client
  if (!rows) return null;

  return (
    <div className="flex h-screen bg-gray-100 text-gray-900 p-6 space-x-6">
      <div className="flex-1 flex flex-col items-center space-y-8" id="rowsSpace">
        {rows.map((row, rowIndex) => addRow(row, rowIndex))}
      </div>

      <div className="w-40">
        <button
          onClick={toggleMenu}
          className="bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded w-full"
        >
          Edit
        </button>
        <ul
          id="menu"
          className="mt-2 bg-white text-black rounded shadow-lg hidden"
        >
          <li>
            <button
              onClick={() => {
                const item = { label: "NEWITEM", image: "#" };
                const newRows = [...(bouquetRows.value || [])];
                newRows[0]?.items.push(item);
                bouquetRows.set(newRows);
              }}
              className="block px-4 py-2 hover:bg-gray-100"
            >
              Add Bouquet
            </button>
          </li>
          <li>
            <a href="#" className="block px-4 py-2 hover:bg-gray-100">
              Choice 2
            </a>
          </li>
          <li>
            <a href="#" className="block px-4 py-2 hover:bg-gray-100">
              Choice 3
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
