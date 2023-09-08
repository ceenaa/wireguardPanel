// react
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

// styles
import 'react-toastify/dist/ReactToastify.css';

// packages
import { BiLogOut } from 'react-icons/bi';
import { FaExchangeAlt } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';

// components
import { userLogout } from '../../services/Axios/Requests/User/userLogout';

// system
function System({ systemName, systemStartedDate }) {
	// navigator
	const navigate = useNavigate();

	// logout when clicking logout button
	const logoutHandler = () => {
		// remove system name from local storage
		localStorage.removeItem('system-name');

    // logout user
		userLogout()
			.then(() => {
				// show success toast
				toast.success('Logout Successful ✅', {
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
							navigate('/login');
						}, 2500);
					}
				});
			})
			.catch(() => {
				// show error toast
				toast.error('Logout Failed ❌', {
					position: 'bottom-right',
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: 'dark',
					progressStyle: { backgroundColor: '#0ea5e9' }
				});
			});
	};

	// jsx
	return (
		<>
			{/* header */}
			<header className="flex items-center justify-between pt-10">
				{/* system name */}
				<div className="flex items-center justify-between gap-x-5">
					<Link
						to="/system"
						className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-slate-700 transition-colors hover:bg-slate-600 hover:shadow-box"
					>
						<FaExchangeAlt className="h-[25px] w-[25px] text-slate-300" />
					</Link>
					<h1 className="font-Lalezar text-4xl text-slate-50">{systemName}</h1>
					<span className="text-slate-200">- {systemStartedDate}</span>
				</div>
				{/* logout button */}
				<button
					onClick={logoutHandler}
					className="relative h-[50px] w-[50px] cursor-pointer rounded-full bg-slate-700 transition-colors hover:bg-slate-600 hover:shadow-box"
				>
					<BiLogOut className="absolute right-[11px] top-[7px] h-9 w-9 text-slate-300" />
				</button>
			</header>
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
		</>
	);
}

// exports
export default System;
