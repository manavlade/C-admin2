"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PlusCircle, MinusCircle } from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface MealPlan {
  id: string
  mealType: string
  foods: string
  calories: string
  instructions: string
}

export function DietPlanForm() {
  const [mealPlans, setMealPlans] = useState<MealPlan[]>([
    { id: "1", mealType: "breakfast", foods: "", calories: "", instructions: "" },
  ])
  const [patientId, setPatientId] = useState<string>("")
  const [nutritionistId, setNutritionistId] = useState<string>("")
  const [planDate, setPlanDate] = useState<string>(new Date().toISOString().split("T")[0])
  const [planDuration, setPlanDuration] = useState<string>("7") // days
  const [totalCalories, setTotalCalories] = useState<string>("")
  const [specialInstructions, setSpecialInstructions] = useState<string>("")

  // Dummy data for patients and nutritionists
  const patients = [
    { id: "1", name: "Alice Johnson" },
    { id: "2", name: "Bob Williams" },
    { id: "3", name: "Charlie Brown" },
  ]

  const nutritionists = [
    { id: "nut1", name: "Sarah Nutrition" },
    { id: "nut2", name: "Mike Wellness" },
    { id: "nut3", name: "Lisa Healthy" },
  ]

  const mealTypes = [
    { value: "breakfast", label: "Breakfast" },
    { value: "lunch", label: "Lunch" },
    { value: "dinner", label: "Dinner" },
    { value: "snack", label: "Snack" },
  ]

  const handleAddMeal = () => {
    setMealPlans([
      ...mealPlans,
      {
        id: String(mealPlans.length + 1),
        mealType: "breakfast",
        foods: "",
        calories: "",
        instructions: "",
      },
    ])
  }

  const handleRemoveMeal = (id: string) => {
    setMealPlans(mealPlans.filter((meal) => meal.id !== id))
  }

  const handleMealChange = (id: string, field: keyof MealPlan, value: string) => {
    setMealPlans(mealPlans.map((meal) => (meal.id === id ? { ...meal, [field]: value } : meal)))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send this data to your backend
    console.log({
      patientId,
      nutritionistId,
      planDate,
      planDuration,
      totalCalories,
      specialInstructions,
      mealPlans,
    })
    toast({
      title: "Diet Plan Created!",
      description: "The new diet plan has been successfully created.",
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
        <Label htmlFor="nutritionist" className="md:text-right">
          Nutritionist
        </Label>
        <Select onValueChange={setNutritionistId} value={nutritionistId}>
          <SelectTrigger className="md:col-span-3">
            <SelectValue placeholder="Select a nutritionist" />
          </SelectTrigger>
          <SelectContent>
            {nutritionists.map((nutritionist) => (
              <SelectItem key={nutritionist.id} value={nutritionist.id}>
                {nutritionist.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
        <Label htmlFor="planDate" className="md:text-right">
          Plan Start Date
        </Label>
        <Input
          id="planDate"
          type="date"
          value={planDate}
          onChange={(e) => setPlanDate(e.target.value)}
          className="md:col-span-3"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
        <Label htmlFor="planDuration" className="md:text-right">
          Duration (days)
        </Label>
        <Input
          id="planDuration"
          type="number"
          placeholder="7"
          value={planDuration}
          onChange={(e) => setPlanDuration(e.target.value)}
          className="md:col-span-3"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
        <Label htmlFor="totalCalories" className="md:text-right">
          Target Daily Calories
        </Label>
        <Input
          id="totalCalories"
          placeholder="e.g., 2000"
          value={totalCalories}
          onChange={(e) => setTotalCalories(e.target.value)}
          className="md:col-span-3"
        />
      </div>

      <h3 className="text-lg font-semibold mt-4 col-span-4">Meal Plans</h3>
      {mealPlans.map((meal, index) => (
        <div
          key={meal.id}
          className="grid grid-cols-1 md:grid-cols-4 items-center gap-4 border-t pt-4 first:border-t-0 first:pt-0"
        >
          <Label htmlFor={`meal-type-${meal.id}`} className="md:text-right">
            Meal {index + 1} Type
          </Label>
          <Select onValueChange={(value) => handleMealChange(meal.id, "mealType", value)} value={meal.mealType}>
            <SelectTrigger className="md:col-span-3">
              <SelectValue placeholder="Select meal type" />
            </SelectTrigger>
            <SelectContent>
              {mealTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Label htmlFor={`foods-${meal.id}`} className="md:text-right">
            Foods
          </Label>
          <Textarea
            id={`foods-${meal.id}`}
            placeholder="e.g., 1 cup oatmeal, 1 banana, 1 tbsp honey"
            value={meal.foods}
            onChange={(e) => handleMealChange(meal.id, "foods", e.target.value)}
            className="md:col-span-3"
          />

          <Label htmlFor={`calories-${meal.id}`} className="md:text-right">
            Calories
          </Label>
          <Input
            id={`calories-${meal.id}`}
            placeholder="e.g., 350"
            value={meal.calories}
            onChange={(e) => handleMealChange(meal.id, "calories", e.target.value)}
            className="md:col-span-3"
          />

          <Label htmlFor={`instructions-${meal.id}`} className="md:text-right">
            Instructions
          </Label>
          <Textarea
            id={`instructions-${meal.id}`}
            placeholder="e.g., Cook oatmeal with water, add sliced banana and honey"
            value={meal.instructions}
            onChange={(e) => handleMealChange(meal.id, "instructions", e.target.value)}
            className="md:col-span-3"
          />

          {mealPlans.length > 1 && (
            <div className="col-start-4 flex justify-end">
              <Button type="button" variant="destructive" size="icon" onClick={() => handleRemoveMeal(meal.id)}>
                <MinusCircle className="h-4 w-4" />
                <span className="sr-only">Remove Meal</span>
              </Button>
            </div>
          )}
        </div>
      ))}
      <div className="col-span-full flex justify-end">
        <Button type="button" variant="outline" onClick={handleAddMeal}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Another Meal
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4 mt-4">
        <Label htmlFor="specialInstructions" className="md:text-right">
          Special Instructions
        </Label>
        <Textarea
          id="specialInstructions"
          placeholder="Any dietary restrictions, allergies, or special notes"
          value={specialInstructions}
          onChange={(e) => setSpecialInstructions(e.target.value)}
          className="md:col-span-3"
        />
      </div>

      <Button type="submit" className="col-span-full mt-6">
        Create Diet Plan
      </Button>
    </form>
  )
}
