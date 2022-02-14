import { scaleOrdinal } from 'd3';
import WordCloud from 'react-d3-cloud';
import journalistDeath from '../data/journalistDeath.json';

const chartHeight = 850;
const marginHoz = 80

const JDWordcloud = () => {
    const deathLocation = {}
    journalistDeath.forEach(data => {
        let countryKilled = data["Country Killed"]
        if (deathLocation[countryKilled] == null) {
            deathLocation[countryKilled] = 0
        }
        deathLocation[countryKilled] += 1
    })
    const _colorScale = scaleOrdinal(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

    return (
        <div style={{ marginLeft: marginHoz, marginRight: marginHoz }}>
            <h1>
                Countries where journalists got killed
            </h1>
            <p>
                Bigger the font size, bigger the number of dead journalist in designated country code
            </p>
                <WordCloud
                    data ={ Object.keys(deathLocation).map(key =>  {return {text: key, value: deathLocation[key]    }})}
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

export default JDWordcloud;