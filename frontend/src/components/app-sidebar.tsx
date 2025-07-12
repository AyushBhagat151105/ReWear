import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    Home,
    Search,
    Shirt,
    Repeat,
    User,
    LogOut,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"

export function AppSidebar() {
    const [active, setActive] = useState("Profile")

    const navItems = [
        { label: "Home", icon: Home },
        { label: "Explore", icon: Search },
        { label: "My Items", icon: Shirt },
        { label: "Swaps", icon: Repeat },
        { label: "Profile", icon: User },
    ]

    return (
        <Sidebar className="w-[260px] border-r bg-background">
            {/* Header with user info */}
            <SidebarHeader className="mb-6 px-4">
                <div className="flex items-center gap-4">
                    <Avatar>
                        <AvatarImage src="https://i.pravatar.cc/100" />
                        <AvatarFallback>OB</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="text-sm font-medium">Olivia Bennett</p>
                        <p className="text-xs text-muted-foreground">120 points</p>
                    </div>
                </div>
            </SidebarHeader>

            {/* Navigation */}
            <SidebarContent>
                <SidebarGroup>
                    {navItems.map(({ label, icon: Icon }) => (
                        <Button
                            key={label}
                            variant="ghost"
                            className={cn(
                                "w-full justify-start gap-3 px-4 py-2 text-sm",
                                active === label && "bg-muted text-foreground"
                            )}
                            onClick={() => setActive(label)}
                        >
                            <Icon className="h-4 w-4" />
                            {label}
                        </Button>
                    ))}
                </SidebarGroup>
            </SidebarContent>

            {/* Footer (optional) */}
            <SidebarFooter className="px-4">
                <Button
                    variant="ghost"
                    className="w-full justify-start gap-3 text-sm"
                    onClick={() => console.log("Logout")}
                >
                    <LogOut className="h-4 w-4" />
                    Logout
                </Button>
            </SidebarFooter>
        </Sidebar>
    )
}
