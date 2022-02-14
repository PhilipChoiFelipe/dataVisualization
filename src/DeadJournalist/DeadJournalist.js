import JDBarChart from "./JDBarChart";
import JDWordcloud from "./JDWordcloud";
import JDPieChart from "./JDPieChart";

const DeadJournalist = () => {

    return (
        <div>
            <h1>
                JOURNALIST DEATH DATA ANALYSIS (1992-2016)
            </h1>
            <h2>
                <i>Question: What is the reason, where, sex of dead journlist in this world?</i>
            </h2>
            <JDWordcloud/>
            <JDPieChart/>
            <JDBarChart/>
            <h2 style={{margin: 20}}>Write Up</h2>
            <p style={{margin: 50}}>
                From this data analysis and visualization, I could understand that journalist got killed in countries where they historically experienced
                warfare and corrupted government such as Iraq, Syria, and Democratic Republic of Congo. From third visualization, I could identify the pattern that
                journalists that took risk for information were mostly male and they mostly covered War and Politics.
            </p>
        </div>

    );
}

export default DeadJournalist;