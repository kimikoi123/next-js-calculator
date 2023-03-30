"use client"

import {
  useContext,
  createContext,
  ReactNode,
  useState,
  useEffect,
} from "react"

interface CalculatorContextProviderProps {
  children: ReactNode
}

interface HistoryProps {
  calculation: string
}

interface CalculatorContextProps {
  showHistory: boolean
  handleShowHistory: () => void
  handleDeleteHistory: () => void
  historyData: HistoryProps[]
  handleSaveHistoryData: (calculation: string) => void
  handleBackToMenu: () => void
}

const CalculatorContext = createContext({} as CalculatorContextProps)

export function useCalculatorContext() {
  return useContext(CalculatorContext)
}

export default function CalculatorContextProvider({
  children,
}: CalculatorContextProviderProps) {
  const [showHistory, setShowHistory] = useState(false)
  const [historyData, setHistoryData] = useState<HistoryProps[]>([])

  useEffect(() => {
    loadHistory()
  }, [])

  async function loadHistory() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/app/histories`)
    const jsonData = await response.json()

    const data = jsonData.map((item: HistoryProps) => ({
      calculation: item.calculation,
    }))
    setHistoryData(data)
  }

  async function createUser(username: string) {
    const user = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/app/user`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username }),
    })
  }

  async function deleteHistory() {
    const save = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/app/histories`, {
      method: "DELETE",
    })
  }

  async function getUser() {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/app/user`)
      const jsonData = await response.json()
      return jsonData
    } catch (err: any) {
      console.error(err.message)
    }
  }

  async function saveHistory(calculation: string) {
    const uuid = "61bb6bb7-bf44-4225-b121-a197c8442682"

    const save = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/app/histories`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ calculation, uuid }),
    })
  }

  function handleShowHistory() {
    setShowHistory(true)
  }

  function handleDeleteHistory() {
    deleteHistory()
    setHistoryData([])
  }

  function handleSaveHistoryData(calculation: string) {
    saveHistory(calculation)
    setHistoryData(() => {
      return [...historyData, { calculation: calculation }]
    })
  }

  function handleBackToMenu() {
    setShowHistory(false)
  }

  const value = {
    showHistory,
    handleShowHistory,
    handleDeleteHistory,
    historyData,
    handleSaveHistoryData,
    handleBackToMenu
  }

  return (
    <CalculatorContext.Provider value={value}>
      {children}
    </CalculatorContext.Provider>
  )
}
