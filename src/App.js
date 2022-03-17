import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import CovidStates from "./covidStates";
import TicketSale from "./TicketSale/TicketSale";
import DeadJournalist from "./DeadJournalist/DeadJournalist";
import TennisPlayer from "./TennisPlayer/TennisPlayer";
import InteractiveViz from "./InteractiveViz/InteractiveViz";
import FinalProject from "./FinalProject/FinalProject";

export const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul style={{ "display": "flex", "flexDirection": "row", "justifyContent": "space-around"}}>
            <div>
            <h1>Home</h1>
            <li>
              <Link to="/">Home</Link>
            </li>
            </div>
            <div>
              <h1>
                Assignment 1
              </h1>
              <li>
                <Link to="/covidStates">Covid States</Link>
              </li>
            </div>
            <div>
              <h1>
                Assignment 2
              </h1>
              <li>
                <Link to="/ticketSale">Ticket Sale in Holleywood</Link>
              </li>
              <li>
                <Link to="/deadJournalist">Journalist Dead Analysis</Link>
              </li>
              <li>
                <Link to="/tennisPlayer">Women Tennis Player</Link>
              </li>
            </div>
            <div>
              <h1>
                Assignment 3
              </h1>
              <li>
                <Link to="/interactiveJournalist">
                  Interactive Dead Journalist
                </Link>
              </li>
            </div>
            <div>
              <h1>
                Final
              </h1>
              <li>
                <Link to="/finalProject">
                  Final Project
                </Link>
              </li>
            </div>
          </ul>
        </nav>
        <Routes>
          <Route path="/covidStates" element={<CovidStates />} />
          <Route path="/ticketSale" element={<TicketSale />} />
          <Route path="/deadJournalist" element={<DeadJournalist />} />
          <Route path="/tennisPlayer" element={<TennisPlayer />} />
          <Route path="/interactiveJournalist" element={<InteractiveViz />} />
          <Route path="/finalProject" element={<FinalProject />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;