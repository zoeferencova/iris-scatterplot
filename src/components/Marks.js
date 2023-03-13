export const Marks = ({ data, xScale, xValue, yScale, yValue, colorScale, colorValue, circleRadius }) => (
  data.map((d) => (
    <circle
      className="mark"
      cx={xScale(xValue(d))}
      cy={yScale(yValue(d))}
      r={circleRadius}
      fill={colorScale(colorValue(d))}
    >
      <title>{xValue(d)}, {yValue(d)}</title>
    </circle>
  ))
)