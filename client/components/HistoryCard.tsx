import React from "react"

interface HistoryCardProps {
    string: string
}

export default function HistoryCard({ string, }: HistoryCardProps) {
    const [calculation, result] = string.split('=')
  return (
    <div className="bg-[#5B5E67] p-4 first:rounded-t-[15px] last:rounded-b-[15px]">
      <div>{calculation}</div>
      <div>= {result}</div>
    </div>
  )
}
