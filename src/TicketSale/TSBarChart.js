import { scaleLinear, extent, range, scaleBand } from "d3";
import { AxisLeft, AxisBottom } from "@visx/axis";
import ticketSaleRawData from "../data/AnnualTicketSales.json";

const TSBarChart = () => {
    const ticketSale = ticketSaleRawData.reverse()
    const chartWidth = 1200;
    const chartHeight = 750
    const marginVer = 60
    const marginHoz = 80
    const legendPadding = 100;


    const convMonInt = str => Number(str.replace(/[^0-9.-]+/g, ""))
    const InfPriceByYears = ticketSale.map((data, i) => convMonInt(data["TOTAL INFLATION ADJUSTED BOX OFFICE"]))
    const PriceByYears = ticketSale.map((data, i) => convMonInt(data["TOTAL BOX OFFICE"]))

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

    return (
        <div style={{ marginLeft: marginHoz, marginRight: marginHoz }}>
            <h1>Total Box Office with inflation adjusted</h1>
            <p>
                Y axis describes box office in US dollar currency. X axis describes year time line. Orange: Total Box Office / Blue: Total Box Office inflation adjusted.
            </p>
            <svg
                width={chartWidth + legendPadding}
                height={chartHeight}
            >
                <AxisLeft strokeWidth={1} left={marginHoz} scale={_scaleY} />
                <AxisBottom
                    strokeWidth={1}
                    top={chartHeight - marginVer}
                    scale={_scaleX}
                    tickValues={tickValues}
                />
                <text x={chartWidth - marginHoz - 70} y={marginVer} fontSize={10} fill="blue">
                    TOTAL INFLATION ADJUSTED BOX OFFICE
                </text>

                <text x={chartWidth - marginHoz - 70} y={marginVer + 15} fontSize={10} fill="orange">
                    TOTAL BOX OFFICE
                </text>
                {
                    ticketSale.map((data, i) => {
                        let barHeight = chartHeight - _scaleY(InfPriceByYears[i]) - marginVer
                        let barHeight2 = chartHeight - _scaleY(PriceByYears[i]) - marginVer
                        let barWidth = _scaleX.bandwidth() - 12
                        let barX = _scaleX(Number(data["YEAR"])) + 6
                        return (
                            <>
                                <rect
                                    y={chartHeight - barHeight - marginVer}
                                    x={barX}
                                    width={barWidth}
                                    height={barHeight}
                                    fill="blue"
                                />

                                <rect
                                    y={chartHeight - barHeight2 - marginVer}
                                    x={barX}
                                    width={barWidth}
                                    height={barHeight2}
                                    fill="orange"
                                />
                            </>
                        )
                    })
                }



            </svg>
        </div>
    );
}

export default TSBarChart


