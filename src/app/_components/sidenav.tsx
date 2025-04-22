export function SideNav() {
    return (
            <nav className="px-5 w-50 h-screen absolute bg-black text-white p-6 space-y-4">
                <a href="#" className="block py-2 px-3 rounded hover:bg-gray-700">Small Bouquet</a>
                <a href="#" className="block py-2 px-3 rounded hover:bg-gray-700">Big Bouquet</a>
                <a href="#" className="block py-2 px-3 rounded hover:bg-gray-700">Funeral</a>
                <a href="#" className="block py-2 px-3 rounded hover:bg-gray-700">Wedding</a>
            </nav>
    );
}