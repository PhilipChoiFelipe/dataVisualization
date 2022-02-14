import { scaleOrdinal } from 'd3';
import WordCloud from 'react-d3-cloud';
import wtaRanking from '../data/wta_rankings_current.json';
import playerCountry from '../data/TennisPlayerCountry.json'

const chartHeight = 850;
const marginHoz = 80

const TPWordcloud = () => {
    const topRankCountry = {}
    wtaRanking.forEach(data => {
        let player = data["player"]
        let country = playerCountry[player]
        if (topRankCountry[country] == null) {
            topRankCountry[country] = 0
        }
        topRankCountry[country] += 1
    })
    const _colorScale = scaleOrdinal(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

    return (
        <div style={{ marginLeft: marginHoz, marginRight: marginHoz }}>
            <h1>
                Countries of TOP 1000 Women Tennis Player
            </h1>
            <p>
                Bigger the font size, bigger the number of players in designated country code
            </p>
            <WordCloud
                data={Object.keys(topRankCountry).map(key => { return { text: key, value: topRankCountry[key] } })}
                width={chartHeight}
                height={chartHeight}
                font="Times"
                fontStyle="italic"
                fontWeight="bold"
                fontSize={(word) => Math.log2(word.value) * 5}
                spiral="rectangular"
                rotate={(word) => word.value % 360}
                padding={5}
                random={Math.random}
                fill={(d, i) => _colorScale(i)}
            />
        </div>
    );
}

export default TPWordcloud;