// react
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// icons
import { BsBoxes } from 'react-icons/bs';

// axios
import { getSystemList } from '../../services/Axios/Requests/System/systemList';

// react toastify
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

// new peer
function SystemList() {
	// navigator
	const navigate = useNavigate();

	// transition handler
	const [isLoad, setIsLoad] = useState(false);

	// close modal handler
	const closeModalHandler = () => {
		// transition handler
		setIsLoad(!isLoad);

		// navigate to panel
		setTimeout(() => {
			navigate('/');
			document.title = 'Wireguard Panel - Panel';
		}, 300);
	};

	// system list
	const [systems, setSystems] = useState([]);

	// mounting side effects
	useEffect(() => {
		// change document title
		document.title = 'Wireguard Panel - System';

		// GET system list
		getSystemList().then((res) => setSystems(res.data));

		// load transition
		setIsLoad(true);
	}, []);

	// jsx
	return (
		<>
			<div
				className={`absolute top-0 z-0 flex h-screen w-screen items-center justify-center backdrop-blur-sm transition-opacity duration-300 ${
					isLoad ? 'opacity-100' : 'opacity-0'
				}`}
			>
				<div className="absolute -z-0 h-full w-full" onClick={closeModalHandler}></div>
				<div className="z-10 h-auto w-[566px] overflow-scroll rounded-3xl bg-slate-800 p-10">
					<span className="relative block w-full select-none items-center justify-center gap-x-5 text-center font-Lalezar text-3xl text-slate-300">
						<BsBoxes className="absolute left-32 top-[2px]" />
						System List
					</span>
					<div className="mt-10 flex justify-evenly">
						{systems.map((system, index) => (
							<button
								className="h-[50px] rounded-xl bg-slate-700 px-5 font-Lalezar text-xl transition-all hover:bg-slate-600 hover:shadow-box"
								key={index}
								onClick={() => {
									// set system name on local storage
									localStorage.setItem('system-name', system);

									// show success toast
									toast.success('System Name Changed ✅', {
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
												closeModalHandler();

												// reset form values
												reset();
											}, 2500);
										}
									});

									// close modal
									closeModalHandler();
								}}
							>
								{system}
							</button>
						))}
					</div>
				</div>
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
		</>
	);
}

// exports
export default SystemList;
