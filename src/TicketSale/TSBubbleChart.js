import React from 'react';
import { scaleLinear, scaleBand, extent, range, scaleSqrt } from "d3";
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
const ticketCounts = ticketSale.map(data => convMonInt(data["TICKETS SOLD"]))
const _extent = extent(InfPriceByYears)
const _scaleY = scaleLinear()
    .domain([0, _extent[1]])
    .range([chartHeight - marginVer, marginVer]);

//Scale vertical (by states)
let tickValues = range(1995, 2022)
const _scaleX = scaleBand()
    .domain(tickValues)
    .range([marginHoz, chartWidth - marginHoz])
    .paddingInner(0)
const ticketCountExtent = extent(ticketCounts)
const _scaleZ = scaleSqrt().domain(ticketCountExtent).range([8, 20])

const TSBubbleChart = () => {
    return (
        <div style={{ marginLeft: marginHoz, marginRight: marginHoz }}>
            <h1>Total Box Office with inflation adjusted</h1>
            <p>
                Y axis describes box office in US dollar currency (inflation adjusted). X axis describes year time line. Circle Size: number of ticket purchased.
            </p>
            <svg width={chartWidth + legendPadding} height={chartHeight}>
                <AxisLeft strokeWidth={1} left={marginHoz} scale={_scaleY} />
                <AxisBottom
                    strokeWidth={1}
                    top={chartHeight - marginVer}
                    scale={_scaleX}
                    tickValues={tickValues}
                />
                <circle
                    cx={chartWidth}
                    cy={marginVer + 11}
                    r={_scaleZ(ticketCountExtent[0])}
                    fill="white"
                    stroke="black"
                />
                <circle
                    cx={chartWidth}
                    cy={marginVer}
                    r={_scaleZ(ticketCountExtent[1])}
                    fill="None"
                    stroke="black"
                />

                <text
                    x={chartWidth - 10}
                    y={marginVer - 30}
                    fontSize={10}
                >
                    ticket sold count
                </text>
                <text
                    x={chartWidth + 24}
                    y={marginVer + 16}
                    fontSize={10}
                >
                    --200000000
                </text>
                <text
                    x={chartWidth + 24}
                    y={marginVer}
                    fontSize={10}
                >
                    --1500000000
                </text>
                {
                    ticketCounts.map((data, i) => {
                        let circleX = _scaleX(Number(ticketSale[i]["YEAR"])) + 20

                        return <circle
                            cx={circleX}
                            cy={_scaleY(InfPriceByYears[i])}
                            r={_scaleZ(data)}
                            fill="orange"
                            stroke="black"
                        />
                    }

                    )
                }
            </svg>
        </div>
    );
}

export default TSBubbleChart;