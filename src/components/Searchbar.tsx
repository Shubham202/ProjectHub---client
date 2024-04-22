import { useState } from "react";
import search from "../assets/svg/search.svg";

const Searchbar: React.FC = () => {
	const [name, setName] = useState<string | undefined>("");

	return (
		<div className="flex items-center border shadow-lg rounded p-5 hover:scale-105 transition-transform duration-300 ease-in-out">
			<input
				value={name}
				onChange={e => setName(e.target.value)}
				className="w-[500px] outline-none"
				type="text"
				placeholder="Search Projects"
			/>
			<button onClick={() => console.log(name)}>
				<img className="w-5 cursor-pointer" src={search} alt="search" />
			</button>
		</div>
	);
};

export default Searchbar;
