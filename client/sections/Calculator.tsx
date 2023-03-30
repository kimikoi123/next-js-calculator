'use client'

import CalcHistory from "@/components/CalcHistory"
import CalcMainScreen from "@/components/CalcMainScreen"
import { useCalculatorContext } from "@/contexts/CalculatorContext"


export default function Calculator() {
  return (
    <div className="bg-[#292A2D] w-[390px] h-[800px] rounded-[25px]">
      <CalcMainScreen  />
      <CalcHistory />
    </div>
  )
}
