import React from 'react'
import { useState } from "react"
import { Chart, registerables } from "chart.js"
import { Pie } from "react-chartjs-2"

Chart.register(...registerables)

const AdminChart = ({categories}) => {

  const [currChart, setCurrChart] = useState("courses")

  // Function to generate random colors for the chart
  const generateRandomColors = (numColors) => {
    const colors = []
    for (let i = 0; i < numColors; i++) {
      const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 
      ${Math.floor(Math.random() * 256)})`
      colors.push(color)
    }
    return colors
  }

  // Data for the chart displaying courses information
  const chartCourseData = {
    labels: categories.map((category) => category.categoryName),
    datasets: [
      {
        data: categories.map((category) => category.totalcourses),
        backgroundColor: generateRandomColors(categories.length),
      },
    ],
  }

  // Data for the chart displaying instructors information
  const chartInstructorData = {
    labels: categories.map((category) => category.categoryName),
    datasets: [
      {
        data: categories.map((category) => category.totalUniqueInstructors?.length),
        backgroundColor: generateRandomColors(categories.length),
      },
    ],
  }

  // Options for the chart
  const options = {
    maintainAspectRatio: false,
  }

  return (
    <div className="flex flex-1 flex-col gap-y-4 rounded-md bg-richblack-800 p-6">
      <p className="text-lg font-bold text-richblack-5">Visualize</p>
      <div className="space-x-4 font-semibold">

        {/* Button to switch to the "students" chart */}
        <button
          onClick={() => setCurrChart("courses")}
          className={`rounded-sm p-1 px-3 transition-all duration-200 ${
            currChart === "courses"
              ? "bg-richblack-700 text-yellow-50"
              : "text-yellow-400"
          }`}
        >
          Courses
        </button>

        {/* Button to switch to the "income" chart */}
        <button
          onClick={() => setCurrChart("instructors")}
          className={`rounded-sm p-1 px-3 transition-all duration-200 ${
            currChart === "instructors"
              ? "bg-richblack-700 text-yellow-50"
              : "text-yellow-400"
          }`}
        >
          Instructors
        </button>

      </div>

      <div className="relative mx-auto aspect-square h-full w-full">
        {/* Render the Pie chart based on the selected chart */}
        <Pie
          data={currChart === "courses" ? chartCourseData : chartInstructorData}
          options={options}
        />
      </div>

    </div>
  )
}

export default AdminChart