export const AxisLeft = ({ yScale, innerWidth, tickOffset = 3 }) => (
  yScale.ticks().map((tickValue) => (
    <g className="tick" key={tickValue} transform={`translate(0, ${yScale(tickValue)})`}>
      <line x2={innerWidth} />
      <text
        style={{ textAnchor: "end" }}
        dy="0.32em"
        x={-tickOffset}
      >
        {tickValue}
      </text>
    </g>
  ))
)