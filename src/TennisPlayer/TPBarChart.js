import { scaleLinear, extent, range, scaleBand } from "d3";
import { AxisLeft, AxisBottom } from "@visx/axis";
import playerCountry from '../data/TennisPlayerCountry.json'

const TPBarChart = () => {
    const chartWidth = 1200;
    const chartHeight = 750
    const marginVer = 60
    const marginHoz = 80
    const legendPadding = 100;

    const topRankCountry = {}
    Object.keys(playerCountry).forEach(player => {
        let country = playerCountry[player]
        if (topRankCountry[country] == null) {
            topRankCountry[country] = 0
        }
        topRankCountry[country] += 1
    })
    var sortable = [];
    for (var player in topRankCountry) {
        sortable.push([player, topRankCountry[player]]);
    }
    
    sortable.sort(function(a, b) {
        return b[1] - a[1];
    });

    const top10Country = {}
    sortable.slice(0, 10).forEach(data => top10Country[data[0]] = data[1])

    const _extent = extent(Object.values(top10Country))
    const _scaleY = scaleLinear()
        .domain([0, _extent[1]])
        .range([chartHeight - marginVer, marginVer]);
    let countries = Object.keys(top10Country)
    const _scaleX = scaleBand()
        .domain(countries)
        .range([marginHoz, chartWidth - marginHoz])
        .paddingInner(0)

    return (
        <div style={{ marginLeft: marginHoz, marginRight: marginHoz }}>
            <h2>Top 10 countries that have most women tennis players</h2>
            <p>
                Y axis describes number of tennis player. X axis describes country codes.
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
                    tickValues={countries}
                />
                {
                    Object.keys(top10Country).map((country, i) => {
                        let barHeight = chartHeight - _scaleY(top10Country[country]) - marginVer
                        let barWidth = _scaleX.bandwidth() - 12
                        let barX = _scaleX(country) + 6
                        return (
                            <>
                                <rect
                                    y={chartHeight - barHeight - marginVer}
                                    x={barX}
                                    width={barWidth}
                                    height={barHeight}
                                    fill="blue"
                                />
                            </>
                        )
                    })
                }
            </svg>
        </div>
    );
}

export default TPBarChart