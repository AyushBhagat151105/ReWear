import { motion } from "motion/react"


export default function LandingHero() {
    return (
        <section className="pt-24 pb-16 bg-gradient-to-r from-blue-50 to-blue-100">
            <div className="max-w-7xl mx-auto px-4 flex flex-col items-center text-center space-y-6">
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="text-4xl md:text-5xl font-bold"
                >
                    Discover, List & Swap Fashion Effortlessly
                </motion.h1>
                <p className="text-gray-600 max-w-xl">
                    Join the community where your style finds new life. List your unused items and explore treasures from others.
                </p>
                <motion.img
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    src="/images/hero-banner.jpg"
                    alt="SwapStyle Hero"
                    className="w-full max-w-4xl rounded-xl shadow-lg"
                />
            </div>
        </section>
    );
}
