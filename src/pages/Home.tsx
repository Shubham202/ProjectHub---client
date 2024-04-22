import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import Searchbar from "../components/Searchbar";

interface CardData {
	id: number;
	project_name: string;
	project_status: string;
	proposal_status: string;
	report_status: string;
	overview: string;
}

const Home: React.FC = () => {
	const [cardData, setCardData] = useState<CardData[]>([]);

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		try {
			const response = await fetch("http://localhost:5000/projects");
			if (!response.ok) {
				throw new Error("Failed to fetch data");
			}
			const data: { projects: CardData[] } = await response.json();
			setCardData(data.projects);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	return (
		<div>
			<div className="flex justify-center my-10">
				<Searchbar />
			</div>
			<div className="grid grid-cols-3 justify-center w-fit m-auto gap-10">
				{cardData.map((card: CardData) => (
					<Card data={card} key={card.id} />
				))}
			</div>
		</div>
	);
};

export default Home;
