import { scaleLinear, scaleBand, extent, line, symbol, csv, range } from "d3";
import { AxisLeft, AxisBottom } from "@visx/axis";
import covidData from "./data/covidData.json";

const chartSize = 1200;
const margin = 30;

//Scale Horizontal (actual Data)
const positiveByStates = covidData.map(data => data.positive)
const _extent = extent(positiveByStates)
const _scaleX = scaleLinear()
.domain([_extent[0], _extent[1]])
.range([margin, chartSize - margin]);

//Scale vertical (by states)
const states = covidData.map(data => data.state)
const _scaleY = scaleLinear()
.domain(states.length)
.range([chartSize - margin, margin])

let tickValues = []

const legendPadding = 200
export const App = () => {
  for (let i = 0; i < _extent[1]; i+=500000) {
    tickValues.push(i)
  }
  tickValues.pop()
  tickValues.push(_extent[1])
  console.log(tickValues)
  return (
    <div className="App" style={{margin: 30}}>
      <h1>
        USA Number of Positive Corona Virus Cases By States
      </h1>
      <svg 
        width = {chartSize + legendPadding}
        height = {chartSize}
      >
        <AxisLeft strokeWidth={1} left={margin} scale={_scaleY}/>
        <AxisBottom
          strokeWidth={1}
          top={chartSize - margin}
          
          scale={_scaleX}
          tickValues={tickValues}
        />
        {
          covidData.map( (data, i) => {
            return (
              <>
              <rect
                x = {0 + margin}
                y = {i * 20 + margin}
                width = {_scaleX(data.positive)}
                height = {15}
                fill="red"
              />
              <text x={_scaleX(data.positive) + 10 + margin} y= {i * 20 + 15 + margin} fontSize={18}>
                {data.state}
              </text>
              </>
            )
          })
        }
        
      </svg>
      <h2>Write Up</h2>
      <p1>
        I utilized the dataset from "The COVID Tracking Project" that kept track of rich data of Corona Virus case by each state. However, project has ended all data collection in March 7, 2021,
        so we will analyze the data of cases in 2021. I utilized bar chart because it is intuitive to compare each states by the length of bar. Longer the bar is, higher the positive case in designated state.
        I used least data-ink as possible to ensure the clarity of data visualization and genuinely thoght I didn't need to add extra. 
      </p1>
      <p1>
        From this bar chart, people can understand that California and Texas have the highest positive cases. This is because color is red and visually impactive for comparison. I utilized abbreviation of state names
        to simplify the data-ink.
      </p1>
      <p1>
        I intentionally put specific number of positive cases at the end of x-axis bar tick in order to convey the number of California state's positive cases (maximum cases among states)
      </p1>
    </div>
  );
}

export default App;