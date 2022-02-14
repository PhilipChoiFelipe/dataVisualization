import TPWordcloud from "./TPWordcloud"
import TPBarChart from "./TPBarChart";
import TPBarChartRank from "./TPBarChartRank";

const TennisPlayer = () => {
    return (
        <div>
            <h1>
                WOMEN PROF. TENNIS PLAYER DATA ANALYSIS
            </h1>
            <h2>
                <i>Question: Which countries' have most world professional women tennis player who ranked top 1000?</i>
            </h2>
            <TPWordcloud/>
            <TPBarChart/>
            <TPBarChartRank/>

            <h2 style={{margin: 20}}>Write Up</h2>
            <p style={{margin: 50}}>
                From this data analysis and visualization, I could understand that USA has most women tennis players in this world and has 
                most players who ranked top 1000 in WTA(Women's Tennis Association). Also, we can identify the trend that more the tennis player country has,
                more the players that achieved high rank in WTA. However, there is exceptions such as INDIA which ranked 10th most players but does not included in
                third visualization (Top 10 countries that have most women tennis players in Top 1000 Rank). Also, in other way, China ranked 6th in most women tennis players in Top 1000 Rank, but not in 
                graph in second visualization
            </p>
        </div>
    );
}

export default TennisPlayer;