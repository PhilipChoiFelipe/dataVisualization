import { scaleLinear, extent, range, scaleBand, scaleOrdinal, groups } from "d3";
import { AxisLeft, AxisBottom } from "@visx/axis";
import journalistDeath from "../data/journalistDeath.json";

const JDBarChart = () => {
    const chartWidth = 1200;
    const chartHeight = 750
    const marginVer = 60
    const marginHoz = 80
    const legendPadding = 100;

    const deathCategory = {}
    journalistDeath.forEach(data => {
        let coverages = data.Coverage.split(", ")
        coverages.forEach(coverage => {
            if (coverage !== "na" && coverage !== "Coverage") {
                if (deathCategory[coverage] == null) {
                    deathCategory[coverage] = [0, 0, 0]
                }
                if (data.Sex === "Male") {
                    deathCategory[coverage][0] += 1
                } else if (data.Sex === "Female") {
                    deathCategory[coverage][1] += 1
                } else {
                    deathCategory[coverage][2] += 1
                }
            }
        }
        )
    })
    delete deathCategory[""]
    const group = Object.keys(deathCategory)
    const subGroups = ["Male", "Female", "Undefined"]
    const _scaleY = scaleLinear()
        .domain([0, 600])
        .range([chartHeight - marginVer, marginVer]);

    //Scale vertical (by states)
    const _scaleX = scaleBand()
        .domain(group)
        .range([marginHoz, chartWidth - marginHoz])
        .padding([0.2])

    const _scaleSubX = scaleBand()
        .domain(subGroups)
        .range([0, _scaleX.bandwidth()])

    const _scaleColor = scaleOrdinal().domain(subGroups).range(['#e41a1c', '#377eb8', '#4daf4a'])


    return (
        <div style={{ marginLeft: marginHoz, marginRight: marginHoz }}>
            <h2>Bar Chart</h2>
            <p>
                Y axis describes number of Dead Journalists. X axis describes type of coverages. Groups contain red: Male, blue: Female, green: Undefined.
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
                    tickValues={group}
                />
                <text x={chartWidth - marginHoz - 70} y={marginVer} fontSize={10} fill='#e41a1c'>
                    Male
                </text>

                <text x={chartWidth - marginHoz - 70} y={marginVer + 15} fontSize={10} fill="#377eb8">
                    Female
                </text>

                <text x={chartWidth - marginHoz - 70} y={marginVer + 30} fontSize={10} fill="#4daf4a">
                    Undefined
                </text>
                {
                    Object.values(deathCategory).map((data, i) => {
                        console.log(group[i])
                        return (
                            <g
                                transform={`translate(${_scaleX(group[i])}, ${-marginVer})`}
                            >
                                    <rect
                                        x={_scaleSubX(subGroups[0])}
                                        y={_scaleY(data[0])}
                                        width={_scaleSubX.bandwidth() - 5}
                                        height={chartHeight - _scaleY(data[0])}
                                        fill={_scaleColor(0)}
                                    />
                                    <rect
                                        x={_scaleSubX(subGroups[1])}
                                        y={_scaleY(data[1])}
                                        width={_scaleSubX.bandwidth() - 5}
                                        height={chartHeight - _scaleY(data[1])}
                                        fill={_scaleColor(1)}
                                    />
                                    <rect
                                        x={_scaleSubX(subGroups[2])}
                                        y={_scaleY(data[2])}
                                        width={_scaleSubX.bandwidth() - 5}
                                        height={chartHeight - _scaleY(data[2])}
                                        fill={_scaleColor(2)}
                                    />
                            </g>
                        )
                    })
                }



            </svg>
        </div>
    );
}

export default JDBarChart


