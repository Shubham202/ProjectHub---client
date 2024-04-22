import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AdminLogin from "./pages/AdminLogin";
import LandingBase from "./components/layouts/LandingBase";
import PlagiarismCheck from "./pages/PlagiarismCheck";
import Projects from "./pages/Projects";
import NewProject from "./pages/NewProject";
import Project from "./pages/Project";

const isAuthenticated = () => {
	return localStorage.getItem("token") !== null;
};

function App() {
	return (
		<Router>
			<Routes>
				<Route element={<LandingBase auth={isAuthenticated} />}>
					<Route path="/" element={<Home />} />
					<Route path="/projects" element={<Projects />} />
					<Route path="/projects/:id" element={<Project />} />
					<Route path="/create-project" element={<Home />} />
					<Route path="/new-project" element={<NewProject />} />
					<Route
						path="/check-plagiarism"
						element={<PlagiarismCheck />}
					/>
				</Route>
				<Route path="/login" element={<Login />} />
				<Route path="/admin-login" element={<AdminLogin />} />
			</Routes>
		</Router>
	);
}

export default App;
