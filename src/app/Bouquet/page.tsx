'use client';

import { useEffect, useState } from "react";
import { type Bouquet, type Row, bouquetRows } from "../bouquetRows";


export default function BouquetPage() {
  const [rows, updateRows] = useState<Row[] | null>(null); // Defer rendering until mounted

  useEffect(() => {
    // 1. Load data from API on mount
    async function loadFromApi() {
      try {
        const res = await fetch("/api/bouquets/load");
        if (!res.ok) throw new Error("Failed to fetch bouquets");
        const data: Row[] = await res.json();
        bouquetRows.set(data);  // update global store
        updateRows(data);       // update local state
      } catch (err) {
        console.error("Error loading bouquets:", err);
        // fallback: load from localStorage store if available
        updateRows(bouquetRows.value);
      }
    }
    loadFromApi();

    // 2. Subscribe to bouquetRows changes to update local state
    bouquetRows.onChange(updateRows);

  }, []);

  // Toggle menu helper (unchanged)
  const toggleMenu = () => {
    const menu = document.getElementById("menu");
    if (menu) {
      menu.classList.toggle("hidden");
    }
  };

  // addItem, addRow - unchanged except minor fix to addItem key
  const addItem = (bouquet: Bouquet, bouquetIndex: number, rowIndex: number) => (
    <div
      key={`${rowIndex}-${bouquetIndex}`} // safer unique key
      className="relative border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition cursor-pointer bg-white"
    >
      <button
        className="bg-gray-700 absolute p-1 right-0 font-bold"
        onClick={() => {
          const newRows = [...(bouquetRows.value || [])];
          const index = newRows[rowIndex].items.indexOf(bouquet);
          if (index > -1) {
            newRows[rowIndex].items.splice(index, 1);
          }
          bouquetRows.set(newRows);
        }}
      >
        ╳
      </button>
      <a 
        href={bouquet.id ? `${window.location.href}/Edit?rowIndex=${rowIndex}&itemIndex=${bouquetIndex}` : '#'}
        onClick={(e) => {
          if (!bouquet.id) {
            e.preventDefault();
            alert("Please save your changes to the database before editing bouquets.");
          }
        }}
      >
        <div className="flex flex-col items-center">
          <img
            src={bouquet.image}
            alt={bouquet.label}
            className="w-24 h-24 rounded-full mb-2 object-cover"
          />
          <p className="text-center text-sm font-medium">{bouquet.label}</p>
          {!bouquet.id && (
            <span className="text-xs text-red-500 mt-1">(Unsaved)</span>
          )}
        </div>
      </a>
    </div>
  );

  const addRow = (row: Row, rowIndex: number) => (
    <div key={rowIndex} className="w-full max-w-5xl" data-id="row">
      <div className="inline-block align-middle w-full m-2">
        <h2 className="text-lg font-semibold float-left">{row.title}</h2>
        <button
          className="bg-gray-700 hover:bg-gray-800 text-white font-semibold p-2 m-2 rounded w-auto float-right"
          onClick={async () => {
            try {
              console.log('Deleting row:', row);
              const res = await fetch("/api/bouquets/delete-row", {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ rowId: row.id }),
              });

              if (!res.ok) {
                const errorData = await res.json();
                console.error('Delete failed:', errorData);
                throw new Error("Failed to delete row");
              }

              // Update local state after successful deletion
              const newRows = [...(bouquetRows.value || [])];
              const index = newRows.indexOf(row);
              if (index > -1) {
                newRows.splice(index, 1);
                bouquetRows.set(newRows);
              }
            } catch (err) {
              console.error("Error deleting row:", err);
              // For local-only rows, just remove from state
              if (!row.id) {
                const newRows = [...(bouquetRows.value || [])];
                const index = newRows.indexOf(row);
                if (index > -1) {
                  newRows.splice(index, 1);
                  bouquetRows.set(newRows);
                }
              } else {
                alert("Failed to delete row from database");
              }
            }
          }}
        >
          Delete Row
        </button>
        <button
          onClick={() => {
            const item = {
              label: `Bouquet #${row.items.length + 1}`,
              image: "IMAGE",
              price: 0,
              flowers: {},
              consumables: []
            };
            const newRows = [...(bouquetRows.value || [])];
            newRows[newRows.indexOf(row)]?.items.push(item);
            bouquetRows.set(newRows);
          }}
          className="bg-gray-700 hover:bg-gray-800 text-white font-semibold p-2 m-2 rounded w-auto float-right"
        >
          Add Item
        </button>
        <button
          onClick={() => {
            const newRows = [...(bouquetRows.value || [])];
            const index = newRows.indexOf(row);
            var title = prompt("Change the title:");
            if ((index > -1) && (title)) {
              newRows[index].title = title;
            }
            bouquetRows.set(newRows);
          }}
          className="bg-gray-700 hover:bg-gray-800 text-white font-semibold p-2 m-2 rounded w-auto float-right"
        >
          Rename Row
        </button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {row.items.map((bouquet, index) => addItem(bouquet, index, rowIndex))}
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

      <div className="w-40 flex flex-col space-y-4">
        <button
          onClick={() => {
            const row = { title: 'Row #'.concat(JSON.stringify((bouquetRows.value || []).length+1)), items: [] };
            const newRows = [...(bouquetRows.value || [])];
            newRows.push(row);
            bouquetRows.set(newRows);
          }}
          className="bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded w-auto"
        >
          Add Row
        </button>

        {/* Save to DB button */}
        <button
          onClick={async () => {
            try {
              const res = await fetch("/api/bouquets/save", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(bouquetRows.value),
              });
              
              if (!res.ok) throw new Error("Failed to save bouquets");
              
              // After successful save, reload from database
              const loadRes = await fetch("/api/bouquets/load");
              if (!loadRes.ok) throw new Error("Failed to fetch bouquets");
              const data: Row[] = await loadRes.json();
              bouquetRows.set(data);
              updateRows(data);
              
              alert("Bouquets saved and reloaded successfully!");
            } catch (err) {
              console.error("Error saving bouquets:", err);
              alert("Failed to save bouquets to database");
            }
          }}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded w-auto"
        >
          Save to DB
        </button>

        {/* Load from DB button */}
        <button
          onClick={async () => {
            try {
              const res = await fetch("/api/bouquets/load");
              if (!res.ok) throw new Error("Failed to fetch bouquets");
              const data: Row[] = await res.json();
              bouquetRows.set(data);
              updateRows(data);
            } catch (err) {
              console.error("Error loading bouquets:", err);
              alert("Failed to load bouquets from server");
            }
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded w-auto"
        >
          Load from DB
        </button>
      </div>
    </div>
  );
}