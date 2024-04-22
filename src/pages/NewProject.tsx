import React, { useState, ChangeEvent, FormEvent } from "react";

interface FormData {
	project_name: string;
	overview: string;
	user_id: number;
}

const NewProject: React.FC = () => {
	const user_id = localStorage.getItem("user_id");

	if (!user_id) {
		localStorage.removeItem("token");
		window.location.href = "/";
	}

	const [formData, setFormData] = useState<FormData>({
		project_name: "",
		overview: "",
		user_id: user_id ? parseInt(user_id, 10) : 0
	});

	const handleInputChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value
		});
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		fetch("http://localhost:5000/projects", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(formData)
		})
			.then(response => response.json())
			.then(data => {
				alert(data.message);
				window.location.href = "/projects";
			})
			.catch(error => {
				console.error("Error:", error);
			});
	};

	return (
		<div className="container mx-auto mt-8">
			<h1 className="text-3xl font-medium mb-6 text-center">
				Create New Project
			</h1>
			<form onSubmit={handleSubmit} className="max-w-lg mx-auto">
				<div className="mb-4">
					<label
						htmlFor="project_name"
						className="block text-sm font-medium text-gray-600"
					>
						Project Name
					</label>
					<input
						type="text"
						id="project_name"
						name="project_name"
						value={formData.project_name}
						onChange={handleInputChange}
						className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:shadow-outline-blue"
					/>
				</div>
				<div className="mb-4">
					<label
						htmlFor="overview"
						className="block text-sm font-medium text-gray-600"
					>
						Overview
					</label>
					<textarea
						id="overview"
						name="overview"
						value={formData.overview}
						onChange={handleInputChange}
						className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:shadow-outline-blue"
						rows={4}
					></textarea>
				</div>
				<div className="mt-6 flex justify-center">
					<button
						type="submit"
						className="w-[50%] hover:scale-105 transition-transform duration-300 ease-in-out bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded shadow-lg"
					>
						Create Project
					</button>
				</div>
			</form>
		</div>
	);
};

export default NewProject;
