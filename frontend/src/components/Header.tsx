import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";

export default function Navbar() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full border-b shadow-sm bg-white fixed top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-lg font-bold">ReWear</div>
        <div className="hidden md:flex gap-4 items-center">
          <Input placeholder="Search items..." className="w-64" />
          <Button variant="default">Search</Button>
        </div>
        <Button className="md:hidden" size="icon" variant="outline" onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
          <Menu />
        </Button>
      </div>
    </motion.header>
  );
}
