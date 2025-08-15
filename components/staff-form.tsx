"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"

interface Staff {
  id: string
  name: string
  email: string
  phone: string
  role: string
  assignedConsultant: string
  status: string
}

interface StaffFormProps {
  staff?: Staff | null
  onClose?: () => void
}

export function StaffForm({ staff, onClose }: StaffFormProps) {
  const [fullName, setFullName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [phone, setPhone] = useState<string>("")

  // Simulate current consultant - in real app this would come from auth context
  const currentConsultant = {
    id: "cons1",
    name: "Dr. Emily White",
    type: "doctor" as "doctor" | "lab" | "nutritionist",
  }

  useEffect(() => {
    if (staff) {
      setFullName(staff.name)
      setEmail(staff.email)
      setPhone(staff.phone)
    }
  }, [staff])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send this data to your backend
    console.log({
      id: staff?.id,
      fullName,
      email,
      phone,
      consultantId: currentConsultant.id, // Automatically assign to current consultant
      consultantName: currentConsultant.name,
    })
    toast({
      title: staff ? "Staff Member Updated!" : "Staff Member Added!",
      description: `${fullName} has been successfully ${staff ? "updated" : "added to your clinical staff"}.`,
    })
    onClose?.()
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 py-4">
      <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
        <Label htmlFor="fullName" className="md:text-right">
          Full Name
        </Label>
        <Input
          id="fullName"
          placeholder="John Doe"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="md:col-span-3"
          required
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
        <Label htmlFor="email" className="md:text-right">
          Email
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="john.doe@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="md:col-span-3"
          required
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
        <Label htmlFor="phone" className="md:text-right">
          Phone
        </Label>
        <Input
          id="phone"
          type="tel"
          placeholder="555-123-4567"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="md:col-span-3"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
        <Label className="md:text-right text-sm text-muted-foreground">Assigned To</Label>
        <div className="md:col-span-3 text-sm text-muted-foreground">{currentConsultant.name} (You)</div>
      </div>

      <Button type="submit" className="col-span-full mt-6">
        {staff ? "Update Staff Member" : "Add Staff Member"}
      </Button>
    </form>
  )
}
