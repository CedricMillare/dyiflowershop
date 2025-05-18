'use client';

type Listener = (val: {[key : string] : number}) => void;
const Flowers : string[] = [
  "Lily",
  "Rose",
  "Tulip",
  "Chrysanthemum",
]

const Consumables : string[] = [
  "Wrapper",
  "Ribbon",
  "Sequins",
  "Silk"
]
class inventoryClass {
  private _flowers: { [key : string] : number } = {};
  private _listeners: Listener[] = [];
  private _initialized = false;

  constructor() {
    if (typeof window !== 'undefined') {
      this.init();
    }
  }

  private init() {
    if (this._initialized) return;
    const stored = localStorage.getItem("Flowers");
    this._flowers = Flowers.reduce((result:{[key : string] : number}, flower:string) => {
      if (result[flower] == undefined) {
        result[flower] = 0;
      }
      return result;
    }, (stored ? JSON.parse(stored) : this._flowers));

    Object.keys(this._flowers).forEach((key:string) => {
      if (Flowers.indexOf(key) == -1) {
        delete this._flowers[key];
      }
    });
    this._initialized = true;
  }

  get flowers() {
    if (typeof window !== 'undefined' && !this._initialized) {
      this.init();
    }
    return this._flowers;
  }

  get consumables() {
    return Consumables;
  }

  removeFlower(flower: string, quantity: number) {
    const newQuantity = (this.flowers[flower]||0)-quantity;
    this._flowers[flower]=newQuantity;
    this._listeners.forEach((listener) => listener(this._flowers));
    localStorage.setItem("Flowers", JSON.stringify(this._flowers));
  }

  addFlower(flower: string, quantity: number) {
    const newQuantity = (this.flowers[flower]||0)+quantity;
    this._flowers[flower]=newQuantity;
    this._listeners.forEach((listener) => listener(this._flowers));
    localStorage.setItem("Flowers", JSON.stringify(this._flowers));
  }

  setFlower(flower: string, quantity: number) {
    const newQuantity = quantity;
    this._flowers[flower]=newQuantity;
    this._listeners.forEach((listener) => listener(this._flowers));
    localStorage.setItem("Flowers", JSON.stringify(this._flowers));
  }
  onChange(listener: Listener) {
    this._listeners.push(listener);
  }
}

export const inventory = new inventoryClass();