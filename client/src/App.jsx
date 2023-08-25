import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home"
import ShowProjects from "./components/ShowProjects";
import CreateProject from "./components/CreateProject";
import EditProject from "./components/EditProject"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}></Route>
          <Route path="/panel" element={<Home/>}></Route>
          <Route path="/panel/projects" element={<ShowProjects/>}></Route>
          <Route path="/panel/projects/create" element={<CreateProject />}></Route>
          <Route path="/panel/projects/edit/:id" element={<EditProject/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
