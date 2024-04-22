import { Link } from "react-router-dom";

interface CardProps {
	data: {
		id: number;
		project_name: string;
		project_status: string;
		proposal_status: string;
		report_status: string;
		overview: string;
		// video: string;
		// github: string;
		// contact: string;
	};
}

const Card: React.FC<CardProps> = ({ data }) => {
	return (
		<div className="w-[350px] hover:scale-105 transition-transform duration-300 ease-in-out h-full p-5 bg-white rounded shadow-lg border flex-col justify-center gap-10 inline-flex m-auto">
			<div className="flex-col justify-center items-start gap-3 flex">
				<h1 className="text-black text-2xl font-bold font-['Lato']">
					<Link to={`/projects/${data.id}`}>{data.project_name}</Link>
				</h1>
				<div className="text-xs justify-between inline-flex gap-14">
					<div className="flex-col justify-start items-start gap-1 inline-flex">
						<div className="text-black font-semibold font-['Lato']">
							Status
						</div>
						<div className="justify-start items-center gap-2 inline-flex">
							<div className="w-2.5 h-2.5 bg-orange-300 rounded-full" />
							<div className="text-orange-300 font-semibold font-['Lato']">
								{data.project_status}
							</div>
						</div>
					</div>
					<div className="flex-col justify-start items-start gap-1 inline-flex">
						<div className="text-black font-semibold font-['Lato']">
							Proposal
						</div>
						<div className="justify-start items-center gap-2 inline-flex">
							<div className="w-2.5 h-2.5 bg-emerald-300 rounded-full" />
							<div className="text-emerald-300 font-semibold font-['Lato']">
								{data.proposal_status}
							</div>
						</div>
					</div>
					<div className="flex-col justify-start items-start gap-1 inline-flex">
						<div className="text-black font-semibold font-['Lato']">
							Report
						</div>
						<div className="justify-start items-center gap-2 inline-flex">
							<div className="w-2.5 h-2.5 bg-stone-300 rounded-full" />
							<div className="text-stone-300 font-semibold font-['Lato']">
								{data.report_status}
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="text-justify text-black text-sm font-light font-['Lato']">
				{data.overview}
			</div>
			<div className="flex justify-evenly">
				<button className="hover:scale-105 transition-transform duration-300 ease-in-out bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded shadow-lg">
					View Proposal
				</button>
				<button className="hover:scale-105 transition-transform duration-300 ease-in-out bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded shadow-lg">
					View Report
				</button>
			</div>
			{/* <div className="flex-col justify-center items-start gap-5 flex">
				<div className="justify-start items-start gap-2.5 inline-flex">
					<div className="text-black text-sm font-bold font-['Lato']">
						Video Link:
					</div>
					<div className="text-blue-400 text-sm font-normal font-['Lato'] underline">
						{data.video}
					</div>
				</div>
				<div className="justify-start items-start gap-2.5 inline-flex">
					<div className="text-black text-sm font-bold font-['Lato']">
						GitHub Link:
					</div>
					<div className="text-blue-400 text-sm font-normal font-['Lato'] underline">
						{data.github}
					</div>
				</div>
				<div className="justify-start items-start gap-2.5 inline-flex">
					<div className="text-black text-sm font-bold font-['Lato']">
						Contact Link:
					</div>
					<div className="text-blue-400 text-sm font-normal font-['Lato'] underline">
						{data.contact}
					</div>
				</div>
			</div> */}
		</div>
	);
};

export default Card;
