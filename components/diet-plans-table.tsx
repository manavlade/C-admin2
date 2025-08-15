import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"

interface DietPlan {
  id: string
  patientName: string
  consultantName: string
  dateCreated: string
  planDetails: string
}

interface DietPlansTableProps {
  dietPlans: DietPlan[]
}

export function DietPlansTable({ dietPlans }: DietPlansTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Patient</TableHead>
          <TableHead>Nutritionist</TableHead>
          <TableHead>Date Created</TableHead>
          <TableHead>Plan Details</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {dietPlans.map((plan) => (
          <TableRow key={plan.id}>
            <TableCell className="font-medium">{plan.patientName}</TableCell>
            <TableCell>{plan.consultantName}</TableCell>
            <TableCell>{plan.dateCreated}</TableCell>
            <TableCell>{plan.planDetails}</TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button aria-haspopup="true" size="icon" variant="ghost">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem>View Diet Plan</DropdownMenuItem>
                  <DropdownMenuItem>Edit Diet Plan</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Delete Diet Plan</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
