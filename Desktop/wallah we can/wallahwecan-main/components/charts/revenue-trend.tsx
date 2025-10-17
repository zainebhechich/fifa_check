"use client"

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid } from "recharts"

export default function RevenueTrend({ data }: { data: { date: string; value: number }[] }) {
  const chartData = (data || []).map((d) => ({ date: d.date.slice(5), revenue: d.value }))

  // Brand palette (bright, high-contrast on dark glass)
const stroke = "#66D1FF" // bright cyan for maximum contrast
  const fill = "#66D1FF"

  return (
    <ChartContainer config={{ revenue: { label: "Revenue", color: stroke } }} className="h-48 w-full">
      <AreaChart data={chartData}>
        <CartesianGrid stroke="rgba(255,255,255,0.2)" strokeDasharray="3 3" />
        <XAxis dataKey="date" hide={false} tickLine={false} axisLine={false} tick={{ fill: "rgba(255,255,255,0.8)", fontSize: 12 }} />
        <YAxis hide tickLine={false} axisLine={false} />
        <ChartTooltip content={<ChartTooltipContent labelKey="revenue" />} />
        <Area type="monotone" dataKey="revenue" stroke={stroke} fill={fill} fillOpacity={0.3} isAnimationActive animationDuration={800} />
      </AreaChart>
    </ChartContainer>
  )
}
