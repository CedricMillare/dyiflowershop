<<<<<<< HEAD
import React from "react";

const products = [
  {
    id: 1,
    name: "Bouquet 1",
    price: (250).toFixed(2),
    image: "/Pictures/Bouquet-1.jpg",
    flowers: "Roses, Lilies, and Baby's Breath",
    wrapper: "Classic white paper wrap",
  },
  {
    id: 2,
    name: "Bouquet 2",
    price: (350).toFixed(2),
    image: "/Pictures/Bouquet-2.jpg",
    flowers: "Orchids, Tulips, and Ferns",
    wrapper: "Rustic burlap wrap",
  },
  {
    id: 3,
    name: "Bouquet 3",
    price: (450).toFixed(2),
    image: "/Pictures/Bouquet-3.jpg",
    flowers: "Sunflowers, Daisies, and Eucalyptus",
    wrapper: "Elegant silk ribbon wrap",
  },
];

export default function ShopPage() {
  const handleContactClick = () => {
    window.location.href = "/contact";
  };

  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-b from-[#fefefe] to-[#f5f5f5] font-serif text-gray-800">
      {/* Hero Banner */}
      <section
        className="relative h-[200px] bg-cover bg-center opacity-90"
        style={{ backgroundImage: 'url("/Pictures/Banner-1.jpg")' }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 px-4 text-center">
          <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">
            Shop
          </h1>
          <p className="text-m text-white md:text-base">Home / Shop</p>
        </div>
      </section>

      {/* Product Grid */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex flex-wrap justify-center gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="w-full max-w-xs rounded-lg bg-white shadow transition hover:shadow-lg"
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-auto w-full object-contain"
              />
              <div className="p-4">
                <h3 className="mb-1 text-lg font-semibold">{product.name}</h3>
                <p className="mb-1 text-sm text-gray-500">
                  Flowers: {product.flowers}
                </p>
                <p className="mb-2 text-sm text-gray-500">
                  Wrapper: {product.wrapper}
                </p>
                <p className="mb-2 text-gray-600">₱{product.price}</p>
                <button className="mt-2 w-full rounded bg-[#f6a29d] px-4 py-2 text-white hover:bg-[#e69087]">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-white py-12 text-center">
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">
          Want a Customized Bouquet?
        </h2>
        <p className="mx-auto mb-6 max-w-md text-gray-600">
          Contact us to create a bouquet tailored just for you!
        </p>
        <a href="/Contacts">
          <button className="inline-block rounded bg-rose-400 px-6 py-3 font-semibold text-white transition hover:bg-rose-500">
            Contact Us
          </button>
        </a>
      </section>
    </main>
=======
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useCart } from '~/app/context/CartContext';

interface Bouquet {
  id: number;
  label: string;
  image: string;
  price: number;
  flowers: { [key: string]: number };
  consumables: string[];
}

interface Row {
  id: number;
  title: string;
  items: Bouquet[];
}

export default function ShopPage() {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addItem } = useCart();

  useEffect(() => {
    loadBouquets();
  }, []);

  const loadBouquets = async () => {
    try {
      const res = await fetch('/api/bouquets/load');
      if (!res.ok) throw new Error('Failed to fetch bouquets');
      const data = await res.json();
      setRows(data);
      setError(null);
    } catch (err) {
      console.error('Error loading bouquets:', err);
      setError('Failed to load bouquets. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (bouquet: Bouquet) => {
    addItem(bouquet);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Loading bouquets...</h1>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-red-600">{error}</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Our Bouquets</h1>
        
        {rows.map((row) => (
          <div key={row.id} className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">{row.title}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {row.items.map((bouquet) => (
                <div key={bouquet.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="relative h-48 w-full">
                    <Image
                      src={bouquet.image}
                      alt={bouquet.label}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{bouquet.label}</h3>
                    <p className="text-gray-600 mb-2">₱{bouquet.price.toFixed(2)}</p>
                    <div className="mb-4">
                      <h4 className="text-sm font-medium mb-1">Flowers:</h4>
                      <ul className="text-sm text-gray-600">
                        {Object.entries(bouquet.flowers).map(([flower, quantity]) => (
                          <li key={flower}>
                            {flower} ({quantity})
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mb-4">
                      <h4 className="text-sm font-medium mb-1">Includes:</h4>
                      <ul className="text-sm text-gray-600">
                        {bouquet.consumables.map((consumable) => (
                          <li key={consumable}>{consumable}</li>
                        ))}
                      </ul>
                    </div>
                    <button
                      onClick={() => handleAddToCart(bouquet)}
                      className="w-full bg-pink-600 text-white py-2 px-4 rounded hover:bg-pink-700 transition-colors"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
>>>>>>> 6b1f6d74b51cf09f37162d593ed52e813b60c4f5
  );
}
