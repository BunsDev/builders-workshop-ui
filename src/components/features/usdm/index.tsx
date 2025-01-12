'use client'

import { useState } from "react"
import { Header } from "../../shared/Header"
import { PositionCard } from "./PositionCard"
import { ActionsCard } from "./ActionsCard"
import { StatsActions } from "./StatsActions"
import { StatsDisplay } from "./StatsDisplay"
import { UsdmStakingCard } from "./UsdmStakingCard"

export function Usdm() {
  const [isStaking, setIsStaking] = useState(false)
  
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <div className="min-h-screen bg-[#0b0b0e] text-white p-6">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2" />
            <h1 className="text-2xl font-semibold text-white">USDm Dashboard</h1>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-6">
              <StatsDisplay />
              <PositionCard />
              <UsdmStakingCard />
            </div>

            <div className="space-y-6">
              <StatsActions />
              <ActionsCard isStaking={isStaking} setIsStaking={setIsStaking} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}