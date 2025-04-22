export function TopNav() {
    return (
            <nav className="max-w p-4 flex items-center justify-between">
                <div className="text-xl font-bold">Lcarpio's Flower Shop</div>
                
                <div className="flex gap-5">
                    <a href="#" className=" text-white px-4 py-2 rounded hover:bg-gray-500">Home</a>
                    <a href="#" className=" text-white px-4 py-2 rounded hover:bg-gray-500">Bouquet</a>
                    <a href="#" className=" text-white px-4 py-2 rounded hover:bg-gray-500">Flowers</a>
                    <a href="#" className=" text-white px-4 py-2 rounded hover:bg-gray-500">Orders</a>
                </div>

                <div>
                    <button className=" text-white px-4 py-2 rounded hover:bg-gray-500">Log In</button>
                </div>
            </nav>
    );
}