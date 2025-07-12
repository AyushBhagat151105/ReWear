const products = [
    { name: "Denim Jacket", image: "/images/jacket.webp" },
    { name: "Floral Dress", image: "/images/dress.jpg" },
    { name: "Running Shoes", image: "/images/shoes.jpg" },
    { name: "Leather Bag", image: "/images/bag.jpg" },
];

export default function ProductList() {
    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-6xl mx-auto px-4">
                <h2 className="text-2xl font-semibold mb-6 text-center">Trending Items</h2>
                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {products.map((product, i) => (
                        <div key={i} className="bg-white p-4 rounded-lg shadow hover:shadow-md transition">
                            <div className="h-40 w-full bg-gray-200 rounded mb-3 overflow-hidden">
                                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                            </div>
                            <h3 className="text-md font-semibold">{product.name}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
