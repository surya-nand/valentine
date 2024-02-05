import "./App.css";
import HomePage from "./components/HomePage/homePage";
import MainPage from "./components/MainPage/mainPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
        <Router>
          <Routes>
            <Route exact path="/" element={<HomePage />}></Route>
            <Route
              exact
              path="/:userId"
              element={
                <MainPage userId={window.location.pathname.split("/")[1]} />
              }
            ></Route>
          </Routes>
        </Router>
    </div>
  );
}
export default App;
