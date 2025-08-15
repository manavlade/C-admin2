"use client"
import { useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { PrescriptionsTable } from "@/components/prescriptions-table"
import { ReportsTable } from "@/components/reports-table"
import { DietPlansTable } from "@/components/diet-plans-table"
import { PrescriptionForm } from "@/components/prescription-form"
import { ReportUploadForm } from "@/components/report-upload-form"
import { DietPlanForm } from "@/components/diet-plan-form"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function ConsultantPatientDetailPage() {
  const params = useParams()
  const patientId = params.id as string

  // Simulate the current logged-in consultant
  const currentConsultantId = "con1" // Consultant Emily White
  const currentConsultantType = "doctor" // Types: doctor, lab, nutritionist

  // Dummy data for a single patient (in a real app, you'd fetch this based on ID and ensure it's your patient)
  const patient = {
    id: patientId,
    name: "Alice Johnson", // Example name, would be fetched based on ID
    email: "alice.j@example.com",
    phone: "555-123-4567",
    dob: "1980-05-15",
    address: "123 Main St, Anytown, USA",
    medicalHistory: "Type 2 Diabetes, Hypertension, Previous Breast Cancer (2018)",
    primaryConsultant: "Consultant Emily White", // Example primary consultant
    primaryConsultantId: "con1", // Added for filtering
  }

  // Dummy data for prescriptions, reports, and diet plans for this specific patient, filtered by current consultant
  const allPrescriptions = [
    {
      id: "rx1",
      patientName: patient.name,
      consultantName: "Consultant Emily White",
      datePrescribed: "2025-07-10",
      medication: "Multiple Medications",
      dosage: "See details",
      consultantId: "con1",
      consultantType: "doctor",
    },
    {
      id: "rx4",
      patientName: patient.name,
      consultantName: "Consultant John Smith",
      datePrescribed: "2025-06-20",
      medication: "Pain Management X",
      dosage: "1 tablet daily",
      consultantId: "con2",
      consultantType: "doctor",
    },
  ]

  const allReports = [
    {
      id: "rep1",
      patientName: patient.name,
      consultantName: "Consultant Emily White",
      dateGenerated: "2025-07-01",
      reportType: "Pathology Report",
      status: "Finalized",
      fileUrl: "/placeholder.pdf?query=pathology-report-alice-johnson",
      consultantId: "con1",
      consultantType: "lab",
    },
    {
      id: "rep5",
      patientName: patient.name,
      consultantName: "Consultant John Smith",
      dateGenerated: "2025-06-15",
      reportType: "Blood Test Results",
      status: "Finalized",
      fileUrl: "/placeholder.pdf?query=blood-test-results-alice-johnson",
      consultantId: "con2",
      consultantType: "lab",
    },
  ]

  const allDietPlans = [
    {
      id: "dp1",
      patientName: patient.name,
      consultantName: "Consultant Emily White",
      dateCreated: "2025-07-10",
      planDetails: "Low-carb diet",
      consultantId: "con1",
      consultantType: "nutritionist",
    },
    {
      id: "dp2",
      patientName: patient.name,
      consultantName: "Consultant Sarah Brown",
      dateCreated: "2025-06-20",
      planDetails: "High-protein diet",
      consultantId: "con3",
      consultantType: "nutritionist",
    },
  ]

  // Filter prescriptions, reports, and diet plans based on consultant type
  const patientPrescriptions = allPrescriptions.filter(
    (rx) =>
      rx.patientName === patient.name &&
      rx.consultantId === currentConsultantId &&
      rx.consultantType === currentConsultantType,
  )
  const patientReports = allReports.filter(
    (rep) =>
      rep.patientName === patient.name &&
      rep.consultantId === currentConsultantId &&
      rep.consultantType === currentConsultantType,
  )
  const patientDietPlans = allDietPlans.filter(
    (dp) =>
      dp.patientName === patient.name &&
      dp.consultantId === currentConsultantId &&
      dp.consultantType === currentConsultantType,
  )

  // In a real app, you'd also check if this patient is assigned to the current consultant
  // For this demo, we assume if you're on this page, you have access.

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold">Patient Details: {patient.name}</h1>

      <Card>
        <CardHeader>
          <CardTitle>Patient Information</CardTitle>
          <CardDescription>Overview of {patient.name}&apos;s profile.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Email</p>
            <p className="text-lg">{patient.email}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Phone</p>
            <p className="text-lg">{patient.phone}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Date of Birth</p>
            <p className="text-lg">{patient.dob}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Primary Consultant</p>
            <p className="text-lg">{patient.primaryConsultant}</p>
          </div>
          <div className="md:col-span-2">
            <p className="text-sm font-medium text-muted-foreground">Address</p>
            <p className="text-lg">{patient.address}</p>
          </div>
          <div className="md:col-span-2">
            <p className="text-sm font-medium text-muted-foreground">Medical History</p>
            <p className="text-lg">{patient.medicalHistory}</p>
          </div>
        </CardContent>
      </Card>

      <Separator />

      {currentConsultantType === "doctor" && (
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Prescriptions</h2>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Add New Prescription</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[700px] lg:max-w-[800px] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Prescription for {patient.name}</DialogTitle>
                <DialogDescription>Fill in the details to create a new prescription.</DialogDescription>
              </DialogHeader>
              {/* Pre-fill patientId and consultantId for the form */}
              <PrescriptionForm patientId={patient.id} consultantId={currentConsultantId} />
            </DialogContent>
          </Dialog>
        </div>
      )}

      {currentConsultantType === "doctor" && (
        <Card>
          <CardHeader>
            <CardTitle>Your Prescriptions for {patient.name}</CardTitle>
            <CardDescription>All prescriptions you have issued to {patient.name}.</CardDescription>
          </CardHeader>
          <CardContent>
            <PrescriptionsTable prescriptions={patientPrescriptions} />
          </CardContent>
        </Card>
      )}

      {currentConsultantType === "lab" && (
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Reports</h2>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Upload New Report</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Upload New Report for {patient.name}</DialogTitle>
                <DialogDescription>Upload a new medical report for this patient.</DialogDescription>
              </DialogHeader>
              {/* Pre-fill patientId and consultantId for the form */}
              <ReportUploadForm patientId={patient.id} patientName={patient.name} consultantId={currentConsultantId} />
            </DialogContent>
          </Dialog>
        </div>
      )}

      {currentConsultantType === "lab" && (
        <Card>
          <CardHeader>
            <CardTitle>Medical Reports (Uploaded by You)</CardTitle>
            <CardDescription>All medical reports you have uploaded for {patient.name}.</CardDescription>
          </CardHeader>
          <CardContent>
            <ReportsTable reports={patientReports} />
          </CardContent>
        </Card>
      )}

      {currentConsultantType === "nutritionist" && (
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Diet Plans</h2>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Create New Diet Plan</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Diet Plan for {patient.name}</DialogTitle>
                <DialogDescription>Fill in the details to create a new diet plan.</DialogDescription>
              </DialogHeader>
              {/* Pre-fill patientId and consultantId for the form */}
              <DietPlanForm patientId={patient.id} consultantId={currentConsultantId} />
            </DialogContent>
          </Dialog>
        </div>
      )}

      {currentConsultantType === "nutritionist" && (
        <Card>
          <CardHeader>
            <CardTitle>Your Diet Plans for {patient.name}</CardTitle>
            <CardDescription>All diet plans you have created for {patient.name}.</CardDescription>
          </CardHeader>
          <CardContent>
            <DietPlansTable dietPlans={patientDietPlans} />
          </CardContent>
        </Card>
      )}
    </div>
  )
}
