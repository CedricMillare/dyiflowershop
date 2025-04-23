export function TopNav() {
    return (
            <nav className="sticky top-0 w-full flex items-center text-center justify-between p-4 bg-black text-white">
                <div className="text-xl font-bold">Lcarpio's Flower Shop</div>
                
                <div className="flex-1 flex justify-center">
                    <div className="relative group">
                        <a href="#" className=" text-white px-4 py-2 rounded hover:bg-gray-500">Home</a>
                    </div>
                    <div className="relative group">
                        <a href="#" className=" text-white px-4 py-2 rounded hover:bg-gray-500">Bouquet</a>
                        <ul className="fixed pt-5 hidden group-hover:block bg-white text-black rounded">
                            <li><a href="#" className="block px-4 py-2 hover:bg-gray-100">Small Bouquet</a></li>
                            <li><a href="#" className="block px-4 py-2 hover:bg-gray-100">Big Bouquet</a></li>
                            <li><a href="#" className="block px-4 py-2 hover:bg-gray-100">Funeral</a></li>
                            <li><a href="#" className="block px-4 py-2 hover:bg-gray-100">Wedding</a></li>
                        </ul>
                    </div>
                    <div className="relative group">
                        <a href="#" className=" text-white px-4 py-2 rounded hover:bg-gray-500">Flowers</a>
                        <a href="#" className=" text-white px-4 py-2 rounded hover:bg-gray-500">Orders</a>
                    </div>
                </div>
                <div className="w-32"></div>

            </nav>

    );
}