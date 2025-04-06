
import * as React from "react"
import * as RechartsPrimitive from "recharts"
import { 
  ChartContainer as BaseChartContainer, 
  ChartTooltip, 
  ChartTooltipContent, 
  ChartLegend, 
  ChartLegendContent,
  type ChartConfig 
} from "../chart"

// Create a wrapper component that accepts the config prop
const ChartContainer: React.FC<React.PropsWithChildren<{
  config: ChartConfig;
  className?: string;
}>> = ({ children, config, className }) => {
  return (
    <BaseChartContainer className={className}>
      {children}
    </BaseChartContainer>
  );
};

export interface ChartProps {
  data: any[]
  index: string
  categories: string[]
  colors: string[]
  yAxisWidth?: number
  showAnimation?: boolean
  showLegend?: boolean
  valueFormatter?: (value: number) => string
}

export const AreaChart = ({
  data,
  index,
  categories,
  colors,
  showAnimation = true,
  showLegend = true,
  valueFormatter,
  ...props
}: ChartProps) => {
  const chartConfig: ChartConfig = React.useMemo(() => {
    return categories.reduce((acc, category, i) => {
      return {
        ...acc,
        [category]: {
          label: category,
          color: colors[i % colors.length],
        },
      }
    }, {})
  }, [categories, colors])

  return (
    <ChartContainer config={chartConfig} className="w-full h-full" {...props}>
      {React.createElement(
        RechartsPrimitive.AreaChart as any,
        { data },
        <>
          <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" />
          <RechartsPrimitive.XAxis
            dataKey={index}
            tickLine={false}
            axisLine={false}
          />
          <RechartsPrimitive.YAxis
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => valueFormatter ? valueFormatter(value) : value}
          />
          {showLegend && (
            <ChartLegend
              content={(props: any) => <ChartLegendContent {...props} />}
            />
          )}
          <ChartTooltip
            content={(props: any) => <ChartTooltipContent {...props} />}
          />
          {categories.map((category, i) => (
            <RechartsPrimitive.Area
              key={category}
              type="monotone"
              dataKey={category}
              stroke={colors[i % colors.length]}
              fill={colors[i % colors.length]}
              fillOpacity={0.3}
              isAnimationActive={showAnimation}
            />
          ))}
        </>
      )}
    </ChartContainer>
  )
}

export const BarChart = ({
  data,
  index,
  categories,
  colors,
  showAnimation = true,
  showLegend = true,
  valueFormatter,
  ...props
}: ChartProps) => {
  const chartConfig: ChartConfig = React.useMemo(() => {
    return categories.reduce((acc, category, i) => {
      return {
        ...acc,
        [category]: {
          label: category,
          color: colors[i % colors.length],
        },
      }
    }, {})
  }, [categories, colors])

  return (
    <ChartContainer config={chartConfig} className="w-full h-full" {...props}>
      {React.createElement(
        RechartsPrimitive.BarChart as any,
        { data },
        <>
          <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" />
          <RechartsPrimitive.XAxis
            dataKey={index}
            tickLine={false}
            axisLine={false}
          />
          <RechartsPrimitive.YAxis
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => valueFormatter ? valueFormatter(value) : value}
          />
          {showLegend && (
            <ChartLegend
              content={(props: any) => <ChartLegendContent {...props} />}
            />
          )}
          <ChartTooltip
            content={(props: any) => <ChartTooltipContent {...props} />}
          />
          {categories.map((category, i) => (
            <RechartsPrimitive.Bar
              key={category}
              dataKey={category}
              fill={colors[i % colors.length]}
              isAnimationActive={showAnimation}
              radius={[4, 4, 0, 0]}
            />
          ))}
        </>
      )}
    </ChartContainer>
  )
}

export const LineChart = ({
  data,
  index,
  categories,
  colors,
  yAxisWidth = 40,
  showAnimation = true,
  showLegend = true,
  valueFormatter,
  ...props
}: ChartProps) => {
  const chartConfig: ChartConfig = React.useMemo(() => {
    return categories.reduce((acc, category, i) => {
      return {
        ...acc,
        [category]: {
          label: category,
          color: colors[i % colors.length],
        },
      }
    }, {})
  }, [categories, colors])

  return (
    <ChartContainer config={chartConfig} className="w-full h-full" {...props}>
      {React.createElement(
        RechartsPrimitive.LineChart as any,
        { data },
        <>
          <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" />
          <RechartsPrimitive.XAxis
            dataKey={index}
            tickLine={false}
            axisLine={false}
          />
          <RechartsPrimitive.YAxis
            width={yAxisWidth}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => valueFormatter ? valueFormatter(value) : value}
          />
          {showLegend && (
            <ChartLegend
              content={(props: any) => <ChartLegendContent {...props} />}
            />
          )}
          <ChartTooltip
            content={(props: any) => <ChartTooltipContent {...props} />}
          />
          {categories.map((category, i) => (
            <RechartsPrimitive.Line
              key={category}
              type="monotone"
              dataKey={category}
              stroke={colors[i % colors.length]}
              isAnimationActive={showAnimation}
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          ))}
        </>
      )}
    </ChartContainer>
  )
}
