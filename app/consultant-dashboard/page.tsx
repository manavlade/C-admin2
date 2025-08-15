import { CardDescription } from "@/components/ui/card"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Users, CalendarDays, MessageSquare, PlusCircle, Clock, FileText, Apple } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { AppointmentForm } from "@/components/appointment-form"
import { PrescriptionForm } from "@/components/prescription-form"
import { ReportUploadForm } from "@/components/report-upload-form"
import { DietPlanForm } from "@/components/diet-plan-form"
import Link from "next/link"

export default function ConsultantDashboardPage() {
  // Simulate the current logged-in consultant
  const currentConsultant = {
    id: "cons1",
    name: "Dr. Emily White",
    type: "doctor" as "doctor" | "lab" | "nutritionist",
    email: "emily.white@example.com",
  }

  const getWelcomeMessage = () => {
    switch (currentConsultant.type) {
      case "doctor":
        return `Welcome, ${currentConsultant.name}!`
      case "lab":
        return `Welcome, ${currentConsultant.name}!`
      case "nutritionist":
        return `Welcome, ${currentConsultant.name}!`
      default:
        return `Welcome, ${currentConsultant.name}!`
    }
  }

  const getActionButtonText = () => {
    switch (currentConsultant.type) {
      case "doctor":
        return "Create Prescription"
      case "lab":
        return "Upload Lab Report"
      case "nutritionist":
        return "Create Diet Plan"
      default:
        return "Create Document"
    }
  }

  const getActionIcon = () => {
    switch (currentConsultant.type) {
      case "doctor":
        return <PlusCircle className="mr-2 h-4 w-4" />
      case "lab":
        return <FileText className="mr-2 h-4 w-4" />
      case "nutritionist":
        return <Apple className="mr-2 h-4 w-4" />
      default:
        return <PlusCircle className="mr-2 h-4 w-4" />
    }
  }

  const renderActionForm = () => {
    switch (currentConsultant.type) {
      case "doctor":
        return <PrescriptionForm />
      case "lab":
        return <ReportUploadForm patientId="1" patientName="Sample Patient" />
      case "nutritionist":
        return <DietPlanForm />
      default:
        return <PrescriptionForm />
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold">{getWelcomeMessage()}</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">My Patients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">58</div>
            <p className="text-xs text-muted-foreground">Total patients under your care</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Appointments</CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">Next 7 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clinical Staff</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Staff members under you</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Slots This Week</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15 hrs</div>
            <p className="text-xs text-muted-foreground">Based on your set availability</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Shortcut to Book New Appointment */}
        <Card className="flex flex-col items-center justify-center p-6 text-center">
          <CardTitle className="mb-4 text-lg">Book New Appointment</CardTitle>
          <CardDescription className="mb-4">Schedule a new appointment for one of your patients.</CardDescription>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full">
                <PlusCircle className="mr-2 h-4 w-4" /> Book Appointment
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Book New Appointment</DialogTitle>
                <DialogDescription>Schedule a new appointment for a patient with yourself.</DialogDescription>
              </DialogHeader>
              <AppointmentForm />
            </DialogContent>
          </Dialog>
        </Card>

        {/* Dynamic Action based on consultant type */}
        <Card className="flex flex-col items-center justify-center p-6 text-center">
          <CardTitle className="mb-4 text-lg">{getActionButtonText()}</CardTitle>
          <CardDescription className="mb-4">
            {currentConsultant.type === "doctor" && "Create a new prescription for your patients."}
            {currentConsultant.type === "lab" && "Upload lab reports for patients."}
            {currentConsultant.type === "nutritionist" && "Create diet plans for your patients."}
          </CardDescription>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full">
                {getActionIcon()} {getActionButtonText()}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[700px] lg:max-w-[800px] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{getActionButtonText()}</DialogTitle>
                <DialogDescription>
                  {currentConsultant.type === "doctor" && "Fill in the details to create a new prescription."}
                  {currentConsultant.type === "lab" && "Upload a new lab report for a patient."}
                  {currentConsultant.type === "nutritionist" && "Create a comprehensive diet plan."}
                </DialogDescription>
              </DialogHeader>
              {renderActionForm()}
            </DialogContent>
          </Dialog>
        </Card>

        {/* Manage Staff */}
        <Card className="flex flex-col items-center justify-center p-6 text-center">
          <CardTitle className="mb-4 text-lg">Manage Clinical Staff</CardTitle>
          <CardDescription className="mb-4">Add and manage your clinical staff members.</CardDescription>
          <Link href="/consultant-dashboard/staff" className="w-full">
            <Button className="w-full">
              <MessageSquare className="mr-2 h-4 w-4" /> Manage Staff
            </Button>
          </Link>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity Feed</CardTitle>
          <CardDescription>Latest actions and updates related to your patients.</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <span className="font-medium text-primary">Alice Johnson</span> booked an online appointment with{" "}
              <span className="font-medium text-primary">you</span>.
            </li>
            <li>
              <span className="font-medium text-primary">You</span> uploaded a new{" "}
              {currentConsultant.type === "doctor" && "prescription"}
              {currentConsultant.type === "lab" && "lab report"}
              {currentConsultant.type === "nutritionist" && "diet plan"} for{" "}
              <span className="font-medium text-primary">Bob Williams</span>.
            </li>
            <li>
              New {currentConsultant.type === "doctor" && "prescription"}
              {currentConsultant.type === "lab" && "lab report"}
              {currentConsultant.type === "nutritionist" && "diet plan"} created by{" "}
              <span className="font-medium text-primary">you</span> for{" "}
              <span className="font-medium text-primary">Charlie Brown</span>.
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
