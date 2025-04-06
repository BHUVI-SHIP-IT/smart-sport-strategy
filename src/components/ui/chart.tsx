
import * as React from "react"
import { 
  Area, 
  AreaChart, 
  Bar, 
  BarChart, 
  CartesianGrid, 
  Legend, 
  Line, 
  LineChart, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis 
} from "recharts"

// Define a custom payload type
type CustomPayload = {
  name: string | number
  value: string | number
  dataKey: string
}

export interface ChartConfig {
  [key: string]: {
    label: string
    color: string
  }
}

interface ChartTooltipProps {
  active?: boolean
  payload?: Array<any>
  label?: string
  config: ChartConfig
}

interface ChartLegendProps {
  payload?: Array<any>
  config: ChartConfig
}

interface ChartsProps {
  children: React.ReactNode
  yAxisWidth?: number
}

export const ChartContainer = ({
  children,
  yAxisWidth = 40,
  ...props
}: ChartsProps) => {
  return (
    <div {...props} className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">{children}</ResponsiveContainer>
    </div>
  )
}

export const ChartTooltip = ({
  content,
  ...props
}: {
  content: React.FC<ChartTooltipProps>
}) => {
  return <Tooltip content={content} {...props} />
}

export const ChartTooltipContent = ({
  active,
  payload,
  label,
  config,
}: ChartTooltipProps) => {
  if (!active || !payload?.length) {
    return null
  }

  return (
    <div className="rounded-lg border bg-background p-2 shadow-sm">
      <div className="grid gap-2">
        <div className="text-xs font-medium">{label}</div>
        <div className="grid gap-1">
          {payload.map((item: CustomPayload, index: number) => {
            const color = config[item.dataKey]?.color
            const label = config[item.dataKey]?.label

            return (
              <div key={index} className="flex items-center gap-2">
                <div
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: color }}
                />
                <span className="text-xs text-muted-foreground">{label}</span>
                <span className="ml-auto text-xs font-medium">
                  {item.value}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export const ChartLegend = ({
  content,
  ...props
}: {
  content: React.FC<ChartLegendProps>
}) => {
  return <Legend content={content} {...props} />
}

export const ChartLegendContent = ({
  payload,
  config,
}: ChartLegendProps) => {
  if (!payload?.length) {
    return null
  }

  return (
    <div className="flex flex-wrap gap-4">
      {payload.map((item: any, index: number) => {
        const color = config[item.dataKey]?.color
        const label = config[item.dataKey]?.label

        return (
          <div key={index} className="flex items-center gap-2">
            <div
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: color }}
            />
            <span className="text-xs text-muted-foreground">{label}</span>
          </div>
        )
      })}
    </div>
  )
}
