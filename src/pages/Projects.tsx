import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "../components/Card";

interface Project {
	id: number;
	project_name: string;
	project_status: string;
	proposal_status: string;
	report_status: string;
	overview: string;
}

const Projects = () => {
	const [projects, setProjects] = useState<Project[]>([]);

	useEffect(() => {
		fetchProjects();
	}, []);

	const fetchProjects = async () => {
		try {
			const user_id = localStorage.getItem("user_id");
			if (user_id) {
				const response = await fetch(
					`http://localhost:5000/projects/${user_id}`
				);
				const data = await response.json();
				setProjects(data.user_projects);
			}
		} catch (error) {
			console.error("Error fetching projects:", error);
		}
	};

	return (
		<div>
			<div className="flex justify-center my-10">
				<Link
					to={"/new-project"}
					className="hover:scale-105 transition-transform duration-300 ease-in-out bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded shadow-lg"
				>
					New Project +
				</Link>
			</div>
			<div className="grid grid-cols-3 justify-center w-fit m-auto gap-10">
				{projects.length > 0 ? (
					projects.map(project => (
						<Card data={project} key={project.id} />
					))
				) : (
					<p>No projects found.</p>
				)}
			</div>
		</div>
	);
};

export default Projects;
