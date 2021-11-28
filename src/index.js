import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import Login from "./components/Login";
import Signup from "./components/Signup";
import GroupComponent from "./components/GroupComponent";
import Home from "./components/Home";
import AddExpense from "./components/AddExpense";
import Activity from "./components/activity";
import ShowGroup from "./components/ShowGroup";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import { Provider } from 'react-redux'
import store from './store'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/GroupComponent" element={<GroupComponent />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/AddExpense" element={<AddExpense />} />
        <Route path="/Activity" element={<Activity />} />
        <Route path="/ShowGroup" element={<ShowGroup />} />
        </Routes>
      </Router>
    </Provider>

  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
