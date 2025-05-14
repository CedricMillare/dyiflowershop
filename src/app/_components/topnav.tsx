export function TopNav() {
    return (
        <nav className="sticky top-0 z-50 w-full flex items-center justify-between p-4 bg-black text-white">
            <div className="text-xl font-bold">Lcarpio's Flower Shop</div>
            
            <div className="flex gap-4 list-none">
                <div className="relative group">
                    <a href="/Home" className="text-white px-4 py-2 rounded hover:bg-gray-500">Home</a>
                </div>
                <div className="relative group">
                    <a href="/Shop" className="text-white px-4 py-2 rounded hover:bg-gray-500">Shop</a>
                    <ul className="absolute hidden group-hover:block bg-white text-black rounded shadow-md mt-2">
                        <li><a href="/Bouquet" className="block px-4 py-2 hover:bg-gray-100">Bouquet</a></li>
                        <li><a href="/ForOccasions" className="block px-4 py-2 hover:bg-gray-100">For Occasions</a></li>
                    </ul>
                </div>
                <div className="relative group">
                    <a href="/Flowers" className="text-white px-4 py-2 rounded hover:bg-gray-500">Flowers</a>
                </div>
                <div className="relative group">
                    <a href="/Orders" className="text-white px-4 py-2 rounded hover:bg-gray-500">Orders</a>
                </div>
            </div>

            <div className="flex gap-2">
                <button className="text-white px-4 py-2 rounded hover:bg-gray-500">Sign In</button>
                <button className="text-white px-4 py-2 rounded hover:bg-gray-500">Sign Up</button>
            </div>
        </nav>
    );
}