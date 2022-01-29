
import { useRef, useEffect } from "react"; 
import {select, geoPath, geoMercator, json} from "d3";
import covidData from "./data/covidData.json";
import usHexGrid from "./data/us_states_hexgrid.geo.json";


export const App = () => {
  const wrapperRef = useRef();
  const svgRef = useRef();
  useEffect(() => {
    const svg = select(svgRef.current);

    const { width, height } = wrapperRef.current.getBoundingClientRect();

    const projection = geoMercator().scale(800).translate([2100, 1000]);
    const path = geoPath().projection(projection)
    console.log(usHexGrid)
    // Draw the map
    svg.append("g")
        .selectAll("path")
        .data(usHexGrid.features)
        .enter()
        .append("path")
            .attr("fill", "black")
            .attr("d", path)
            .attr("stroke", "white")

    svg.append("g")
    .selectAll("labels")
    .data(usHexGrid.features)
    .enter()
    .append("text")
      .attr("x", function(d){return path.centroid(d)[0]})
      .attr("y", function(d){return path.centroid(d)[1]})
      .text(function(d){ return d.properties.iso3166_2})
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "central")
      .style("font-size", 11)
      .style("fill", "white")
    })


  return (
    <div className="App" ref={wrapperRef} stype={{marginBottom: "2rem"}}>
      <svg ref={svgRef} width={1200} height={1000}></svg> 
    </div>
  );
}

export default App;
