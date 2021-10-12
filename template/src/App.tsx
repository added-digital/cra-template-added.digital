import { Route, Switch } from "react-router";
import "./App.scss";
import "./shared/WavesEffect/waves.css";
import "./shared/WavesEffect/waves.js";
import Home from "./containers/Home/Home";
import Layout from "./hoc/Layout/Layout";

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
      </Switch>
    </Layout>
  );
}

export default App;
