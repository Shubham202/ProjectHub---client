import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

interface LandingBaseProps {
	auth: () => boolean;
}

const LandingBase: React.FC<LandingBaseProps> = ({ auth }) => {
	if (!auth()) window.location.href = "/login";

	return (
		<>
			<Navbar />
			<main className="max-w-screen-2xl mx-auto bg-[#FFFFFF]">
				<Outlet />
			</main>
		</>
	);
};

export default LandingBase;
