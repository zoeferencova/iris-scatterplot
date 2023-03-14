export const ColorLegend = ({
  colorScale,
  tickSpacing = 23,
  tickSize = 7,
  tickTextOffset = 15,
  onHover,
  hoveredValue,
  fadeOpacity
}) => (
  colorScale.domain().map((domainValue, i) => (
    <g
      key={domainValue}
      transform={`translate(0, ${i * tickSpacing})`}
      className="legend-item"
      onMouseEnter={() => onHover(domainValue)}
      onMouseOut={() => onHover(null)}
      opacity={hoveredValue && domainValue !== hoveredValue ? fadeOpacity : 1}
    >
      <circle fill={colorScale(domainValue)} r={tickSize} />
      <text dy="0.32em" dx={tickTextOffset}>{domainValue}</text>
    </g>
  ))
)
