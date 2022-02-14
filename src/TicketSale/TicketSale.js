import TSBarChart from "./TSBarChart";
import TSAreaClosed from "./TSAreaClosed";
import TSBubbleChart from "./TSBubbleChart";

const TicketSale = () => {

    return (
        <div>
            <h1>
            Hollywood Theatrical Market Synopsis Data Analysis (1995-2021)
            </h1>
            <h2>
                <i>Question: How did Corona Virus influenced ticket sale for Hollywood movies?</i>
            </h2>
            <TSBarChart/>
            <br/>
            <TSAreaClosed/>
            <TSBubbleChart/>
            <h2 style={{margin: 20}}>Write Up</h2>
            <p style={{margin: 50}}>
                From this data analysis and visualization, I could understand that Hollywood suffered a dramatic drop in ticket sale from 2020 because of Corona virus impact.
                For the social distance, theater could not accept people for full room to stay in theater for few hours which naturally decreased the number of ticket sales. 
                Also, from the visualization, we can find the pattern that inflation has be drastically increased as time goes.
            </p>
        </div>
    );
}

export default TicketSale


