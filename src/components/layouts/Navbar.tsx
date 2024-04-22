import { Link } from "react-router-dom";
import idea from "../../assets/svg/idea.svg";
import video from "../../assets/svg/video.svg";

const Navbar: React.FC = () => {
	return (
		<nav className="flex items-center justify-between py-5 px-10 ">
			<div className="flex items-center gap-10">
				<Link to={"/"} className="font-pacifico text-center text-4xl">
					ProjectHub
				</Link>
				<div className="flex items-center gap-2 cursor-pointer">
					<img className="w-5 -mt-1" src={idea} alt="idea" />
					<span>How to come up with ideas</span>
				</div>
				<div className="flex items-center gap-2 cursor-pointer">
					<img className="w-5" src={video} alt="video" />
					<span>Project demostration videos</span>
				</div>
			</div>
			<div className="flex items-center gap-5">
				<Link
					to={"/check-plagiarism"}
					className="hover:scale-105 transition-transform duration-300 ease-in-out bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded shadow-lg"
				>
					Check Plagiarism
				</Link>
				<Link
					to={"/projects"}
					className="hover:scale-105 transition-transform duration-300 ease-in-out bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded shadow-lg"
				>
					My projects
				</Link>
				<Link
					onClick={() => localStorage.removeItem("token")}
					to={"/login"}
					className="hover:scale-105 transition-transform duration-300 ease-in-out bg-gray-400 hover:bg-gray-600 text-white px-4 py-2 rounded shadow-lg"
				>
					Logout
				</Link>
			</div>
		</nav>
	);
};

export default Navbar;
