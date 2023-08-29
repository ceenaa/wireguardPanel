// react
import React from 'react';
import { useNavigate } from 'react-router-dom';

// icons
import { AiFillApi, AiFillPhone } from 'react-icons/ai';
import { TbAccessPoint } from 'react-icons/tb';
import { BsDatabaseFillExclamation } from 'react-icons/bs';
import { MdEmail, MdUpdateDisabled } from 'react-icons/md';
import { CgRename, CgCalendarDates } from 'react-icons/cg';

// react hook form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// axios
import { postNewPeer } from '../../services/Axios/Requests/System/createNewPeer';

// redux
import { useDispatch } from 'react-redux';
import { getPeersFromServer } from '../../services/Redux/Slices/Peers';

// react toastify
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

// components
import { systemNewPeerSchema } from '../../services/Yup/newPeerAuth';

// new peer
function NewPeer() {
	// navigator
	const navigate = useNavigate();

	// redux dispatch hook
	const dispatch = useDispatch();

	// close modal handler
	const closeModalHandler = () => navigate('/');

	// form handler
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset
	} = useForm({
		resolver: yupResolver(systemNewPeerSchema),
		mode: 'onBlur'
	});

	// jsx
	return (
		<>
			<div className="absolute top-0 z-0 flex h-screen w-screen items-center justify-center backdrop-blur-sm">
				<div className="absolute -z-0 h-full w-full" onClick={closeModalHandler}></div>
				<div className="z-10 h-auto w-auto overflow-scroll rounded-3xl bg-slate-800 p-10">
					<span className="block w-full select-none text-center font-Lalezar text-2xl text-slate-300">
						Create New Peer
					</span>
					<form
						className="flex flex-col gap-y-5 pt-5"
						onSubmit={handleSubmit((data) => {
							postNewPeer(data)
								.then(() => {
									dispatch(getPeersFromServer());
									// show success toast
									toast.success('New Peer Created ✅', {
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
								})
								.catch(() => {
									// show error toast
									toast.error('Create New Peer Failed ❌', {
										position: 'bottom-right',
										autoClose: 5000,
										hideProgressBar: false,
										closeOnClick: true,
										pauseOnHover: true,
										draggable: true,
										progress: undefined,
										onClose: () => {
											// reset form values
											reset();
										}
									});
								});
						})}
					>
						{/* name */}
						<div className="flex gap-x-4">
							<div className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-slate-700 p-[7px]">
								<CgRename className="h-5 w-5 text-slate-300" />
							</div>
							<input
								className={`h-[50px] w-[500px] rounded-3xl bg-slate-700 px-5 text-xl font-bold tracking-tight text-slate-50 outline-none placeholder:tracking-tight placeholder:text-slate-300 focus:shadow-box ${
									errors.name ? 'shadow-md shadow-red-500/75' : ''
								}`}
								placeholder="Name"
								type="text"
								{...register('name')}
							/>
						</div>
						{/* phone */}
						<div className="flex gap-x-4">
							<div className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-slate-700 p-[7px]">
								<AiFillPhone className="h-5 w-5 text-slate-300" />
							</div>
							<input
								className={`h-[50px] w-[500px] rounded-3xl bg-slate-700 px-5 text-xl font-bold tracking-tight text-slate-50 outline-none placeholder:tracking-tight placeholder:text-slate-300 focus:shadow-box ${
									errors.phone ? 'shadow-md shadow-red-500/75' : ''
								}`}
								placeholder="Phone"
								type="tel"
								{...register('phone')}
							/>
						</div>
						{/* allowed ip */}
						<div className="flex gap-x-4">
							<div className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-slate-700 p-[7px]">
								<AiFillApi className="h-5 w-5 text-slate-300" />
							</div>
							<textarea
								placeholder="Allowed IP"
								className={`w-[500px] rounded-3xl bg-slate-700 px-5 pt-2 text-xl font-bold tracking-tight text-slate-50 outline-none placeholder:tracking-tight placeholder:text-slate-300 focus:shadow-box ${
									errors.allowed_ip ? 'shadow-md shadow-red-500/75' : ''
								}`}
								{...register('allowed_ip')}
								rows="3"
							></textarea>
						</div>
						{/* config end point */}
						<div className="flex gap-x-4">
							<div className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-slate-700 p-[7px]">
								<TbAccessPoint className="h-5 w-5 text-slate-300" />
							</div>
							<textarea
								placeholder="Config End Point"
								className={`w-[500px] rounded-3xl bg-slate-700 px-5 pt-2 text-xl font-bold tracking-tight text-slate-50 outline-none placeholder:tracking-tight placeholder:text-slate-300 focus:shadow-box ${
									errors.allowed_ip ? 'shadow-md shadow-red-500/75' : ''
								}`}
								{...register('config_end_point')}
								rows="3"
							></textarea>
						</div>
						{/* data limit */}
						<div className="flex gap-x-4">
							<div className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-slate-700 p-[7px]">
								<BsDatabaseFillExclamation className="h-5 w-5 text-slate-300" />
							</div>
							<input
								className={`h-[50px] w-[500px] rounded-3xl bg-slate-700 px-5 text-xl font-bold tracking-tight text-slate-50 outline-none placeholder:tracking-tight placeholder:text-slate-300 focus:shadow-box ${
									errors.data_limit ? 'shadow-md shadow-red-500/75' : ''
								}`}
								placeholder="Data Limit"
								type="text"
								{...register('data_limit')}
							/>
						</div>
						{/* email */}
						<div className="flex gap-x-4">
							<div className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-slate-700 p-[7px]">
								<MdEmail className="h-5 w-5 text-slate-300" />
							</div>
							<input
								className={`h-[50px] w-[500px] rounded-3xl bg-slate-700 px-5 text-xl font-bold tracking-tight text-slate-50 outline-none placeholder:tracking-tight placeholder:text-slate-300 focus:shadow-box ${
									errors.email ? 'shadow-md shadow-red-500/75' : ''
								}`}
								placeholder="Email"
								type="text"
								{...register('email')}
							/>
						</div>
						{/* buy date */}
						<div className="flex gap-x-4">
							<div className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-slate-700 p-[7px]">
								<CgCalendarDates className="h-5 w-5 text-slate-300" />
							</div>
							<input
								className={`h-[50px] w-[500px] rounded-3xl bg-slate-700 px-5 text-xl font-bold tracking-tight text-slate-50 outline-none placeholder:tracking-tight placeholder:text-slate-300 focus:shadow-box ${
									errors.buy_date ? 'shadow-md shadow-red-500/75' : ''
								}`}
								type="date"
								{...register('buy_date')}
							/>
						</div>
						{/* expire date */}
						<div className="flex gap-x-4">
							<div className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-slate-700 p-[7px]">
								<MdUpdateDisabled className="h-5 w-5 text-slate-300" />
							</div>
							<input
								className={`h-[50px] w-[500px] rounded-3xl bg-slate-700 px-5 text-xl font-bold tracking-tight text-slate-50 outline-none placeholder:tracking-tight placeholder:text-slate-300 focus:shadow-box ${
									errors.expire_date ? 'shadow-md shadow-red-500/75' : ''
								}`}
								type="date"
								{...register('expire_date')}
							/>
						</div>
						{/* submit button */}
						<button
							className="h-[50px] w-[100px] self-center rounded-3xl bg-slate-700 pt-1 text-center font-Lalezar text-2xl transition-all hover:bg-slate-600 hover:shadow-box"
							type="submit"
						>
							Create
						</button>
					</form>
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
export default NewPeer;
