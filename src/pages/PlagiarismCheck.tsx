/* eslint-disable no-mixed-spaces-and-tabs */
import React, { useState } from "react";

const PlagiarismCheck: React.FC = () => {
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [plagiarism, setPlagiarism] = useState<string | null>(null);
	const [cosineSimilarity, setCosineSimilarity] = useState<number | null>(
		null
	);
	const [jaccardSimilarity, setJaccardSimilarity] = useState<number | null>(
		null
	);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0] || null;
		setPlagiarism(null);
		setSelectedFile(file);
	};

	const handleUpload = () => {
		if (selectedFile) {
			const formData = new FormData();
			formData.append("file", selectedFile);

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
				})
				.catch(error => console.error("Error uploading file:", error));
		}
	};

	return (
		<div className="text-center mt-5">
			<h1 className="text-xl font-semibold">
				Upload PDF to check plagiarism
			</h1>
			<div className="flex flex-col items-center">
				<label
					htmlFor="fileInput"
					className="my-10 py-10 px-20 rounded cursor-pointer border-dashed border-gray-700 border text-gray-700 text-lg"
				>
					{selectedFile ? selectedFile.name : "Choose a file"}
				</label>
				<input
					type="file"
					id="fileInput"
					accept=".pdf"
					onChange={handleFileChange}
					className="hidden"
				/>{" "}
				<button
					className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out"
					onClick={handleUpload}
				>
					Check
				</button>
			</div>
			<div className="my-10 text-3xl">{plagiarism}</div>
			{plagiarism === "Plagiarism Detected" && (
				<div>
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
	);
};

export default PlagiarismCheck;
