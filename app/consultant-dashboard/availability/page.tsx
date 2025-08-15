"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ConsultantAvailabilityManager } from "@/components/consultant-availability-manager"
import { ConsultantAvailabilityCalendar } from "@/components/consultant-availability-calendar" // Assuming this is for specific dates

export default function ConsultantAvailabilityPage() {
  // Simulate the current logged-in consultant
  const currentConsultantId = "con1" // Consultant John Doe
  const currentConsultantName = "Consultant John Doe"

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold">Manage My Availability</h1>
      <Card>
        <CardHeader>
          <CardTitle>Set Weekly Recurring Availability</CardTitle>
          <CardDescription>Define your standard working hours for each day of the week.</CardDescription>
        </CardHeader>
        <CardContent>
          <ConsultantAvailabilityManager consultantId={currentConsultantId} consultantName={currentConsultantName} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Set Specific Date Availability</CardTitle>
          <CardDescription>
            Add or modify availability for specific dates (e.g., one-off changes, holidays).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ConsultantAvailabilityCalendar consultantId={currentConsultantId} consultantName={currentConsultantName} />
        </CardContent>
      </Card>
    </div>
  )
}
