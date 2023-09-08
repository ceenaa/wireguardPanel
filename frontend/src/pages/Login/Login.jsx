// react
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// styles
import 'react-toastify/dist/ReactToastify.css';

// packages
import { FaUserAlt, FaLock } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';

// components
import { userLogin } from '../../services/Axios/Requests/User/userLogin';

// login
function Login() {
	// form handler
	const { register, handleSubmit, reset } = useForm();

	// set submit button disabled
	const [isDisable, setIsDisable] = useState(false);

	// navigator
	const navigate = useNavigate();

	// transition handler
	const [isLoad, setIsLoad] = useState(true);
  
	// mounting side effects
	useEffect(() => {
		// change document title
		document.title = 'Wireguard Panel - Login';
	}, []);

	// jsx
	return (
		<div className="flex h-screen items-center justify-center">
			{/* container */}
			<div
				className={`flex h-auto w-[700px] flex-col items-center justify-between gap-y-[100px] rounded-3xl bg-slate-900 p-5 shadow-box2 transition-opacity duration-300 ${
					isLoad ? 'opacity-100' : 'opacity-0'
				}`}
			>
				{/* title */}
				<header className="font-Lalezar text-5xl text-slate-300">WireGuard Panel</header>
				{/* inputs */}
				<main>
					{/* form */}
					<form
						className="flex flex-col items-center justify-center gap-y-20"
						onSubmit={handleSubmit((data) => {
							setIsDisable(true);

							userLogin(data)
								.then(() => {
									// show success toast
									toast.success('Login Successful ✅', {
										position: 'bottom-right',
										autoClose: 5000,
										hideProgressBar: false,
										closeOnClick: true,
										pauseOnHover: true,
										draggable: true,
										progress: undefined,
										theme: 'dark',
										progressStyle: { backgroundColor: '#0ea5e9' },
										onOpen: () => {
											setTimeout(() => {
												// navigate to panel
												navigate('/');
											}, 2500);

											setTimeout(() => {
												// transition handler
												setIsLoad(!isLoad);
											}, 2200);
										},
										onClose: () => {
											// enabling submit button
											setIsDisable(false);

											// reset form values
											reset();
										}
									});
								})
								.catch(() =>
									// show error toast
									toast.error('Incorrect Information ❌', {
										position: 'bottom-right',
										autoClose: 5000,
										hideProgressBar: false,
										closeOnClick: true,
										pauseOnHover: true,
										draggable: true,
										progress: undefined,
										onClose: () => {
											// enabling submit button
											setIsDisable(false);

											// reset form values
											reset();
										}
									})
								);
						})}
					>
						{/* username */}
						<div className="flex gap-x-4">
							{/* user icon */}
							<div className="flex h-[70px] w-[70px] items-center justify-center rounded-full bg-slate-700 p-[7px]">
								<FaUserAlt className="h-9 w-9 text-slate-300" />
							</div>
							{/* username input */}
							<input
								className="h-[70px] w-[500px] rounded-3xl bg-slate-700 px-5 text-3xl font-bold tracking-tight text-slate-50 shadow-box outline-none placeholder:text-3xl placeholder:tracking-tight placeholder:text-slate-300"
								placeholder="Username"
								type="text"
								required
								{...register('username')}
							/>
						</div>
						{/* password */}
						<div className="flex gap-x-4">
							{/* lock icon */}
							<div className="flex h-[70px] w-[70px] items-center justify-center rounded-full bg-slate-700 p-[7px]">
								<FaLock className="h-9 w-9 text-slate-300" />
							</div>
							{/* password input  */}
							<input
								className="h-[70px] w-[500px] rounded-3xl bg-slate-700 px-5 text-3xl font-bold tracking-tight text-slate-50 shadow-box outline-none placeholder:text-3xl placeholder:tracking-tight placeholder:text-slate-300"
								placeholder="Password"
								type="password"
								required
								{...register('password')}
							/>
						</div>
						{/* submit button  */}
						<button
							type="submit"
							disabled={isDisable}
							className={`h-[70px] w-[250px] rounded-3xl bg-slate-700 text-4xl font-bold tracking-tight text-slate-300 transition-all delay-100 hover:bg-slate-700/75 hover:shadow-box hover:shadow-slate-700/25 ${
								isDisable
									? 'animate-bounce bg-yellow-700 hover:bg-yellow-700 hover:shadow-none'
									: null
							}`}
						>
							{!isDisable ? 'Login' : 'Loading ⏳'}
						</button>
					</form>
				</main>
				{/* footer */}
				<footer className="font-Lalezar text-slate-200">
					Developed with 💙 by
					<Link
						className="m-1.5 text-lg text-sky-700 transition-colors hover:text-sky-600"
						to="https://github.com/MAwasTaken"
						target="_blank"
					>
						MAwasTaken
					</Link>
					and
					<Link
						className="m-1.5 text-lg text-sky-700 transition-colors hover:text-sky-600"
						to="https://github.com/ceenaa"
						target="_blank"
					>
						Ceenaa
					</Link>
					on
					<Link
						className="m-1.5 text-lg text-sky-700 transition-colors hover:text-sky-600"
						to="https://github.com/ceenaa/wireguardPannel"
						target="_blank"
					>
						GitHub
					</Link>
				</footer>
			</div>
			{/* react toastify container */}
			<ToastContainer
				position="bottom-right"
				autoClose={4000}
				hideProgressBar={false}
				newestOnTop
				closeOnClick={false}
				rtl={false}
				pauseOnFocusLoss
				draggable={false}
				pauseOnHover
				theme="dark"
				toastStyle={{ backgroundColor: '#111827' }}
			/>
		</div>
	);
}

// exports
export default Login;
