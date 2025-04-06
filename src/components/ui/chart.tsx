import * as React from "react"
import { Line, Bar, Area, Pie, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, BarChart, AreaChart, PieChart, Cell } from "recharts"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export type ChartProps = React.ComponentPropsWithoutRef<typeof ResponsiveContainer>

export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode
    icon?: React.ComponentType
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme?: string }
  )
}

// Define a custom payload type instead of importing it
type CustomPayload = {
  name: string | number
  value: string | number
  dataKey: string
}

// Extending the recharts Payload type with our requirements
type CustomPayload = {
  name: string | number
  value: string | number
  dataKey: string
}

function getLineChartStyle(config: ChartConfig, key: string) {
  if (config[key]?.theme === "solid") {
    return {
      stroke: "hsl(var(--chart-foreground))",
      strokeWidth: 2,
      fill: "hsl(var(--chart-foreground))",
      fillOpacity: 0.1,
    }
  }
  if (config[key]?.theme === "dotted") {
    return {
      stroke: "hsl(var(--chart-foreground))",
      strokeWidth: 2,
      strokeDasharray: "5 5",
    }
  }
  return {
    stroke: config[key]?.color || "hsl(var(--chart-foreground))",
    strokeWidth: 2,
  }
}

// The Charts
interface ChartsProps {
  className?: string
  children: React.ReactElement
}

// Note: we explicitly use ReactElement here since we need to clone and modify
// the element with props
function renderLabel(config: ChartConfig, key: string): React.ReactElement | null {
  if (!config[key]?.label) {
    return null
  }
  
  const label = config[key]?.label
  
  if (React.isValidElement(label)) {
    return label
  }
  
  // Convert string or number to ReactElement
  return <span>{label}</span>
}

export function Charts({ className, children }: ChartsProps) {
  return (
    <div className={cn("w-full h-full", className)}>
      <ResponsiveContainer width="100%" height="100%">
        {children}
      </ResponsiveContainer>
    </div>
  )
}

interface CustomTooltipProps {
  active?: boolean
  payload?: Array<any> // Use a more flexible type here
  label?: string | number
  config: ChartConfig
  className?: string
}

export function CustomTooltip({
  active,
  payload,
  label,
  config,
  className,
}: CustomTooltipProps) {
  if (active && payload?.length) {
    return (
      <div
        className={cn(
          "rounded-lg border bg-background p-2 shadow-sm",
          className
        )}
      >
        <div className="grid gap-2">
          <div className="grid grid-flow-col items-center justify-between gap-4">
            <div className="font-semibold">{label}</div>
          </div>
          <div className="grid gap-1">
            {payload.map((item) => {
              const Icon = config[item.dataKey]?.icon as LucideIcon
              return (
                <div
                  className="grid grid-flow-col items-center justify-between gap-2"
                  key={item.dataKey}
                >
                  <div className="grid grid-flow-col items-center gap-2">
                    {Icon && (
                      <Icon
                        className="h-3 w-3"
                        style={{
                          color:
                            config[item.dataKey]?.color ||
                            "hsl(var(--chart-foreground))",
                        }}
                      />
                    )}
                    <div
                      className="text-xs capitalize"
                      style={{
                        color:
                          config[item.dataKey]?.color ||
                          "hsl(var(--chart-foreground))",
                      }}
                    >
                      {renderLabel(config, item.dataKey) || item.dataKey}
                    </div>
                  </div>
                  <div
                    className="text-xs font-medium"
                    style={{
                      color:
                        config[item.dataKey]?.color ||
                        "hsl(var(--chart-foreground))",
                    }}
                  >
                    {item.value}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  return null
}

// LineChart
interface LineChartComponentProps {
  data: Array<Record<string, string | number>>
  config: ChartConfig
}

export function LineChartComponent({ data, config }: LineChartComponentProps) {
  return (
    <Charts>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="name" tickLine={false} axisLine={false} />
        <YAxis width={40} tickLine={false} axisLine={false} />
        <Tooltip
          content={({ active, payload, label }) => (
            <CustomTooltip
              active={active}
              payload={payload}
              label={label}
              config={config}
            />
          )}
        />
        {Object.keys(config).map((key) => {
          return (
            <Line
              key={key}
              type="monotone"
              dataKey={key}
              {...getLineChartStyle(config, key)}
            />
          )
        })}
      </LineChart>
    </Charts>
  )
}

// BarChart
interface BarChartComponentProps {
  data: Array<Record<string, string | number>>
  config: ChartConfig
  className?: string
  horizontal?: boolean
  stack?: boolean
}

export function BarChartComponent({
  data,
  config,
  className,
  horizontal,
  stack,
}: BarChartComponentProps) {
  return (
    <Charts className={className}>
      {horizontal ? (
        <BarChart data={data} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" horizontal={false} />
          <XAxis type="number" tickLine={false} axisLine={false} />
          <YAxis
            dataKey="name"
            type="category"
            width={40}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            content={({ active, payload, label }) => (
              <CustomTooltip
                active={active}
                payload={payload}
                label={label}
                config={config}
              />
            )}
          />
          <Legend
            content={({ payload }) => {
              if (!payload?.length) return null
              
              return (
                <div className="grid w-full grid-flow-col justify-end gap-4">
                  {payload.map((item, index) => {
                    const Icon = config[(item.dataKey as string)]
                      ?.icon as LucideIcon
                    return (
                      <div
                        className="grid grid-flow-col items-center gap-2"
                        key={index}
                      >
                        {Icon && (
                          <Icon
                            className="h-3 w-3"
                            style={{
                              color:
                                config[(item.dataKey as string)]?.color ||
                                "hsl(var(--chart-foreground))",
                            }}
                          />
                        )}
                        <div
                          className="text-xs capitalize text-muted-foreground"
                          style={{
                            color:
                              config[(item.dataKey as string)]?.color ||
                              "hsl(var(--chart-foreground))",
                          }}
                        >
                          {config[(item.dataKey as string)]?.label ||
                            (item.dataKey as string)}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )
            }}
          />
          {Object.keys(config).map((key) => {
            return (
              <Bar
                key={key}
                dataKey={key}
                fill={
                  config[key]?.color || "hsl(var(--chart-foreground))"
                }
                {...(stack && {
                  stackId: "stack",
                })}
              />
            )
          })}
        </BarChart>
      ) : (
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" tickLine={false} axisLine={false} />
          <YAxis width={40} tickLine={false} axisLine={false} />
          <Tooltip
            content={({ active, payload, label }) => (
              <CustomTooltip
                active={active}
                payload={payload}
                label={label}
                config={config}
              />
            )}
          />
          <Legend
            content={({ payload }) => {
              if (!payload?.length) return null
              
              return (
                <div className="grid w-full grid-flow-col justify-end gap-4">
                  {payload.map((item, index) => {
                    const Icon = config[(item.dataKey as string)]
                      ?.icon as LucideIcon
                    return (
                      <div
                        className="grid grid-flow-col items-center gap-2"
                        key={index}
                      >
                        {Icon && (
                          <Icon
                            className="h-3 w-3"
                            style={{
                              color:
                                config[(item.dataKey as string)]?.color ||
                                "hsl(var(--chart-foreground))",
                            }}
                          />
                        )}
                        <div
                          className="text-xs capitalize text-muted-foreground"
                          style={{
                            color:
                              config[(item.dataKey as string)]?.color ||
                              "hsl(var(--chart-foreground))",
                          }}
                        >
                          {config[(item.dataKey as string)]?.label ||
                            (item.dataKey as string)}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )
            }}
          />
          {Object.keys(config).map((key) => {
            return (
              <Bar
                key={key}
                dataKey={key}
                fill={
                  config[key]?.color || "hsl(var(--chart-foreground))"
                }
                {...(stack && {
                  stackId: "stack",
                })}
              />
            )
          })}
        </BarChart>
      )}
    </Charts>
  )
}

// AreaChart
interface AreaChartComponentProps {
  data: Array<Record<string, string | number>>
  config: ChartConfig
  className?: string
}

export function AreaChartComponent({
  data,
  config,
  className,
}: AreaChartComponentProps) {
  return (
    <Charts className={className}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="name" tickLine={false} axisLine={false} />
        <YAxis width={40} tickLine={false} axisLine={false} />
        <Tooltip
          content={({ active, payload, label }) => (
            <CustomTooltip
              active={active}
              payload={payload}
              label={label}
              config={config}
            />
          )}
        />
        {Object.keys(config).map((key) => {
          return (
            <Area
              key={key}
              type="monotone"
              dataKey={key}
              strokeWidth={2}
              stroke={
                config[key]?.color || "hsl(var(--chart-foreground))"
              }
              fill={config[key]?.color || "hsl(var(--chart-foreground))"}
              fillOpacity={0.1}
            />
          )
        })}
      </AreaChart>
    </Charts>
  )
}

// PieChart
interface PieChartComponentProps {
  data: Array<Record<string, string | number>>
  config: ChartConfig
  className?: string
}

export function PieChartComponent({
  data,
  config,
  className,
}: PieChartComponentProps) {
  const COLORS = Object.keys(config).map(
    (key) => config[key]?.color || "hsl(var(--chart-foreground))"
  )
  return (
    <Charts className={className}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          dataKey="value"
          stroke={COLORS[0]}
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          content={({ active, payload, label }) => (
            <CustomTooltip
              active={active}
              payload={payload}
              label={label}
              config={config}
            />
          )}
        />
      </PieChart>
    </Charts>
  )
}

// Export additional components needed by chart-variants.tsx
export const ChartContainer: React.FC<React.PropsWithChildren<{ className?: string }>> = Charts;
export const ChartTooltip = Tooltip;
export const ChartTooltipContent = CustomTooltip;
export const ChartLegend = Legend;
export const ChartLegendContent = ({ payload }: { payload?: any[] }) => {
  if (!payload?.length) return null;
  
  return (
    <div className="grid w-full grid-flow-col justify-end gap-4">
      {payload.map((item, index) => (
        <div className="grid grid-flow-col items-center gap-2" key={index}>
          <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }}></div>
          <div className="text-xs capitalize text-muted-foreground">
            {item.value}
          </div>
        </div>
      ))}
    </div>
  );
};
