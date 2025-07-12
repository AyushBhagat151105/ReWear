export default function CategoryGrid() {
    const categories = ["Men", "Women", "Accessories", "Shoes", "Bags", "Kids"];

    return (
        <section className="py-12 bg-white">
            <div className="max-w-6xl mx-auto px-4">
                <h2 className="text-2xl font-semibold mb-6 text-center">Categories</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                    {categories.map((cat, i) => (
                        <div
                            key={i}
                            className="bg-blue-100 text-blue-800 py-4 px-2 text-center rounded-lg font-semibold hover:bg-blue-200 cursor-pointer transition"
                        >
                            {cat}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
