export function TopNav() {
    return (
            <nav className="sticky max-w flex items-center justify-between p-4 bg-black text-white">
                <div className="text-xl font-bold">Lcarpio's Flower Shop</div>
                
                <div className="flex gap-4 list-none">
                    <div className="relative group">
                        <a href="#" className=" text-white px-4 py-2 rounded hover:bg-gray-500">Home</a>
                    </div>
                    <div className="relative group">
                        <a href="#" className=" text-white px-4 py-2 rounded hover:bg-gray-500">Bouquet</a>
                        <ul className="fixed pt-5 hidden group-hover:block bg-white text-black rounded">
                            <li><a href="#" className="block px-4 py-2 hover:bg-gray-100">Simple Bouquet</a></li>
                            <li><a href="#" className="block px-4 py-2 hover:bg-gray-100">Premium Bouquet</a></li>
                            <li><a href="#" className="block px-4 py-2 hover:bg-gray-100">Special Bouquet</a></li>
                        </ul>
                    </div>
                    <div className="relative group">
                        <a href="#" className=" text-white px-4 py-2 rounded hover:bg-gray-500">For Occasions</a>
                        <ul className="fixed pt-5 hidden group-hover:block bg-white text-black rounded">
                            <li><a href="#" className="block px-4 py-2 hover:bg-gray-100">Funeral Arrangement</a></li>
                            <li><a href="#" className="block px-4 py-2 hover:bg-gray-100">Wedding Arrangement</a></li>
                        </ul>
                    </div>
                    <div className="relative group">
                        <a href="#" className=" text-white px-4 py-2 rounded hover:bg-gray-500">Flowers</a>
                        <a href="#" className=" text-white px-4 py-2 rounded hover:bg-gray-500">Cart</a>
                    </div>
                </div>
                <div>
                    <button className=" text-white px-4 py-2 rounded hover:bg-gray-500">Sign In</button>
                    <button className=" text-white px-4 py-2 rounded hover:bg-gray-500">Sign Up</button>
                </div>
            </nav>

    );
}