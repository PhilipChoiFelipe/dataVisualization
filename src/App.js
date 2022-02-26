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

export const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <h1>
              Assignment 1
            </h1>
            <li>
              <Link to="/covidStates">Covid States</Link>
            </li>
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
            <h1>
              Assignment 3
            </h1>
            <li>
            <Link to="/interactiveJournalist">
              Interactive Dead Journalist
            </Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/covidStates" element={<CovidStates/>}/>
          <Route path="/ticketSale" element={<TicketSale/>}/>
          <Route path="/deadJournalist" element={<DeadJournalist/>}/>
          <Route path="/tennisPlayer" element={<TennisPlayer/>}/>
          <Route path="/interactiveJournalist" element={<InteractiveViz/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;