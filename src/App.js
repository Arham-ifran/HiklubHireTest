import "./App.css";
import Questions from "./components/quiz/Questions";
// Google Analytics
// import ReactGA from 'react-ga';
// const TRACKING_ID = "OUR_TRACKING_ID";
// ReactGA.initialize(TRACKING_ID);
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";

function App() {
  let [loggedIn, setLoggedIn] = useState(true)
  /*
  useEffect(() => {
    ReactGA.pageview(location.pathname + location.search);
  }, []);
  */
  let Logged = (value) => {
    setLoggedIn(value)

  }
  useEffect(() => {
    let token = localStorage.getItem('userId')
    if (token) {
      setLoggedIn(true)
    } else {
      setLoggedIn(false)
    }
  }, [])

  return (
    <Router>
      <ToastContainer
        closeButton={false}
        position="top-right"
        autoClose={8000}
        hideProgressBar={false}
        newestOnTop={false}
        draggable={false}
        // pauseOnVisibilityChange
        closeOnClick
      // pauseOnHover
      />
      {loggedIn ?
        <Routes>
          <Route path="/" element={<Home loggedIn={loggedIn} Logged={Logged} />} />
          <Route path="/questions" element={<Questions Logged={Logged} />} />
          <Route path='*' element={<Navigate to='/' />} />
        </Routes> :
        <Routes>
          <Route path="/" element={<Home loggedIn={loggedIn} Logged={Logged} />} />
          <Route path="/login" element={<Login Logged={Logged} />} />
          <Route path="/singup" element={<Signup Logged={Logged} />} />
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      }
    </Router>
  );
}

export default App;
