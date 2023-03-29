'use client'

import {useState, useEffect} from "react"
import HistoryCard from "./HistoryCard"



export default function HistoryContent() {
  const [historyData, setHistoryData] = useState([])

  useEffect(() => {

  }, [])

  return (
    <div className="grid gap-0.5 mt-4 h-[700px] overflow-x-hidden">
    </div>
  )
}
