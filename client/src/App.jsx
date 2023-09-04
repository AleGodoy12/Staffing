import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import ShowProjects from './components/projects/ShowProjects';
import CreateProject from './components/projects/CreateProject';
import EditProject from './components/projects/EditProject';
import ShowProjectsA from './components/assignament/ShowProjectsA';
import AssignmentProject from './components/assignament/AssignmentProject';

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Login />}></Route>
					<Route path="/panel" element={<Home />}></Route>
					<Route path="/panel/projects" element={<ShowProjects />}></Route>
					<Route
						path="/panel/projects/create"
						element={<CreateProject />}
					></Route>
					<Route path="/panel/projects/edit/:id" element={<EditProject />} />
          <Route path="/panel/assignment" element={<ShowProjectsA />}></Route>
          <Route path="/panel/assignment/:id" element={<AssignmentProject/>}></Route>
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
