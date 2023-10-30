import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/pages/login/Login';
import Home from './components/pages/home/Home';
import ShowProjects from './components/pages/admin/ShowProjects';
import CreateProject from './components/pages/admin/CreateProject';
import EditProject from './components/pages/admin/EditProject';
import ShowProjectsA from './components/pages/admin/ShowProjectsA';
import AssignmentProject from './components/pages/admin/AssignmentProject';
import AuthContextProvider from './context/AuthContext';
import ProtectedRoute from './components/routes/ProtectedRoute';
import LoginRoute from './components/routes/LoginRoute';
import ShowUsers from './components/pages/admin/ShowUsers';
import CreateUsers from './components/pages/admin/CreateUsers';
import IndexPm from './components/pages/project-manager/IndexPm';
import ShowAssignedProjects from './components/pages/project-manager/ShowAssignedProjects';
import ShowProjectInfo from './components/pages/project-manager/ShowProjectInfo';

function App() {
	return (
		<>
			<BrowserRouter>
				<AuthContextProvider>
					<Routes>
						<Route
							path="/"
							element={
								<LoginRoute>
									<Login />
								</LoginRoute>
							}
						/>

						<Route
							path="/admin"
							element={<ProtectedRoute requiredPermission="admin" />}
						>
							<Route index element={<Home />} />
							<Route path="projects" element={<ShowProjects />} />
							<Route path="projects/create" element={<CreateProject />} />
							<Route path="projects/edit/:id" element={<EditProject />} />
							<Route path="assignment" element={<ShowProjectsA />} />
							<Route path="assignment/:id" element={<AssignmentProject />} />
							<Route path="users" element={<ShowUsers />} />
							<Route path="users/create" element={<CreateUsers />} />
						</Route>

						<Route
							path="/pm"
							element={<ProtectedRoute requiredPermission="pm" />}
						>
              <Route index element={<IndexPm/>} />
              <Route path="projects" element={<ShowAssignedProjects/>}/>
              <Route path="projects/:id" element={<ShowProjectInfo/>}/>
              <Route path="employees" element={<h1>hola</h1>}/>
              <Route path="downloads" element={<h1>hola</h1>}/>
						</Route>

						<Route
							path="*"
							element={
								<LoginRoute>
									<Login />
								</LoginRoute>
							}
						/>
					</Routes>
				</AuthContextProvider>
			</BrowserRouter>
		</>
	);
}

export default App;
