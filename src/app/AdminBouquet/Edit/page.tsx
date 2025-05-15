'use client';
import { use, useEffect, useState } from "react";
import { bouquetRows } from "../../bouquetRows.tsx";

interface Item {
  label: string;
  image: string;
}

interface Row {
  title: string;
  items: Item[];
}

export default function EditPage({searchParams}) {
    const { row, item } : {[key : string]: number} = use(searchParams);
    const [rows, updateRows] = useState<Row[] | null>(null); // Defer rendering until mounted
    
      useEffect(() => {
        // Set initial rows from bouquetRows after mount
        updateRows(bouquetRows.value);
        bouquetRows.onChange(updateRows);
      }, []);

    if (!rows) return null;
return (
    <h2 className="text-lg font-semibold m-4">{rows[row].title} &gt; {rows[row].items[item].label} </h2>
);
}