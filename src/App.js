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

export const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/covidStates">Covid States</Link>
            </li>
            <li>
              <Link to="/ticketSale">Ticket Sale in Holleywood</Link>
            </li>
            <li>
              <Link to="/deadJournalist">Journalist Dead Analysis</Link>
            </li>
            <li>
              <Link to="/tennisPlayer">Women Tennis Player</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/covidStates" element={<CovidStates/>}/>
          <Route path="/ticketSale" element={<TicketSale/>}/>
          <Route path="/deadJournalist" element={<DeadJournalist/>}/>
          <Route path="/tennisPlayer" element={<TennisPlayer/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;