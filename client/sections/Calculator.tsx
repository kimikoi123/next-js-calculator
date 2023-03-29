'use client'

import CalcHistory from "@/components/CalcHistory"
import CalcMainScreen from "@/components/CalcMainScreen"
import { useState } from "react"

export default function Calculator() {
  const [showHistory, setShowHistory] = useState(false)
  return (
    <div className="bg-[#292A2D] w-[390px] h-[800px] rounded-[25px]">
      <CalcMainScreen showHistory={showHistory} setShowHistory={setShowHistory} />
      <CalcHistory showHistory={showHistory} setShowHistory={setShowHistory}/>
    </div>
  )
}
