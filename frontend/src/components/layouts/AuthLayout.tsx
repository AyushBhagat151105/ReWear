import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { useStore } from "@/store/authStore"

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    const { user } = useStore()

    if (!user) return null

    return (
        <SidebarProvider>
            <div className="flex min-h-screen">
                <AppSidebar />
                <main className="flex-1 p-6">
                    <SidebarTrigger className="mb-4" />
                    {children}
                </main>
            </div>
        </SidebarProvider>
    )
}
