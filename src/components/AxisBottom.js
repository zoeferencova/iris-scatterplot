export const AxisBottom = ({ xScale, innerHeight, tickOffset = 3 }) => (
  xScale.ticks().map((tickValue) => (
    <g className="tick" key={tickValue} transform={`translate(${xScale(tickValue)}, 0)`}>
      <line y2={innerHeight} />
      <text style={{ textAnchor: "middle" }} dy="0.71em" y={innerHeight + tickOffset}>
        {tickValue}
      </text>
    </g>
  ))
)