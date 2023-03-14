import React, { useState } from 'react';
import { scaleLinear, extent, scaleOrdinal } from 'd3';
import ReactDropdown from 'react-dropdown';
import { useData } from '../hooks/useData';
import { AxisBottom } from '../components/AxisBottom';
import { AxisLeft } from '../components/AxisLeft';
import { Marks } from '../components/Marks';
import { ColorLegend } from '../components/ColorLegend';

const width = 960;
const menuHeight = 60;
const height = 500 - menuHeight;
const margin = { top: 30, right: 130, bottom: 70, left: 90 };
const xAxisLabelOffset = 50;
const yAxisLabelOffset = 50;
const fadeOpacity = 0.3;

const attributes = [
    { value: 'sepal_length', label: 'Sepal Length' },
    { value: 'sepal_width', label: 'Sepal Width' },
    { value: 'petal_length', label: 'Petal Length' },
    { value: 'petal_width', label: 'Petal Width' },
    { value: 'species', label: 'Species' }
];

const getLabel = value => {
    for (let i = 0; i < attributes.length; i++) {
        if (attributes[i].value === value) {
            return attributes[i].label;
        }
    }
}

export const Chart = () => {
    const data = useData();

    const [hoveredValue, setHoveredValue] = useState(null);

    const initialXAttribute = "petal_length"
    const [xAttribute, setXAttribute] = useState(initialXAttribute);
    const xValue = d => d[xAttribute];
    const xAxisLabel = getLabel(xAttribute);

    const initialYAttribute = "sepal_width"
    const [yAttribute, setYAttribute] = useState(initialYAttribute);
    const yValue = d => d[yAttribute];
    const yAxisLabel = getLabel(yAttribute);

    if (!data) {
        return <pre className="loading" style={{ marginLeft: margin.left, marginTop: "30px" }}>Loading ...</pre>
    }

    const colorValue = d => d.species;
    const colorLegendLabel = "Species";

    const filteredData = data.filter(d => d.species === hoveredValue)

    const circleRadius = 7;

    const innerHeight = height - margin.top - margin.bottom;
    const innerWidth = width - margin.left - margin.right;

    const xScale = scaleLinear()
        .domain(extent(data, xValue))
        .range([0, innerWidth])
        .nice();

    const yScale = scaleLinear()
        .domain(extent(data, yValue))
        .range([innerHeight, 0])
        .nice()

    const colorScale = scaleOrdinal()
        .domain(data.map(colorValue))
        .range(["#E6842A", "#137B80", "#8E6C8A"])

    return (
        <>
            <div style={{ marginLeft: margin.left }} className="dropdown-container">
                <span className="dropdown-label">X</span>
                <ReactDropdown
                    options={attributes.slice(0, -1)}
                    value={xAttribute}
                    onChange={({ value }) => setXAttribute(value)}
                />
            </div>
            <div className="dropdown-container">
                <span className="dropdown-label">Y</span>
                <ReactDropdown
                    options={attributes.slice(0, -1)}
                    value={yAttribute}
                    onChange={({ value }) => setYAttribute(value)}
                />
            </div>
            <svg width={width} height={height}>
                <g transform={`translate(${margin.left}, ${margin.top})`}>
                    <AxisBottom
                        xScale={xScale}
                        innerHeight={innerHeight}
                        tickOffset={10}
                    />
                    <text
                        className="axis-label"
                        textAnchor="middle"
                        transform={`translate(${-yAxisLabelOffset}, ${innerHeight / 2}) rotate(-90)`}
                    >
                        {yAxisLabel}
                    </text>
                    <AxisLeft
                        yScale={yScale}
                        innerWidth={innerWidth}
                        tickOffset={8}
                    />
                    <text
                        className="axis-label"
                        x={innerWidth / 2}
                        y={innerHeight + xAxisLabelOffset}
                        textAnchor="middle"
                    >
                        {xAxisLabel}
                    </text>
                    <g transform={`translate(${innerWidth + 30}, 45)`}>
                        <text
                            className="legend-label"
                            textAnchor="start"
                            y={-23}
                            x={-5}
                        >
                            {colorLegendLabel}
                        </text>
                        <ColorLegend
                            tickSpacing={24}
                            tickTextOffset={12}
                            tickSize={circleRadius}
                            colorScale={colorScale}
                            onHover={hoveredValue => setHoveredValue(hoveredValue)}
                            hoveredValue={hoveredValue}
                            fadeOpacity={fadeOpacity}
                        />
                    </g>
                    <g opacity={hoveredValue ? fadeOpacity : 1}>
                        <Marks
                            xScale={xScale}
                            xValue={xValue}
                            yScale={yScale}
                            yValue={yValue}
                            colorScale={colorScale}
                            colorValue={colorValue}
                            data={data}
                            circleRadius={circleRadius}
                        />
                    </g>
                    <Marks
                        xScale={xScale}
                        xValue={xValue}
                        yScale={yScale}
                        yValue={yValue}
                        colorScale={colorScale}
                        colorValue={colorValue}
                        data={filteredData}
                        circleRadius={circleRadius}
                    />
                </g>
            </svg>
        </>
    );
};
