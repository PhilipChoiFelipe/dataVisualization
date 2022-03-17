import React, { useState } from 'react';
import { scaleLinear, scaleBand, extent, range, area, symbol, csv, scaleOrdinal } from "d3";
import { AxisLeft, AxisBottom, AxisRight } from "@visx/axis";
import journalistDeath from "../data/journalistDeath.json";
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { line } from 'd3';

const chartWidth = 1200;
const chartHeight = 750;
const marginVer = 80
const marginHoz = 80
const legendPadding = 100;
const deathByDate = {}
const coverageDate = {
    "Sports": {},
    "Business": {},
    "Culture": {},
    "Crime": {},
    "Corruption": {},
    "Human Rights": {},
    "War": {},
    "Politics": {}
}

journalistDeath.forEach(data => {
    const date = data.Date
    let dates = date.substring(date.length - 2, date.length)
    dates = Number(dates)
    if (Number.isInteger(dates)) {
        let year = ""
        if (dates > 90 && dates < 100) {
            year = year + "19" + dates
        } else if (dates < 10) {
            year = year + "200" + dates
        }
        else if (dates < 20) {
            year = year + "20" + dates
        }
        year = Number(year);
        if (deathByDate[year] == null) {
            deathByDate[year] = 1
        } else {
            deathByDate[year] += 1
        }
        let coverages = data.Coverage.split(", ")
        coverages.forEach(coverage => {
            if (coverage !== "na" && coverage !== "Coverage" && coverage !== "") {
                if (coverageDate[coverage][year] == null) {
                    coverageDate[coverage][year] = 1
                } else {
                    coverageDate[coverage][year] += 1
                }
            }
        })
    }
})

const DeathDateChart = () => {
    const [coverages, setCoverages] = useState([])
    // const _extent = extent(Object.values(deathByDate))
    const _scaleY = scaleLinear()
        .domain([0, 50])
        .range([chartHeight - marginVer, marginVer]);
    let tickValues = range(1992, 2019)
    console.log(tickValues)
    const _scaleLine = scaleLinear()
        .domain([1992, 2019])
        .range([marginHoz + 18, chartWidth - marginHoz + 18])

    const _scaleYear = scaleBand()
        .domain(tickValues)
        .range([marginHoz, chartWidth - marginHoz])

    const _lineMaker = line()
        .x((d) => _scaleLine(d[0]))
        .y((d) => _scaleY(d[1]))
    /*
        "Sports": {},
        "Business": {},
        "Culture": {},
        "Crime": {},
        "Corruption": {},
        "Human Rights": {},
        "War": {},
        "Politics": {}
    */
    const _colorScale = {
        "Sports": "#98abc5",
        "Business": "#8a89a6",
        "Culture": "#7b6888",
        "Crime": "#6b486b",
        "Corruption": "#a05d56",
        "Human Rights": "#d0743c",
        "War": "#ff8c00",
        "Politics": "blue"
    }

    const [sportsChecked, setSportsChecked] = useState(false);
    const [businessChecked, setBusinessChecked] = useState(false);
    const [cultureChecked, setCultureChecked] = useState(false);
    const [crimeChecked, setCrimeChecked] = useState(false);
    const [corruptionChecked, setCorruptionChecked] = useState(false);
    const [hrChecked, setHrChecked] = useState(false);
    const [warChecked, setWarChecked] = useState(false);
    const [politicsChecked, setPoliticsChecked] = useState(false);

    const [lineTooltip, setLineTooltip] = useState(null);

    const handleOnChange = (func, value, e) => {
        if (value === false) {
            setCoverages(prev => [...prev, e.target.value]);
        } else {
            let filteredCover = coverages.filter(coverage => coverage !== e.target.value)
            setCoverages(filteredCover)
        }
        func(!value)
    };

    return (
        <div style={{ marginLeft: marginHoz, marginRight: marginHoz }}>
            <h1>
                Connected Scatter plot of dead journalists in chronical order
            </h1>
            <p>
                Scatter line chart describes death count of journalists of selected coverage during their exploration. User can understand the trend of death count of journalist in the chronical way.
            </p>
            <p>
                <b>Click on the checkbox</b> to get the scatter plot of specified coverage.
            </p>
            <p>
                <b>Hover on the dot in graph</b> to get the death count of journalists of specificed coverage.
            </p>
            <div style={{ "display": "flex", "flexDirection": "row", "justifyContent": "space-around" }}>
                <div>
                    <input
                        type="checkbox"
                        id="Sports"
                        name="Sports"
                        value="Sports"
                        checked={sportsChecked}
                        onChange={(e) => { handleOnChange(setSportsChecked, sportsChecked, e) }}
                    />
                    Sports
                </div>
                <div>
                    <input
                        type="checkbox"
                        id="Business"
                        name="Business"
                        value="Business"
                        checked={businessChecked}
                        onChange={(e) => { handleOnChange(setBusinessChecked, businessChecked, e) }}
                    />
                    Business
                </div>
                <div>
                    <input
                        type="checkbox"
                        id="Culture"
                        name="Culture"
                        value="Culture"
                        checked={cultureChecked}
                        onChange={(e) => { handleOnChange(setCultureChecked, cultureChecked, e) }}
                    />
                    Culture
                </div>
                <div>
                    <input
                        type="checkbox"
                        id="Crime"
                        name="Crime"
                        value="Crime"
                        checked={crimeChecked}
                        onChange={(e) => { handleOnChange(setCrimeChecked, crimeChecked, e) }}
                    />
                    Crime</div>
                <div>
                    <input
                        type="checkbox"
                        id="Corruption"
                        name="Corruption"
                        value="Corruption"
                        checked={corruptionChecked}
                        onChange={(e) => { handleOnChange(setCorruptionChecked, corruptionChecked, e) }}
                    />
                    Corruption
                </div>
                <div>
                    <input
                        type="checkbox"
                        id="Human Rights"
                        name="Human Rights"
                        value="Human Rights"
                        checked={hrChecked}
                        onChange={(e) => { handleOnChange(setHrChecked, hrChecked, e) }}
                    />
                    Human Rights
                </div>
                <div>
                    <input
                        type="checkbox"
                        id="War"
                        name="War"
                        value="War"
                        checked={warChecked}
                        onChange={(e) => { handleOnChange(setWarChecked, warChecked, e) }}
                    />
                    War
                </div>
                <div>
                    <input
                        type="checkbox"
                        id="Politics"
                        name="Politics"
                        value="Politics"
                        checked={politicsChecked}
                        onChange={(e) => { handleOnChange(setPoliticsChecked, politicsChecked, e) }}
                    />
                    Politics
                </div>
            </div>
            <svg width={chartWidth + legendPadding} height={chartHeight}>
                <AxisLeft strokeWidth={2} left={marginHoz} scale={_scaleY} />
                <AxisBottom
                    strokeWidth={2}
                    top={chartHeight - marginVer}
                    scale={_scaleYear}
                    tickValues={tickValues}
                />
                {
                    coverages.length === 0 ? <></> :
                        coverages.map((key, i) => {
                            return (<>
                                <path
                                    stroke={_colorScale[key]}
                                    strokeWidth={4}
                                    fill={"none"}
                                    d={_lineMaker(Object.entries(coverageDate[key]))}
                                    onMouseEnter={() => { setLineTooltip(key) }}
                                    onMouseLeave={() => { setLineTooltip(null) }}
                                />
                                <g>
                                    {
                                        Object.keys(coverageDate[key]).map(year => {
                                            return (
                                                <OverlayTrigger
                                                    key={key}
                                                    placement={"top"}
                                                    overlay={
                                                        <Tooltip>
                                                            {`${key} (${year}): ${coverageDate[key][year]} death`}
                                                        </Tooltip>
                                                    }
                                                >
                                                    <circle
                                                        cx={_scaleLine(year)}
                                                        cy={_scaleY(coverageDate[key][year])}
                                                        r={5}
                                                        fill={_colorScale[key]}
                                                    />
                                                </OverlayTrigger>

                                            )
                                        })
                                    }
                                </g>
                            </>);
                        })
                }
            </svg>
            <h1 style={{ "display": "absolute" }}>
                {
                    lineTooltip
                }
            </h1>
        </div>
    )
}

export default DeathDateChart;