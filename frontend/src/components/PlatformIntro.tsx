// components/PlatformIntro.tsx
export default function PlatformIntro() {
    return (
        <section className="py-16 px-4 bg-white">
            <div className="max-w-4xl mx-auto text-center space-y-4">
                <h2 className="text-3xl font-semibold">How SwapStyle Works</h2>
                <p className="text-gray-600">
                    Create an account, list your items, and start swapping with others in the community. It’s that easy!
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8 text-left">
                    <div className="p-4 bg-blue-50 rounded-xl">
                        <h3 className="font-semibold">1. List Your Items</h3>
                        <p className="text-sm text-gray-600">Upload photos, write a description, and set conditions.</p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-xl">
                        <h3 className="font-semibold">2. Browse & Request</h3>
                        <p className="text-sm text-gray-600">Explore listings and request swaps from other users.</p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-xl">
                        <h3 className="font-semibold">3. Swap Securely</h3>
                        <p className="text-sm text-gray-600">Connect, communicate, and exchange in a trusted environment.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
