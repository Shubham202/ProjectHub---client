const AdminLogin: React.FC = () => {
    return (
		<div className="flex min-h-[100vh] flex-1 flex-col justify-center px-6 py-12 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-sm">
				<div className="font-pacifico text-center text-5xl">
					ProjectHub
				</div>
			</div>

            <div className="text-center my-10 text-red-500 font-semibold">Admin Login</div>

			<div className="sm:mx-auto sm:w-full sm:max-w-sm">
				<form className="space-y-16" action="#" method="POST">
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
}
 
export default AdminLogin;