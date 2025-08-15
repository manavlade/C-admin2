import type React from "react"
import { Home, CalendarDays, Users, Stethoscope, MessageSquare, Clock, BriefcaseMedical } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function ConsultantDashboardLayout({ children }: { children: React.ReactNode }) {
  // Simulate current consultant - in real app this would come from auth
  const currentConsultant = {
    id: "cons1",
    name: "Dr. Emily White",
    type: "doctor" as "doctor" | "lab" | "nutritionist",
    email: "emily.white@example.com",
  }

  const getPortalTitle = () => {
    switch (currentConsultant.type) {
      case "doctor":
        return "Doctor Portal"
      case "lab":
        return "Lab Portal"
      case "nutritionist":
        return "Nutritionist Portal"
      default:
        return "Consultant Portal"
    }
  }

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/consultant-dashboard" className="flex items-center gap-2 font-semibold">
              <Stethoscope className="h-6 w-6" />
              <span className="">{getPortalTitle()}</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <Link
                href="/consultant-dashboard"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Home className="h-4 w-4" />
                Dashboard
              </Link>
              <Link
                href="/consultant-dashboard/appointments"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <CalendarDays className="h-4 w-4" />
                My Appointments
              </Link>
              <Link
                href="/consultant-dashboard/patients"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Users className="h-4 w-4" />
                My Patients
              </Link>
              <Link
                href="/consultant-dashboard/staff"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <BriefcaseMedical className="h-4 w-4" />
                Clinical Staff
              </Link>
              <Link
                href="/consultant-dashboard/availability"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Clock className="h-4 w-4" />
                My Availability
              </Link>
              {currentConsultant.type === "doctor" && (
                <Link
                  href="/consultant-dashboard/tumor-boards"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <MessageSquare className="h-4 w-4" />
                  Tumor Boards
                </Link>
              )}
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="shrink-0 md:hidden bg-transparent">
                <Home className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link href="/consultant-dashboard" className="flex items-center gap-2 text-lg font-semibold">
                  <Stethoscope className="h-6 w-6" />
                  <span className="sr-only">{getPortalTitle()}</span>
                </Link>
                <Link
                  href="/consultant-dashboard"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Home className="h-5 w-5" />
                  Dashboard
                </Link>
                <Link
                  href="/consultant-dashboard/appointments"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <CalendarDays className="h-5 w-5" />
                  My Appointments
                </Link>
                <Link
                  href="/consultant-dashboard/patients"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Users className="h-5 w-5" />
                  My Patients
                </Link>
                <Link
                  href="/consultant-dashboard/staff"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <BriefcaseMedical className="h-5 w-5" />
                  Clinical Staff
                </Link>
                <Link
                  href="/consultant-dashboard/availability"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Clock className="h-5 w-5" />
                  My Availability
                </Link>
                {currentConsultant.type === "doctor" && (
                  <Link
                    href="/consultant-dashboard/tumor-boards"
                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                  >
                    <MessageSquare className="h-5 w-5" />
                    Tumor Boards
                  </Link>
                )}
              </nav>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">{/* Search or other header elements can go here */}</div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Consultant Avatar" />
                  <AvatarFallback>
                    {currentConsultant.type === "doctor" ? "DR" : currentConsultant.type === "lab" ? "LB" : "NT"}
                  </AvatarFallback>
                </Avatar>
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Profile</DropdownMenuLabel>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">{children}</main>
      </div>
    </div>
  )
}
