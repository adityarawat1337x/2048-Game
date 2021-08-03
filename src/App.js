import Game from "./Game";
import { AnimatePresence } from "framer-motion";
import { Route, Switch, HashRouter as Router } from "react-router-dom";
import Landing from "./Landing";

function App() {
  return (
    <Router>
      <AnimatePresence exitBeforeEnter>
        <Switch>
          <Route path="/game" component={Game} />
          <Route exact path="/" component={Landing} />
        </Switch>
      </AnimatePresence>
    </Router>
  );
}

export default App;
