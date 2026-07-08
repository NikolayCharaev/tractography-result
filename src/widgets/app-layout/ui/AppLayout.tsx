import type { ReactNode } from "react"
import { useState } from "react"
import { LogIn, LogOut, Microscope } from "lucide-react"
import { NavLink } from "react-router-dom"

import { LoginForm, useAuth } from "@/features/app-auth"
import { Button } from "@/shared/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog"
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
  const [loginOpen, setLoginOpen] = useState(false)
  const visibleNav = appNavigation.filter(
    (item) => !item.requiresAuth || isAuthenticated,
  )

  return (
    <TooltipProvider delayDuration={0} skipDelayDuration={0}>
      <SidebarProvider>
        <Sidebar collapsible="icon">
          <SidebarHeader>
            <SidebarMenu >
              <SidebarMenuItem>
                <SidebarMenuButton size="lg" className="pointer-events-none flex group-data-[state=collapsed]:justify-center">
                  <Microscope />
                  <span className="group-data-[state=collapsed]:hidden">
                    Демонстрация работ
                  </span>
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
          <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center justify-between gap-2 border-b bg-background/95 px-4 backdrop-blur supports-backdrop-filter:bg-background/80">
            <SidebarTrigger />
            <div className="flex items-center gap-2">
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
              ) : (
                <>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="gap-1.5"
                    onClick={() => setLoginOpen(true)}
                  >
                    <LogIn className="size-4" />
                    Войти
                  </Button>
                  <Dialog open={loginOpen} onOpenChange={setLoginOpen}>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Вход</DialogTitle>
                        <DialogDescription>
                          Введите пароль, чтобы открыть остальные разделы
                          демонстрации.
                        </DialogDescription>
                      </DialogHeader>
                      <LoginForm
                        idPrefix="header-login"
                        onSuccess={() => setLoginOpen(false)}
                      />
                    </DialogContent>
                  </Dialog>
                </>
              )}
            </div>
          </header>
          <main className="container mx-auto min-w-0 w-full gap-6 p-4 sm:p-6 lg:p-8">
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  )
}
