"use client";

import React from "react";

const orders = [
  {
    id: 1,
    item: "Flowers",
    price: 350,
    quantity: 1,
    notes: "Wait for delivery",
    email: "idkpouwu@gmail.com",
    contact: "09000143143",
    deliveryOption: "Fast Delivery",
    paymentType: "Gcash",
  },
  {
    id: 2,
    item: "Chocolate Box",
    price: 500,
    quantity: 2,
    notes: "Deliver before 5 PM",
    email: "anotheruser@example.com",
    contact: "09123456789",
    deliveryOption: "Standard",
    paymentType: "Credit Card",
  },
];

export default function OrderPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start bg-gradient-to-b from-[#454446] to-[#1d1d22] text-white px-4 py-8 space-y-6">
      {orders.map((order) => (
        <div
          key={order.id}
          className="flex w-full max-w-6xl flex-col md:flex-row gap-6 rounded-lg bg-white/10 p-6 shadow-lg"
        >
          <div className="flex flex-col flex-1 gap-4">
            <h2 className="text-3xl font-bold">Order #{order.id}</h2>

            <div className="border-t border-white/20 pt-4 flex items-center gap-4">
              <div className="w-20 h-20 bg-white/30 rounded" />
              <div className="flex-1">
                <p className="font-semibold">{order.item}</p>
                <button className="text-sm text-blue-300 hover:underline">
                  Remove Item
                </button>
              </div>
              <div className="font-bold">{order.price} Pesos</div>
              <input
                type="number"
                min="1"
                defaultValue={order.quantity}
                className="w-12 rounded bg-white/20 px-2 py-1 text-white"
              />
            </div>

            <div>
              <label className="font-semibold block mb-1">
                Additional Information
              </label>
              <textarea
                defaultValue={order.notes}
                className="w-full h-24 rounded bg-white/20 p-2 text-white"
              />
            </div>

            <div>
              <label className="font-semibold block mb-1">
                Proof of Payment
              </label>
              <div className="w-24 h-24 bg-white/30 rounded" />
            </div>

            <div className="text-right font-bold">
              Total: {order.price * order.quantity} Pesos
            </div>
          </div>

          <div className="flex-1 rounded bg-white/20 p-4">
            <h3 className="text-2xl font-bold mb-4">Customer Details</h3>
            <p>
              <span className="font-semibold">Email:</span> {order.email}
            </p>
            <p>
              <span className="font-semibold">Contacts:</span> {order.contact}
            </p>
            <p>
              <span className="font-semibold">Delivery Option:</span>{" "}
              {order.deliveryOption}
            </p>
            <p>
              <span className="font-semibold">Payment Type:</span>{" "}
              {order.paymentType}
            </p>

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
      ))}
    </main>
  );
}
