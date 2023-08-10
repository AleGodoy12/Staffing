import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import './assets/css/Defaults.css'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
