// app/CartView/page.tsx
"use client";

import React from "react";

export default function CartView() {
  return (
    <div className="min-h-screen bg-white p-10">
      <div className="mx-auto w-full max-w-6xl">
        <h1 className="mb-6 text-2xl font-bold text-gray-800">
          Your Shopping Cart
        </h1>

        <div className="overflow-hidden border border-gray-200 shadow-sm">
          {/* Cart Table */}
          <table className="min-w-full text-left text-sm">
            <thead className="bg-rose-200 text-gray-700">
              <tr>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Quantity</th>
                <th className="px-6 py-4">Subtotal</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              <tr className="border-t">
                <td className="flex items-center space-x-4 px-6 py-4">
                  <img
                    src="/Pictures/Bouquet-1.jpg"
                    alt="Product"
                    className="h-16 w-16 rounded object-cover"
                  />
                  <span>Bouquet 1</span>
                </td>
                <td className="px-6 py-4">₱250</td>
                <td className="px-6 py-4">
                  <input
                    type="number"
                    defaultValue={1}
                    className="w-16 rounded border border-gray-300 p-1 text-center"
                  />
                </td>
                <td className="px-6 py-4">₱250</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Cart Totals */}
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Totals Summary */}
          <div className="rounded border border-gray-200 p-4 shadow-sm">
            <h2 className="mb-2 text-lg font-semibold">Cart Totals</h2>
            <div className="flex justify-between py-1">
              <span>Subtotal:</span>
              <span>₱250</span>
            </div>
            <div className="flex justify-between py-1">
              <span>Shipping:</span>
              <span>₱50</span>
            </div>
            <div className="flex justify-between py-1 font-bold">
              <span>Total:</span>
              <span className="text-rose-500">₱300</span>
            </div>
            <a href={"/CheckOut"}>
              <button className="mt-4 w-full bg-rose-300 py-2 font-semibold text-white hover:bg-rose-400">
                PROCEED TO CHECKOUT
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
