import React from "react";
import "./App.scss";
import "./shared/WavesEffect/waves.css";
import "./shared/WavesEffect/waves.js";

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
