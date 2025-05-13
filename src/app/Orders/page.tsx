import React from "react";

export default function OrderPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-[#454446] to-[#1d1d22] text-white px-4">
      <div className="flex w-full max-w-6xl flex-col md:flex-row gap-6 rounded-lg bg-white/10 p-6 shadow-lg">

        <div className="flex flex-col flex-1 gap-4">
          <h2 className="text-3xl font-bold">Orders</h2>

          <div className="border-t border-white/20 pt-4 flex items-center gap-4">
            <div className="w-20 h-20 bg-white/30 rounded" />
            <div className="flex-1">
              <p className="font-semibold">Flowers</p>
              <button className="text-sm text-blue-300 hover:underline">Remove Item</button>
            </div>
            <div className="font-bold">350 Pesos</div>
            <input
              type="number"
              defaultValue={1}
              className="w-12 rounded bg-white/20 px-2 py-1 text-white"
            />
          </div>

          <div>
            <label className="font-semibold block mb-1">Additional Information</label>
            <textarea
              defaultValue="Wait for delivery"
              className="w-full h-24 rounded bg-white/20 p-2 text-white"
            />
          </div>

          <div>
            <label className="font-semibold block mb-1">Proof of Payment</label>
            <div className="w-24 h-24 bg-white/30 rounded" />
          </div>

          <div className="text-right font-bold">Total: 350 Pesos</div>
        </div>

        <div className="flex-1 rounded bg-white/20 p-4">
          <h3 className="text-2xl font-bold mb-4">Order</h3>
          <p><span className="font-semibold">Email:</span> idkpouwu@gmail.com</p>
          <p><span className="font-semibold">Contacts:</span> 09000143143</p>
          <p><span className="font-semibold">Delivery Option:</span> Fast Delivery</p>
          <p><span className="font-semibold">Payment Type:</span> Gcash</p>

          <div className="flex gap-4 mt-6">
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
              Accept Order
            </button>
            <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">
              Deny Order
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
