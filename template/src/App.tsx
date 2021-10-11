import React from "react";
import "./App.scss";

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
