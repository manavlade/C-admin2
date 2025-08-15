"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"
import { MultiSelect } from "@/components/ui/multi-select"

export function TumorBoardForm() {
  const [patientId, setPatientId] = useState<string>("")
  const [participatingDoctorIds, setParticipatingDoctorIds] = useState<string[]>([])
  const [meetingDate, setMeetingDate] = useState<string>("")
  const [meetingTime, setMeetingTime] = useState<string>("")
  const [meetingLink, setMeetingLink] = useState<string>("")
  const [notes, setNotes] = useState<string>("")

  // Simulate current consultant - in real app this would come from auth context
  const currentConsultant = {
    id: "doc1",
    name: "Dr. Emily White",
    type: "doctor",
  }

  // Dummy data for patients and other doctors (excluding current doctor)
  const patients = [
    { id: "1", name: "Alice Johnson" },
    { id: "2", name: "Bob Williams" },
    { id: "3", name: "Charlie Brown" },
  ]

  const otherDoctors = [
    { id: "doc2", name: "Dr. John Smith" },
    { id: "doc3", name: "Dr. Sarah Lee" },
    { id: "doc4", name: "Dr. Michael Chen" },
    // Note: Current doctor (doc1) is excluded from this list
  ]

  const doctorOptions = otherDoctors.map((doc) => ({ label: doc.name, value: doc.id }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send this data to your backend
    console.log({
      patientId,
      primaryDoctorId: currentConsultant.id, // Automatically set to current consultant
      primaryDoctorName: currentConsultant.name,
      participatingDoctorIds,
      meetingDate,
      meetingTime,
      meetingLink,
      notes,
    })
    toast({
      title: "Tumor Board Created!",
      description: "The new tumor board meeting has been successfully scheduled.",
    })
    // Reset form or close dialog
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 py-4">
      <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
        <Label htmlFor="patient" className="md:text-right">
          Patient
        </Label>
        <Select onValueChange={setPatientId} value={patientId}>
          <SelectTrigger className="md:col-span-3">
            <SelectValue placeholder="Select a patient" />
          </SelectTrigger>
          <SelectContent>
            {patients.map((patient) => (
              <SelectItem key={patient.id} value={patient.id}>
                {patient.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
        <Label className="md:text-right text-sm text-muted-foreground">Primary Doctor</Label>
        <div className="md:col-span-3 text-sm text-muted-foreground">{currentConsultant.name} (You)</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
        <Label htmlFor="participatingDoctors" className="md:text-right">
          Participating Doctors
        </Label>
        <div className="md:col-span-3">
          <MultiSelect
            options={doctorOptions}
            value={participatingDoctorIds}
            onValueChange={setParticipatingDoctorIds}
            placeholder="Select other doctors to participate"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
        <Label htmlFor="meetingDate" className="md:text-right">
          Meeting Date
        </Label>
        <Input
          id="meetingDate"
          type="date"
          value={meetingDate}
          onChange={(e) => setMeetingDate(e.target.value)}
          className="md:col-span-3"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
        <Label htmlFor="meetingTime" className="md:text-right">
          Meeting Time
        </Label>
        <Input
          id="meetingTime"
          type="time"
          value={meetingTime}
          onChange={(e) => setMeetingTime(e.target.value)}
          className="md:col-span-3"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
        <Label htmlFor="meetingLink" className="md:text-right">
          Meeting Link (Optional)
        </Label>
        <Input
          id="meetingLink"
          placeholder="e.g., Google Meet link"
          value={meetingLink}
          onChange={(e) => setMeetingLink(e.target.value)}
          className="md:col-span-3"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
        <Label htmlFor="notes" className="md:text-right">
          Notes
        </Label>
        <Textarea
          id="notes"
          placeholder="Any specific notes for the tumor board"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="md:col-span-3"
        />
      </div>

      <Button type="submit" className="col-span-full mt-6">
        Create Tumor Board
      </Button>
    </form>
  )
}
