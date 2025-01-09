import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<div>hello!</div>}></Route>
      </Routes>
    </Router>
  );
}
