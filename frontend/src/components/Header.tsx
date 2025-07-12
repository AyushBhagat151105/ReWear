import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";
import { useRouter } from "@tanstack/react-router";

export default function Navbar() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter()

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

          <Button variant="outline" onClick={() => router.navigate({ to: "/register" })}>Register</Button>
          <Button variant="default" onClick={() => router.navigate({ to: "/login" })}>Login</Button>
        </div>
        <Button className="md:hidden" size="icon" variant="outline" onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
          <Menu />
        </Button>
      </div>
    </motion.header>
  );
}
