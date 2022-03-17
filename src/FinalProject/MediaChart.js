import React, { useState } from 'react';
import { scaleOrdinal, arc, interpolate, pie, line } from "d3";
import journalistDeath from "../data/journalistDeath.json";

const chartWidth = 1200;
const chartHeight = 750;
const marginVer = 80
const marginHoz = 80
const legendPadding = 100;

const mediumType = {}
journalistDeath.forEach(data => {
    let types = data.Medium.split(", ")
    types.forEach(type => {
        if (type !== "na" && type !== "") {
            if (mediumType[type] == null) {
                mediumType[type] = 0
            }
            mediumType[type] += 1
        }
    })
})


const MediaChart = () => {
    return (
        <div>

        </div>
    );
}

export default MediaChart;