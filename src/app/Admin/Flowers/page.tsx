<<<<<<< HEAD
"use client";

import { useState, useEffect } from "react";
import { inventory } from "../../inventory";
import { useAuth } from "@clerk/nextjs";

export default function FlowersPage() {
    const [flowers, updateFlowers] = useState<{[key : string] : number}>({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { isLoaded, userId, getToken } = useAuth();
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const checkAdmin = async () => {
            if (!isLoaded || !userId) {
                setIsAdmin(false);
                return;
            }

            try {
                const token = await getToken();
                const res = await fetch("/api/inventory", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setIsAdmin(res.ok);
            } catch (err) {
                console.error("Error checking admin status:", err);
                setIsAdmin(false);
            }
        };

        checkAdmin();
    }, [isLoaded, userId, getToken]);

    const loadFlowers = async () => {
        try {
            const token = await getToken();
            const res = await fetch("/api/inventory", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!res.ok) throw new Error("Failed to fetch flowers");
            const data = await res.json();
            const flowersMap = data.flowers.reduce((acc: {[key: string]: number}, flower: any) => {
                acc[flower.name] = flower.quantity;
                return acc;
            }, {});
            updateFlowers(flowersMap);
            setError(null);
        } catch (err) {
            console.error("Error loading flowers:", err);
            setError("Failed to load flowers");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadFlowers();
    }, []);

    // Add Flower handler
    const handleAddFlower = async () => {
        if (!isAdmin) {
            alert("Only admins can add flowers");
            return;
        }

        const name = prompt("Enter flower name:");
        if (!name) return;
        const quantityStr = prompt("Enter quantity (default 0):", "0");
        const quantity = Number(quantityStr) || 0;
        try {
            const token = await getToken();
            const res = await fetch("/api/inventory", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ name, quantity }),
            });

            if (!res.ok) throw new Error("Failed to add flower");
            
            const data = await res.json();
            const flowersMap = data.flowers.reduce((acc: {[key: string]: number}, flower: any) => {
                acc[flower.name] = flower.quantity;
                return acc;
            }, {});
            updateFlowers(flowersMap);
            setError(null);
        } catch (err) {
            console.error("Failed to add flower:", err);
            setError("Failed to add flower");
        }
    };

    // Delete Flower handler
    const handleDeleteFlower = async (flowerName: string) => {
        if (!isAdmin) {
            alert("Only admins can delete flowers");
            return;
        }

        if (!confirm(`Are you sure you want to delete ${flowerName}?`)) return;
        
        try {
            const token = await getToken();
            const res = await fetch("/api/inventory", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ name: flowerName }),
            });

            if (!res.ok) throw new Error("Failed to delete flower");
            
            const data = await res.json();
            const flowersMap = data.flowers.reduce((acc: {[key: string]: number}, flower: any) => {
                acc[flower.name] = flower.quantity;
                return acc;
            }, {});
            updateFlowers(flowersMap);
            setError(null);
        } catch (err) {
            console.error("Failed to delete flower:", err);
            setError("Failed to delete flower");
        }
    };

    if (isLoading) {
        return (
            <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#454446] to-[#1d1d22] text-white">
                <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
                    <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
                        Loading...
                    </h1>
                </div>
            </main>
        );
    }

    if (error) {
        return (
            <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#454446] to-[#1d1d22] text-white">
                <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
                    <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
                        Error: {error}
                    </h1>
                    <button
                        className="rounded bg-blue-600 px-4 py-2 text-white font-semibold hover:bg-blue-700"
                        onClick={loadFlowers}
                    >
                        Retry
                    </button>
                </div>
            </main>
        );
    }

    return (
        <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#454446] to-[#1d1d22] text-white">
            <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
                <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
                    Flowers
                </h1>
                {isAdmin && (
                    <button
                        className="mb-6 rounded bg-green-600 px-4 py-2 text-white font-semibold hover:bg-green-700"
                        onClick={handleAddFlower}
                    >
                        Add Flower
                    </button>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {Object.entries(flowers).map(([flower, qty]) => (
                        <div
                            key={flower}
                            className="flex items-center gap-6 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20 relative"
                        >
                            {isAdmin && (
                                <button
                                    className="absolute top-2 right-2 text-red-500 hover:text-red-600 font-bold"
                                    onClick={() => handleDeleteFlower(flower)}
                                >
                                    ╳
                                </button>
                            )}
                            <div className="flex flex-col gap-3 w-full">
                                <label className="block mb-1 text-sm font-medium">{flower}</label>

                                <input
                                    type="number"
                                    min="0"
                                    value={qty}
                                    onChange={(e) => {
                                        const newFlowers = {...flowers};
                                        newFlowers[flower] = Number(e.target.value);
                                        updateFlowers(newFlowers);
                                    }}
                                    className="w-full rounded bg-white/20 px-2 py-1 text-sm text-white focus:outline-none"
                                    placeholder="Qty"
                                />

                                {isAdmin && (
                                    <button
                                        className="mt-1 rounded bg-black px-3 py-1 text-sm hover:bg-gray-800"
                                        onClick={async () => {
                                            try {
                                                const token = await getToken();
                                                const res = await fetch("/api/inventory", {
                                                    method: "PUT",
                                                    headers: {
                                                        "Content-Type": "application/json",
                                                        Authorization: `Bearer ${token}`,
                                                    },
                                                    body: JSON.stringify({ name: flower, quantity: qty }),
                                                });

                                                if (!res.ok) throw new Error("Failed to save flower");
                                                
                                                const data = await res.json();
                                                const flowersMap = data.flowers.reduce((acc: {[key: string]: number}, flower: any) => {
                                                    acc[flower.name] = flower.quantity;
                                                    return acc;
                                                }, {});
                                                updateFlowers(flowersMap);
                                                alert(`Saved: ${flower}, Qty: ${qty}`);
                                            } catch (err) {
                                                console.error("Failed to save flower:", err);
                                                setError("Failed to save flower quantity");
                                            }
                                        }}
                                    >
                                        Save
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
=======
'use client';

import { useEffect, useState } from "react";
import { flowers } from "~/server/db/schema";
import { db } from "~/server/db";

export default function FlowersPage() {
  const [flowerList, setFlowerList] = useState<{ id: number; name: string; quantity: number }[]>([]);
  const [newFlower, setNewFlower] = useState({ name: '', quantity: 0 });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadFlowers();
  }, []);

  const loadFlowers = async () => {
    try {
      const res = await fetch("/api/flowers/load");
      if (!res.ok) throw new Error("Failed to fetch flowers");
      const data = await res.json();
      setFlowerList(data);
    } catch (err) {
      console.error("Error loading flowers:", err);
      setError("Failed to load flowers. Please try again later.");
    }
  };

  const addFlower = async () => {
    if (!newFlower.name || newFlower.quantity < 0) {
      alert("Please enter a valid flower name and quantity");
      return;
    }

    try {
      const res = await fetch("/api/flowers/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newFlower),
      });

      if (!res.ok) throw new Error("Failed to add flower");
      
      setNewFlower({ name: '', quantity: 0 });
      await loadFlowers();
    } catch (err) {
      console.error("Error adding flower:", err);
      alert("Failed to add flower. Please try again.");
    }
  };

  const deleteFlower = async (name: string) => {
    if (!confirm(`Are you sure you want to delete ${name}?`)) return;

    try {
      const res = await fetch("/api/flowers/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      if (!res.ok) throw new Error("Failed to delete flower");
      
      await loadFlowers();
    } catch (err) {
      console.error("Error deleting flower:", err);
      alert("Failed to delete flower. Please try again.");
    }
  };

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-700">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100 text-gray-900 p-6">
      <div className="w-full max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Flower Management</h1>
        
        {/* Add new flower form */}
        <div className="bg-gray-500 p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-white text-xl font-semibold mb-4">Add New Flower</h2>
          <div className="flex gap-4">
            <input
              type="text"
              value={newFlower.name}
              onChange={(e) => setNewFlower({ ...newFlower, name: e.target.value })}
              placeholder="Flower name"
              className="flex-1 p-2 border rounded bg-white"
            />
            <input
              type="number"
              value={newFlower.quantity}
              onChange={(e) => setNewFlower({ ...newFlower, quantity: Number(e.target.value) })}
              placeholder="Quantity"
              min="0"
              className="w-32 p-2 border rounded bg-white"
            />
            <button
              onClick={addFlower}
              className="bg-gray-700 hover:bg-green-800 text-white font-semibold py-2 px-4 rounded"
            >
              Add Flower
            </button>
          </div>
        </div>

        {/* Flower list */}
        <div className="bg-gray-500 p-6 rounded-lg shadow-md">
          <h2 className="text-white text-xl font-semibold mb-4">Flower List</h2>
          <div className="space-y-4">
            {flowerList.map((flower) => (
              <div
                key={flower.name}
                className="bg-white flex items-center justify-between p-4 border rounded hover:bg-gray-50"
              >
                <div>
                  <h3 className="font-medium">{flower.name}</h3>
                  <p className="text-gray-600">Quantity: {flower.quantity}</p>
                </div>
                <button
                  onClick={() => deleteFlower(flower.name)}
                  className="bg-gray-700 hover:bg-green-800 text-white font-semibold py-2 px-4 rounded"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 
>>>>>>> 6b1f6d74b51cf09f37162d593ed52e813b60c4f5
