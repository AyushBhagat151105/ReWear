import { Button } from "@/components/ui/button";
import { motion } from "motion/react";

export default function CTASection() {
    return (
        <section className="py-20 px-6 bg-gradient-to-br from-[#f0f4ff] to-[#e0ecff] text-gray-900">
            <div className="max-w-5xl mx-auto text-center space-y-8">
                {/* Title */}
                <motion.h2
                    className="text-4xl sm:text-5xl font-bold leading-tight tracking-tight"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    Ready to Swap Something New?
                </motion.h2>

                {/* Description */}
                <motion.p
                    className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                >
                    Start your sustainable fashion journey today. Join thousands who are swapping their style — affordably and consciously.
                </motion.p>

                {/* Action Buttons */}
                <motion.div
                    className="flex justify-center gap-4 flex-wrap mt-6"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                >
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 text-base rounded-xl shadow">
                        Start Swapping
                    </Button>
                    <Button
                        variant="outline"
                        className="text-blue-600 border-blue-600 hover:bg-blue-50 px-6 py-3 text-base rounded-xl"
                    >
                        Browse Items
                    </Button>
                    <Button
                        variant="secondary"
                        className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 text-base rounded-xl"
                    >
                        List an Item
                    </Button>
                </motion.div>
            </div>
        </section>
    );
}