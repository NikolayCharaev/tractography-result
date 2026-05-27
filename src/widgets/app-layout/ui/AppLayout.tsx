import type { ReactNode } from "react"
import { LogOut, Microscope } from "lucide-react"
import { NavLink } from "react-router-dom"

import { useAuth } from "@/features/app-auth"
import { Button } from "@/shared/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/shared/ui/sidebar"
import { TooltipProvider } from "@/shared/ui/tooltip"
import { appNavigation } from "../config/navigation"

type AppLayoutProps = {
  children: ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  const { isAuthenticated, logout } = useAuth()
  const visibleNav = appNavigation.filter(
    (item) => !item.requiresAuth || isAuthenticated,
  )

  return (
    <TooltipProvider delayDuration={0} skipDelayDuration={0}>
      <SidebarProvider>
        <Sidebar>
          <SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton size="lg" className="pointer-events-none">
                  <Microscope />
                  <span>Демонстрация работ</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Навигация</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {visibleNav.map((item) => {
                    const Icon = item?.icon
                    return (
                      <SidebarMenuItem key={item.href}>
                        <SidebarMenuButton
                          asChild
                          tooltip={item.title}
                          tooltipWhenExpanded={item.tooltip}
                        >
                          <NavLink
                            to={item.href}
                            end={item.href === "/"}
                            className={({ isActive, isPending }) =>
                              isPending
                                ? "pending"
                                : isActive
                                  ? "active"
                                  : ""
                            }
                          >
                            {Icon && <Icon />}

                            <span>{item.title}</span>
                          </NavLink>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    )
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarRail />
        </Sidebar>
        <SidebarInset>
          <header className="flex h-14 shrink-0 items-center justify-between gap-2 border-b px-4">
            <SidebarTrigger />
            {isAuthenticated ? (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => logout()}
                className="gap-1.5"
              >
                <LogOut className="size-4" />
                Выйти
              </Button>
            ) : null}
          </header>
          <main className="container mx-auto min-w-0 w-full gap-6 p-4 sm:p-6 lg:p-8">
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  )
}
