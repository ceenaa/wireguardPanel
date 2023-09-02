// react
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// redux
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getPeerFromServer } from '../../services/Redux/Slices/Peers';

// react hook form
import { useForm } from 'react-hook-form';

// icons
import { AiFillApi, AiFillPhone } from 'react-icons/ai';
import { TbAccessPoint } from 'react-icons/tb';
import { BsDatabaseFillExclamation } from 'react-icons/bs';
import { MdEmail, MdUpdateDisabled } from 'react-icons/md';
import { CgRename, CgCalendarDates } from 'react-icons/cg';

// yup
import { yupResolver } from '@hookform/resolvers/yup';
import { systemNewPeerSchema } from '../../services/Yup/newPeerAuth';
import { putNewPeer } from '../../services/Axios/Requests/Peer/updatePeer';

// react toastify
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { getSystemInfosFromServer } from '../../services/Redux/Slices/System';
import { deletePeer } from '../../services/Axios/Requests/Peer/deletePeer';
import { postPausePeer } from '../../services/Axios/Requests/peer/pausePeer';
import { postResumePeer } from '../../services/Axios/Requests/Peer/resumePeer';

// new peer
function NewPeer() {
	// navigator
	const navigate = useNavigate();

	// close modal handler
	const closeModalHandler = () => navigate('/');

	// url params
	const { peerName } = useParams();

	// show success toast
	const throwSuccessToast = (message) =>
		toast.success(`${message} ✅`, {
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
				dispatch(getSystemInfosFromServer());
				setTimeout(() => {
					// navigate to panel
					closeModalHandler();

					// reset form values
					reset();
				}, 2500);
			}
		});

	// show error toast
	const throwErrorToast = (message) =>
		toast.error(`${message} ❌`, {
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

	// redux dispatch hook
	const dispatch = useDispatch();

	// peer information
	const peerDetails = useSelector((state) => state.peers);

	// mounting side effects
	useEffect(() => {
		dispatch(getPeerFromServer(peerName));
	}, []);

	// set default values for form
	useEffect(() => {
		if (peerDetails)
			reset({
				name: peerDetails.name,
				phone: peerDetails.phone,
				allowed_ip: peerDetails.allowed_ip,
				allowed_port: peerDetails.allowed_port,
				config_end_point: peerDetails.config_end_point,
				data_limit: peerDetails.data_limit,
				email: peerDetails.email,
				buy_date: peerDetails.buy_date,
				expire_date: peerDetails.expire_date
			});
	}, [peerDetails]);

	// react hook form
	const {
		handleSubmit,
		register,
		reset,
		getValues,
		formState: { errors }
	} = useForm({
		mode: 'onBlur',
		resolver: yupResolver(systemNewPeerSchema)
	});

	// update peer handler
	const updatePeer = () => {
		const newPeerData = getValues();

		newPeerData.data_limit = +newPeerData.data_limit;

		putNewPeer(peerName, newPeerData)
			.then(() => throwSuccessToast('Peer Updated Successfully'))
			.catch(() => throwErrorToast('Peer Update Failed'));
	};

	// delete peer handler
	const deletePeerHandler = () => {
		deletePeer(peerName)
			.then(() => throwSuccessToast('Peer Deleted Successfully'))
			.catch(() => throwErrorToast('Peer Delete Failed'));
	};

	// pause peer handler
	const pausePeer = () => {
		postPausePeer(peerName)
			.then(() => throwSuccessToast('Peer Paused Successfully'))
			.catch(() => throwErrorToast('Peer Pause Failed'));
	};

	// resume peer handler
	const resumePeer = () => {
		postResumePeer(peerName)
			.then(() => throwSuccessToast('Peer Resumed Successfully'))
			.catch(() => throwErrorToast('Peer Resume Failed'));
	};

	// reset peer handler
	const resetPeer = () => {
		console.log('reset');
	};

	// jsx
	return (
		<>
			<div className="absolute top-0 z-0 flex h-screen w-screen items-center justify-center backdrop-blur-sm">
				<div className="absolute -z-0 h-full w-full" onClick={closeModalHandler}></div>
				<div className="z-10 h-auto w-auto rounded-3xl bg-slate-800 p-10">
					<span className="block w-full select-none text-center font-Lalezar text-2xl text-slate-300">
						Peer Details
					</span>
					<form className="flex flex-col gap-y-5 pt-5" onSubmit={handleSubmit(() => null)}>
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
						{/* submit buttons */}
						<div className="mt-5 flex items-center justify-between">
							<button
								className="h-[50px] w-[100px] self-center rounded-3xl bg-orange-500 pt-1 text-center font-Lalezar text-2xl transition-all hover:bg-orange-600 hover:shadow-box"
								type="submit"
								onClick={updatePeer}
							>
								Update
							</button>
							<button
								className="h-[50px] w-[100px] self-center rounded-3xl bg-red-500 pt-1 text-center font-Lalezar text-2xl transition-all hover:bg-red-600 hover:shadow-box"
								type="submit"
								onClick={deletePeerHandler}
							>
								Delete
							</button>
							<button
								className="h-[50px] w-[100px] self-center rounded-3xl bg-sky-500 pt-1 text-center font-Lalezar text-2xl transition-all hover:bg-sky-600 hover:shadow-box"
								type="submit"
								onClick={pausePeer}
							>
								Pause
							</button>
							<button
								className="h-[50px] w-[100px] self-center rounded-3xl bg-lime-500 pt-1 text-center font-Lalezar text-2xl transition-all hover:bg-lime-600 hover:shadow-box"
								type="submit"
								onClick={resumePeer}
							>
								Resume
							</button>
							<button
								className="h-[50px] w-[100px] self-center rounded-3xl bg-teal-500 pt-1 text-center font-Lalezar text-2xl transition-all hover:bg-teal-600 hover:shadow-box"
								type="submit"
								onClick={resetPeer}
							>
								Reset
							</button>
						</div>
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
