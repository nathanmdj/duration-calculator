"use client"

import { useEffect, useState } from "react"
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function DurationCalculator() {
  const [durations, setDurations] = useState<string[]>([""])
  const [total, setTotal] = useState("0:00:00")
  const [hours, setHours] = useState("0")
  const [minutes, setMinutes] = useState("0")
  const [equivalent, setEquivalent] = useState("0")
  const [totalUnits, setTotalUnits] = useState("0")

  const addNewRow = () => {
    setDurations([...durations, ""])
  }

  const removeRow = (index: number) => {
    const newDurations = durations.filter((_, i) => i !== index)
    setDurations(newDurations.length ? newDurations : [""])
  }

  const resetCalculator = () => {
    setDurations([""])
    setTotal("0:00:00")
    setHours("0")
    setMinutes("0")
    setEquivalent("0")
    setTotalUnits("0")
  }

  const handleKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addNewRow()
      setTimeout(() => {
        const inputs = document.querySelectorAll("input")
        if (inputs[index + 1]) {
          inputs[index + 1].focus()
        }
      }, 0)
    }
  }

  // Calculate total duration
  useEffect(() => {
    const calculateTotal = () => {
      let totalMinutes = 0
      durations.forEach((duration) => {
        if (duration) {
          const [hours, minutes, seconds] = duration.split(":").map(Number)
          totalMinutes +=
            (hours || 0) * 60 + (minutes || 0) + (seconds || 0) / 60
        }
      })

      const hours = Math.floor(totalMinutes / 60)
      const minutes = Math.floor(totalMinutes % 60)
      const seconds = Math.round((totalMinutes % 1) * 60)
      setTotal(
        `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
          .toString()
          .padStart(2, "0")}`
      )

      // Update rounding calculator
      setHours(hours.toString())
      setMinutes(minutes.toString())
      setEquivalent((Math.round((minutes / 60) * 4) / 4).toFixed(2))
      setTotalUnits((hours * 4 + Math.round((minutes / 60) * 4)).toString())
    }

    calculateTotal()
  }, [durations])

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-4">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        <Card className="flex-1 border border-gray-200 bg-white text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100">
          <CardHeader className="flex flex-row items-center justify-between bg-gray-200 py-2 dark:bg-gray-700">
            <CardTitle className="text-lg font-normal">
              DURATION CALCULATOR
            </CardTitle>
            <Button
              onClick={resetCalculator}
              variant="ghost"
              className="h-8 text-gray-800 hover:bg-gray-300 dark:text-gray-100 dark:hover:bg-gray-600"
            >
              Reset
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableBody>
                {durations.map((duration, index) => (
                  <TableRow key={index}>
                    <TableCell className="w-1/2 font-medium">
                      Duration {index + 1}
                    </TableCell>
                    <TableCell className="flex items-center justify-end gap-2">
                      <Input
                        value={duration}
                        onChange={(e) => {
                          const newDurations = [...durations]
                          newDurations[index] = e.target.value
                          setDurations(newDurations)
                        }}
                        onKeyDown={(e) => handleKeyPress(e, index)}
                        className="border-none bg-transparent text-right focus:ring-1 focus:ring-gray-300 dark:focus:ring-gray-300"
                        placeholder="0:00:00"
                      />
                      {durations.length > 1 && (
                        <Button
                          onClick={() => removeRow(index)}
                          variant="ghost"
                          className="h-8 px-2 text-gray-800 hover:bg-gray-300 dark:text-gray-100 dark:hover:bg-gray-600"
                        >
                          ×
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={2}>
                    <Button
                      onClick={addNewRow}
                      variant="ghost"
                      className="w-full text-gray-800 hover:bg-gray-300 dark:text-gray-100 dark:hover:bg-transparent"
                    >
                      <Plus className="mr-2 size-4" /> Add Duration
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow className="border-t-2">
                  <TableCell className="font-medium">Total</TableCell>
                  <TableCell className="text-right">{total}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="w-[400px] shrink-0 border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
          <CardHeader className="bg-gray-200 py-2 dark:bg-gray-700">
            <CardTitle className="text-lg font-normal text-gray-800 dark:text-gray-100">
              RESULT
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableBody>
                <TableRow className="bg-gray-200 dark:bg-gray-700">
                  <TableCell className="font-medium text-gray-800 dark:text-gray-100">
                    HOURS:
                  </TableCell>
                  <TableCell className="text-right text-gray-800 dark:text-gray-100">
                    {hours}
                  </TableCell>
                </TableRow>
                <TableRow className="bg-gray-100 dark:bg-gray-600">
                  <TableCell
                    className="font-medium text-gray-800 dark:text-gray-100"
                    colSpan={1}
                  >
                    MINUTES
                  </TableCell>
                  <TableCell
                    className="text-center font-medium text-gray-800 dark:text-gray-100"
                    colSpan={1}
                  >
                    EQUIVALENT IN HRS
                    <br />
                    (PER QUARTER)
                  </TableCell>
                </TableRow>
                <TableRow className="bg-gray-100 dark:bg-gray-600">
                  <TableCell className="text-center text-gray-800 dark:text-gray-100">
                    {minutes}
                  </TableCell>
                  <TableCell className="text-center text-gray-800 dark:text-gray-100">
                    {equivalent}
                  </TableCell>
                </TableRow>
                <TableRow className="bg-gray-200 dark:bg-gray-700">
                  <TableCell
                    className="font-medium text-gray-800 dark:text-gray-100"
                    colSpan={1}
                  >
                    TOTAL UNITS:
                    <br />
                    (PER QUARTER)
                  </TableCell>
                  <TableCell className="text-center text-gray-800 dark:text-gray-100">
                    {totalUnits}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
