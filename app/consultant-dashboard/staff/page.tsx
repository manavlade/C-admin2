"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { StaffTable } from "@/components/staff-table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { StaffForm } from "@/components/staff-form"

interface Staff {
  id: string
  name: string
  email: string
  phone: string
  role: string
  assignedConsultant: string
  status: string
}

export default function StaffPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null)

  // Simulate current consultant
  const currentConsultant = {
    id: "cons1",
    name: "Dr. Emily White",
    type: "doctor" as "doctor" | "lab" | "nutritionist",
  }

  // Dummy data for demonstration - filtered for current consultant
  const allStaff = [
    {
      id: "staff1",
      name: "Jane Doe",
      email: "jane.d@example.com",
      phone: "555-100-2000",
      role: "staff", // Generic role since role is not required
      assignedConsultant: "Dr. Emily White",
      status: "Active",
      consultantId: "cons1",
    },
    {
      id: "staff2",
      name: "Mike Ross",
      email: "mike.r@example.com",
      phone: "555-101-2001",
      role: "staff",
      assignedConsultant: "Dr. Emily White",
      status: "Active",
      consultantId: "cons1",
    },
    {
      id: "staff3",
      name: "Sarah Connor",
      email: "sarah.c@example.com",
      phone: "555-102-2002",
      role: "staff",
      assignedConsultant: "Dr. Emily White",
      status: "Active",
      consultantId: "cons1",
    },
  ]

  const consultantStaff = allStaff.filter((staff) => staff.consultantId === currentConsultant.id)

  const handleEditStaff = (staff: Staff) => {
    setSelectedStaff(staff)
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    setSelectedStaff(null)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Clinical Staff Management</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setSelectedStaff(null)}>Add New Staff Member</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedStaff ? "Edit Staff Member" : "Add New Clinical Staff Member"}</DialogTitle>
              <DialogDescription>
                {selectedStaff
                  ? "Update the details of the staff member."
                  : "Fill in the basic details to add a new staff member to your team."}
              </DialogDescription>
            </DialogHeader>
            <StaffForm staff={selectedStaff} onClose={handleCloseDialog} />
          </DialogContent>
        </Dialog>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Your Clinical Staff</CardTitle>
          <CardDescription>Manage all clinical staff members in your team.</CardDescription>
        </CardHeader>
        <CardContent>
          <StaffTable staff={consultantStaff} onEditStaff={handleEditStaff} />
        </CardContent>
      </Card>
    </div>
  )
}
