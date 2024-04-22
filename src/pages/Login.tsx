import React, { useState } from "react";
import { connect, ConnectedProps } from "react-redux";

type PropsFromRedux = ConnectedProps<typeof connector>;

const Login: React.FC<PropsFromRedux> = ({ dispatch }) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = async (event: React.FormEvent) => {
		event.preventDefault();
		dispatch({ type: "LOGIN", payload: { username, password } });

		const apiUrl = "http://127.0.0.1:5000/login";

		try {
			const response = await fetch(apiUrl, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${localStorage.getItem("token")}`
				},
				body: JSON.stringify({
					username,
					password
				})
			});

			if (response.ok) {
				const { token, user_id } = await response.json();
				localStorage.setItem("token", token);
				localStorage.setItem("user_id", user_id);
				console.log("Login successful");
				window.location.href = "/";
			} else {
				alert("Login failed");
			}
		} catch (error) {
			console.error("Error during login:", error);
		}
	};

	return (
		<div className="flex min-h-[100vh] flex-1 flex-col justify-center px-6 py-12 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-sm">
				<div className="font-pacifico text-center text-5xl">
					ProjectHub
				</div>
			</div>

			<div className="tracking-[4px] text-lg text-center my-10">
				Where ideas meet new height
			</div>

			<div className="sm:mx-auto sm:w-full sm:max-w-sm">
				<form className="space-y-16" onSubmit={handleLogin}>
					<div className="space-y-2">
						<div>
							<label
								htmlFor="username"
								className="block text-sm font-medium leading-6 px-2 text-gray-900"
							>
								Username
							</label>
							<div className="mt-2">
								<input
									id="username"
									name="username"
									type="number"
									autoComplete="username"
									required
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-2"
									onChange={e => setUsername(e.target.value)}
								/>
							</div>
						</div>

						<div>
							<div className="flex items-center justify-between">
								<label
									htmlFor="password"
									className="block text-sm font-medium leading-6 px-2 text-gray-900"
								>
									Password
								</label>
							</div>
							<div className="mt-2">
								<input
									id="password"
									name="password"
									type="password"
									autoComplete="current-password"
									required
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-2"
									onChange={e => setPassword(e.target.value)}
								/>
							</div>
						</div>
					</div>
					<div>
						<button
							type="submit"
							className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus"
						>
							Sign in
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

const connector = connect();
export default connector(Login);
