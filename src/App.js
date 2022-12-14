import logo from "./logo.svg";
import "./App.css";
// Google Analytics
// import ReactGA from 'react-ga';
// const TRACKING_ID = "OUR_TRACKING_ID";
// ReactGA.initialize(TRACKING_ID);

function App() {
  /*
  useEffect(() => {
    ReactGA.pageview(location.pathname + location.search);
  }, []);
  */

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
