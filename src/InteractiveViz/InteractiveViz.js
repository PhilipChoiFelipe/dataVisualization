import React, { useState } from 'react';
import { scaleOrdinal, arc, interpolate, pie, line } from "d3";
import journalistDeath from "../data/journalistDeath.json";

const chartWidth = 1200;
const chartHeight = 750;
const marginVer = 80
const marginHoz = 80
const legendPadding = 100;

const deathCategory = {}
journalistDeath.forEach(data => {
    let coverages = data.Coverage.split(", ")
    coverages.forEach(coverage => {
        if (coverage !== "na" && coverage !== "Coverage" && coverage !== "") {
            if (deathCategory[coverage] == null) {
                deathCategory[coverage] = 0
            }
            deathCategory[coverage] += 1
        }

    }
    )
})

const typeDeathCategory = {}
journalistDeath.forEach(data => {
    let type = data["Type of Death"];
    if (type !== "na" && type !== "Type of Death" && type !== "Unknown" && type !== "Suspected Source of Fire:" && type !== "") {
        if (typeDeathCategory[type] == null) {
            typeDeathCategory[type] = 0
        }
        typeDeathCategory[type] += 1
    }
})

const deathCategoryBySex = {}
journalistDeath.forEach(data => {
    let coverages = data.Coverage.split(", ")
    coverages.forEach(coverage => {
        if (coverage !== "na" && coverage !== "Coverage") {
            if (deathCategoryBySex[coverage] == null) {
                deathCategoryBySex[coverage] = [0, 0, 0]
            }
            if (data.Sex === "Male") {
                deathCategoryBySex[coverage][0] += 1
            } else if (data.Sex === "Female") {
                deathCategoryBySex[coverage][1] += 1
            } else {
                deathCategoryBySex[coverage][2] += 1
            }
        }
    }
    )
})
delete deathCategoryBySex[""]

const deathTypeBySex = {}
journalistDeath.forEach(data => {
    let type = data["Type of Death"]
    if (type !== "na" && type !== "Type of Death" && type !== "Unknown" && type !== "Suspected Source of Fire:" && type !== "") {
        if (deathTypeBySex[type] == null) {
            deathTypeBySex[type] = [0, 0, 0]
        }
        if (data.Sex === "Male") {
            deathTypeBySex[type][0] += 1
        } else if (data.Sex === "Female") {
            deathTypeBySex[type][1] += 1
        } else {
            deathTypeBySex[type][2] += 1
        }
    }

})
delete deathTypeBySex[""]

const InteractiveViz = () => {
    const [data, setData] = useState(deathCategory);
    const [objKey, setObjKey] = useState(null);
    const [sexType, setSexType] = useState(deathCategoryBySex);
    const [pieType, setPieType] = useState("Coverages")

    const radius = Math.min(chartWidth, chartHeight) / 2
    const _colorScale = scaleOrdinal(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
    const _secondScale = scaleOrdinal(["#377eb8", "#e41a1c"]);
    const _pieMaker = pie().value(d => d)
    const dataReady = _pieMaker(Object.values(data))
    const sexDataReady = objKey != null && objKey in sexType ? _pieMaker(Object.values(sexType[objKey])) : null;
    const midAngle = (d) => {
        return d.startAngle + (d.endAngle - d.startAngle) / 2;
    }
    const innerArc = arc().innerRadius(radius * 0.8).outerRadius(radius * 0.6);
    const outerArc = arc()
        .outerRadius(radius * 0.9)
        .innerRadius(radius * 0.9);

    const secondInnerArc = arc().innerRadius(radius * 0.3).outerRadius(radius * 0.5);
    console.log(sexType);

    return (
        <div style={{ marginLeft: marginHoz, marginRight: marginHoz, width: 1000 }}>
            <h1>
                {pieType} of dead journalists
            </h1>
            <div>
                <button onClick={() => { setData(deathCategory); setSexType(deathCategoryBySex); setObjKey(null); setPieType("Coverages") }}>Coverage</button>
                <button onClick={() => { setData(typeDeathCategory); setSexType(deathTypeBySex); setObjKey(null); setPieType("Type of Death") }}>Type of Death</button>
            </div>
            <p>
                Pie chart describes category of coverages of journalists covered during their exploration. Bigger the number of category, bigger the size of pie slice is.
            </p>
            <p>
                <b>Click on the pie slice</b> to get the detail of ratio of journalists' sex for each coverage.
            </p>
            <svg width={chartWidth + legendPadding + 100}
                height={chartHeight}
            >
                <g transform={`translate(${chartWidth / 2}, ${chartHeight / 2})`}>
                    {sexDataReady == null ? <></> : sexDataReady.map((pieSlice, i) => {
                        return (
                            <g>
                                <path
                                    d={secondInnerArc(pieSlice)}
                                    fill={_secondScale(i + 1)}
                                />
                            </g>
                        )
                    })}
                    <text x={-marginHoz / 2 - 60} y={-10} fontSize={35}>
                        {objKey}
                    </text>
                    <text x={-marginHoz / 2 - 30} y={30} fontSize={22} fill='#377eb8'>
                        {objKey != null && objKey in sexType ? 'Male:' + sexType[objKey][0] : null}
                    </text>
                    <text x={-marginHoz / 2 - 30} y={60} fontSize={22} fill="#e41a1c">
                        {objKey != null && objKey in sexType ? 'Female:' + sexType[objKey][1] : null}
                    </text>
                    {dataReady == null ? <></> : dataReady.map((pieSlice, i) => {
                        let line_pos = innerArc.centroid(pieSlice)
                        line_pos[0] = radius * 0.95 * (midAngle(pieSlice) < Math.PI ? 1 : -1);
                        let line_points = [innerArc.centroid(pieSlice), outerArc.centroid(pieSlice), line_pos]

                        let text_pos = innerArc.centroid(pieSlice);
                        text_pos[0] = radius * 0.95 * (midAngle(pieSlice) < Math.PI ? 1 : -1);
                        return (
                            <g>
                                <path
                                    key={i}
                                    d={innerArc(pieSlice)}
                                    fill={_colorScale(i + 1)}
                                    onClick={() => setObjKey(Object.keys(data)[i])}
                                />
                                <text
                                    html={pieSlice.data}
                                    transform={`translate(${text_pos})`}
                                    style={{ textAnchor: midAngle(pieSlice) < Math.PI ? 'start' : 'end' }}
                                    fontSize={20}
                                    fill={_colorScale(i)}
                                    dy={'.25em'}
                                >
                                    {Object.keys(data)[i] !== "" ? Object.keys(data)[i] : "Cannot Be Known"}
                                </text>
                                <path
                                    stroke={"black"}
                                    fill={"None"}
                                    // strokeWidth={4}
                                    d={line()(line_points)}
                                />
                            </g>
                        );
                    })}

                </g>
            </svg>
            <p>
            (1) I chose to use pie chart because there were not many category of data. I used buttons to let user choose which type of data they want to vizualize. This will give users options of choosing data and help users to intuitively understand what data they are looking at.
            Also, I programmed to dynamically query the sex ratio of dead journalists when user click specific slice of pie chart. This will help users to understand the sex ratio of particular coverages or type of deaths that journalists covered and experienced.
            Alternatives were to use word clouds. When user click the word, pop up or modal will be displayed and user can understand the detail. However, I though with limited categories and definite number of dead journalists, I believed using pie chart was intuitive for readers. 
            </p>
            <p>
            (2) I spent about 10 hours to create interative visualization. I spent time studying logic of d3 functions and states of React. 
            </p>
        </div>
    );
}

export default InteractiveViz;