import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

interface ProjectData {
	id: number;
	project_name: string;
	project_status: string;
	proposal_status: string;
	report_status: string;
	overview: string;
	proposal_cosine: string;
	proposal_jaccard: string;
	report_jaccard: string;
	report_cosine: string;
}

const Project: React.FC = () => {
	const projectId = useParams<{ id: string }>().id;
	const userId = localStorage.getItem("user_id");

	const [project, setProject] = useState<ProjectData | null>(null);
	const [editMode, setEditMode] = useState(false);
	const [updatedProject, setUpdatedProject] = useState<ProjectData | null>(
		null
	);
	const [showUploadModal, setShowUploadModal] = useState(false);
	const [plagiarism, setPlagiarism] = useState<string | null>(null);
	const [cosineSimilarity, setCosineSimilarity] = useState<number | null>(
		null
	);
	const [jaccardSimilarity, setJaccardSimilarity] = useState<number | null>(
		null
	);

	useEffect(() => {
		const fetchProject = async () => {
			try {
				const response = await fetch(
					`http://localhost:5000/projects/${userId}/${projectId}`
				);
				if (!response.ok) {
					throw new Error("Failed to fetch project");
				}
				const data = await response.json();
				setProject(data.project);
			} catch (error) {
				console.error("Error fetching project:", error);
			}
		};

		fetchProject();
	}, [userId, projectId]);

	const handleDelete = async () => {
		try {
			const response = await fetch(
				`http://localhost:5000/projects/${userId}/${projectId}`,
				{
					method: "DELETE"
				}
			);
			if (!response.ok) {
				throw new Error("Failed to delete project");
			}
			window.location.href = "/projects";
		} catch (error) {
			console.error("Error deleting project:", error);
		}
	};

	const handleEdit = () => {
		setUpdatedProject({
			...project
		});
		setEditMode(true);
	};

	const handleSave = async () => {
		try {
			const response = await fetch(
				`http://localhost:5000/projects/${userId}/${projectId}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(updatedProject)
				}
			);
			if (!response.ok) {
				throw new Error("Failed to save project");
			}
			setProject(updatedProject);
			setEditMode(false);
		} catch (error) {
			console.error("Error saving project:", error);
		}
	};

	const handleInputChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = event.target;
		setUpdatedProject(prevState => ({
			...prevState!,
			[name]: value
		}));
	};

	const handleUploadModalOpen = () => {
		setShowUploadModal(true);
	};

	const handleUploadModalClose = () => {
		setShowUploadModal(false);
	};

	const handleFileUpload = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		try {
			const file = event.target.files?.[0] || null;
			if (!file) return;

			const formData = new FormData();
			formData.append("file", file);

			fetch("http://localhost:5000/check-plagiarism", {
				method: "POST",
				body: formData
			})
				.then(response => {
					if (!response.ok) {
						throw new Error(
							`HTTP error! Status: ${response.status}`
						);
					}
					return response.text();
				})
				.then(data => {
					setPlagiarism(JSON.parse(data).message);
					setCosineSimilarity(JSON.parse(data).csp);
					setJaccardSimilarity(JSON.parse(data).jsp);
					setUpdatedProject({
						id: project.id,
						project_name: project.project_name,
						project_status: project.project_status,
						proposal_status: project.proposal_status,
						report_status: project.report_status,
						overview: project.overview
					});
				})
				.catch(error => console.error("Error uploading file:", error));
		} catch (error) {
			console.error("Error updating proposal file:", error);
		}
	};

	return (
		<div className="w-[60%] mx-auto mt-8">
			{project ? (
				<div className="">
					<h1 className="text-3xl font-medium mb-8">
						{editMode ? (
							<input
								type="text"
								name="project_name"
								value={updatedProject?.project_name}
								onChange={handleInputChange}
								className="border border-gray-700 rounded p-3 w-full"
							/>
						) : (
							project.project_name
						)}
					</h1>
					<div className="grid grid-cols-2">
						<div>
							<div className="font-semibold text-lg">
								Overview
							</div>
							{editMode ? (
								<textarea
									name="overview"
									value={updatedProject?.overview}
									onChange={handleInputChange}
									className="w-full border border-gray-700 rounded p-3 h-[300px]"
								/>
							) : (
								<div>{project.overview}</div>
							)}
						</div>
						<div className="flex flex-col items-end gap-5">
							<button
								onClick={handleDelete}
								className="w-[100px] hover:scale-105 transition-transform duration-300 ease-in-out bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow-lg"
							>
								Delete
							</button>
							{editMode ? (
								<button
									onClick={handleSave}
									className="w-[100px] hover:scale-105 transition-transform duration-300 ease-in-out bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded shadow-lg"
								>
									Save
								</button>
							) : (
								<button
									onClick={handleEdit}
									className="w-[100px] hover:scale-105 transition-transform duration-300 ease-in-out bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow-lg"
								>
									Edit
								</button>
							)}
						</div>
					</div>
					<div className="flex gap-8 mt-8">
						<button
							onClick={handleUploadModalOpen}
							className="hover:scale-105 transition-transform duration-300 ease-in-out bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded shadow-lg"
						>
							View Proposal
						</button>
						<button className="hover:scale-105 transition-transform duration-300 ease-in-out bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded shadow-lg">
							View Report
						</button>
					</div>
					{showUploadModal && (
						<div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
							<div className="bg-white p-8 rounded-lg">
								<h2 className="text-xl font-bold mb-4">
									Proposal PDF
								</h2>
								<input
									type="file"
									id="proposalFile"
									name="proposalFile"
									onChange={handleFileUpload}
									accept=".pdf"
									className="border border-gray-300 rounded px-3 py-2 w-full"
								/>
								<div>
									{plagiarism === "Plagiarism Detected" && (
										<div className="grid gap-3 mt-4">
											<div>
												Ohhh!!! Plagiarism Detected
											</div>
											<div>
												{cosineSimilarity !== null
													? `Cosine Similarity = ${Math.floor(
															cosineSimilarity
													  )}%`
													: ""}
											</div>
											<div>
												{jaccardSimilarity !== null
													? `Jaccard Similarity = ${Math.floor(
															jaccardSimilarity
													  )}%`
													: ""}
											</div>
										</div>
									)}
								</div>
								<div className="flex gap-3 mt-5">
									{plagiarism === "Plagiarism Detected" ? (
										<button className="hover:scale-105 transition-transform duration-300 ease-in-out bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded shadow-lg">
											Save
										</button>
									) : (
										<button
											onClick={() => {
												setUpdatedProject(
													project.proposal_cosine = cosineSimilarity
												);
												handleSave;
											}}
											className="hover:scale-105 transition-transform duration-300 ease-in-out bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded shadow-lg"
										>
											Save
										</button>
									)}
									<button
										onClick={handleUploadModalClose}
										className="hover:scale-105 transition-transform duration-300 ease-in-out bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded shadow-lg"
									>
										Close
									</button>
								</div>
							</div>
						</div>
					)}
				</div>
			) : (
				<p>Loading...</p>
			)}
		</div>
	);
};

export default Project;
