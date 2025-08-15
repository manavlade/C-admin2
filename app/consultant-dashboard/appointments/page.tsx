import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AppointmentsTable } from "@/components/appointments-table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { AppointmentForm } from "@/components/appointment-form"

export default function ConsultantAppointmentsPage() {
  // Simulate the current logged-in consultant
  const currentConsultantId = "con1" // Consultant Emily White
  const currentConsultantName = "Consultant Emily White"

  // Dummy data for demonstration, filtered for the current consultant
  const allAppointments = [
    {
      id: "app1",
      patientName: "Alice Johnson",
      consultantName: "Consultant Emily White",
      type: "online",
      dateTime: "2025-07-15 10:00 AM",
      status: "booked",
      paymentStatus: "pending",
      meetingLink: "https://meet.google.com/abc-defg-hij",
      consultantId: "con1",
    },
    {
      id: "app2",
      patientName: "Bob Williams",
      consultantName: "Consultant John Smith",
      type: "offline",
      dateTime: "2025-07-16 02:30 PM",
      status: "completed",
      paymentStatus: "paid",
      consultantId: "con2",
    },
    {
      id: "app3",
      patientName: "Charlie Brown",
      consultantName: "Consultant Sarah Lee",
      type: "online",
      dateTime: "2025-07-17 11:00 AM",
      status: "rescheduled",
      paymentStatus: "paid",
      meetingLink: "https://zoom.us/j/1234567890",
      consultantId: "con3",
    },
    {
      id: "app4",
      patientName: "Diana Miller",
      consultantName: "Consultant Emily White",
      type: "offline",
      dateTime: "2025-07-18 09:00 AM",
      status: "booked",
      paymentStatus: "pending",
      consultantId: "con1",
    },
  ]

  const consultantsAppointments = allAppointments.filter((app) => app.consultantId === currentConsultantId)

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">My Consultant Appointments</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Book New Appointment</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Book New Appointment</DialogTitle>
              <DialogDescription>Schedule a new appointment for a patient with yourself.</DialogDescription>
            </DialogHeader>
            {/* In a real app, you'd pre-fill the consultantId here */}
            <AppointmentForm />
          </DialogContent>
        </Dialog>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Appointments for {currentConsultantName}</CardTitle>
          <CardDescription>View and manage all your patient appointments.</CardDescription>
        </CardHeader>
        <CardContent>
          <AppointmentsTable appointments={consultantsAppointments} />
        </CardContent>
      </Card>
    </div>
  )
}
