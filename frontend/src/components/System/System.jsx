// react
import React from 'react';
import { useNavigate } from 'react-router-dom';

// styles
import 'react-toastify/dist/ReactToastify.css';

// packages
import { BiLogOut } from 'react-icons/bi';
import { ToastContainer, toast } from 'react-toastify';

// components
import { userLogout } from '../../services/Axios/Requests/user/userLogout';

// system
function System() {
	// navigator
	const navigate = useNavigate();

	// logout when clicking logout button
	const logoutHandler = () => {
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
				<div className="flex items-center gap-x-2">
					<h1 className="font-Lalezar text-4xl text-slate-50">System Name</h1>
					<span className="text-slate-200">- 0000/00/00</span>
				</div>
				{/* logout button */}
				<div
					onClick={logoutHandler}
					className="relative h-[50px] w-[50px] cursor-pointer rounded-full bg-slate-700"
				>
					<BiLogOut className="absolute right-[11px] top-[7px] h-9 w-9 text-slate-300" />
				</div>
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
