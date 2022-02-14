import { scaleOrdinal, arc, extent, entries, range, scaleBand, schemeSet2, pie } from "d3";
import journalistDeath from "../data/journalistDeath.json";

const chartWidth = 850;
const chartHeight = 850;
const marginVer = 80
const marginHoz = 80
const legendPadding = 100;

const JDPieChart = () => {
    const deathCategory = {}
    journalistDeath.forEach(data => {
        let coverages = data.Coverage.split(", ")
        coverages.forEach(coverage => {
            if (coverage !== "na" && coverage !== "Coverage") {
                if (deathCategory[coverage] == null) {
                    deathCategory[coverage] = 0
                }
                deathCategory[coverage] += 1
            }
            
        }
        )
    })
    const radius = Math.min(chartWidth, chartHeight) / 2 - marginHoz
    const _colorScale = scaleOrdinal(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
    const _pieMaker = pie().value(d => d)
    const dataReady = _pieMaker(Object.values(deathCategory))
    console.log(dataReady)
    const path = arc()
        .innerRadius(0)
        .outerRadius(radius)
    var label = arc()
        .outerRadius(radius + 50)
        .innerRadius(radius + 50);

    return (
        <div style={{ marginLeft: marginHoz, marginRight: marginHoz}}>
            <h1>
                Coverages that dead journalists covered
            </h1>
            <p>
                Pie chart describes category of coverages of journalists covered during their exploration. Bigger the number of category, bigger the size of pie slice is.
            </p>
            <svg width={chartWidth + legendPadding}
                height={chartHeight}>
                <g transform={`translate(${chartWidth / 2}, ${chartHeight / 2})`}>
                    {dataReady.map((pieSlice, i) => {
                        return (
                            <g>
                                <path
                                    key = {i}
                                    d={path(pieSlice)}
                                    fill={_colorScale(i + 1)}
                                />
                                <text
                                transform = {`translate(${label.centroid(pieSlice)})`}
                                fontSize={12}
                                fill = {_colorScale(i)}
                                >
                                    {Object.keys(deathCategory)[i] !== "" ? Object.keys(deathCategory)[i] : "Cannot Be Known" }
                                    {`: ${pieSlice.data}`}
                                </text>

                            </g>
                        );
                    })}
                </g>
            </svg>
        </div>
    );
}

export default JDPieChart;