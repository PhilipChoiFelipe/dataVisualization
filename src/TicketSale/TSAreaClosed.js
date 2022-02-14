import React from 'react';
import { scaleLinear, scaleBand, extent, range, area, symbol, csv } from "d3";
import { AxisLeft, AxisBottom, AxisRight } from "@visx/axis";

import ticketSaleRawData from "../data/AnnualTicketSales.json";

const ticketSale = ticketSaleRawData.reverse()
const chartWidth = 1200;
const chartHeight = 750
const legendPadding = 100;

const marginVer = 60
const marginHoz = 80

const convMonInt = str => Number(str.replace(/[^0-9.-]+/g, ""))
const InfPriceByYears = ticketSale.map((data, i) => convMonInt(data["TOTAL INFLATION ADJUSTED BOX OFFICE"]))
const PriceByYears = ticketSale.map((data, i) => convMonInt(data["TOTAL BOX OFFICE"]))

const TSAreaClosed = () => {
    const _extent = extent(InfPriceByYears)
    const _scaleY = scaleLinear()
        .domain([0, _extent[1]])
        .range([chartHeight - marginVer, marginVer]);

    let tickValues = range(1995, 2022)
    const _scaleLine = scaleLinear()
        .domain([0, tickValues.length - 1])
        .range([marginHoz, chartWidth - marginHoz])

    const _scaleYear = scaleBand()
        .domain(tickValues)
        .range([0, chartWidth - marginHoz - marginHoz])

    const _lineMaker = area()
        .x((d, i) => _scaleLine(i))
        .y1((d) => _scaleY(d))
        .y0(chartHeight - marginVer)

    return (
        <div style={{ marginLeft: marginHoz, marginRight: marginHoz }}>
            <svg width={chartWidth + legendPadding} height={chartHeight} >
                <AxisLeft strokeWidth={2} left={marginHoz} scale={_scaleY} />
                <AxisBottom
                    strokeWidth={2}
                    top={chartHeight - marginVer}
                    left={marginHoz}
                    scale={_scaleYear}
                    tickValues={tickValues}
                />
                <text x={chartWidth - marginHoz - 70} y={marginVer} fontSize={10} fill="blue">
                    TOTAL INFLATION ADJUSTED BOX OFFICE
                </text>

                <text x={chartWidth - marginHoz - 70} y={marginVer + 15} fontSize={10} fill="orange">
                    TOTAL BOX OFFICE
                </text>
                
                <path
                    stroke={"black"}
                    strokeWidth={4}
                    fill={"blue"}
                    d={_lineMaker(InfPriceByYears)}
                />
                <path
                    stroke={"black"}
                    strokeWidth={4}
                    fill={"orange"}
                    d={_lineMaker(PriceByYears)}
                />
                )
            </svg>
        </div>
    );
}

export default TSAreaClosed;