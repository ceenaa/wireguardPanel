// react
import React from 'react';

// icons
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { pageDecrement, pageIncrement } from '../../services/Redux/Slices/Page';
import { setPage } from '../../services/Redux/Slices/PerPage';

// peer pagination
function PeerPagination({ allPeers, activePeers, deActivePeers }) {
	// redux dispatch hook
	const dispatch = useDispatch();

	// GET page from redux
	const page = useSelector((state) => state.page);

	// GET per page from redux
	const perPage = useSelector((state) => state.perPage);

	// jsx
	return (
		<div className="flex items-center justify-between px-16 pb-10">
			<div className="flex items-center justify-center gap-x-3">
				<label className="select-none font-Lalezar text-2xl text-slate-300">Peer Per Page:</label>
				<select
					className="h-[50px] w-[50px] appearance-none rounded-xl bg-slate-700 text-center font-Lalezar text-xl tracking-wider outline-none transition-colors hover:bg-slate-600 hover:shadow-box"
					onChange={(e) => dispatch(setPage(e.target.value))}
					value={useSelector((state) => state.perPage)}
				>
					<option value="10">10</option>
					<option value="20">20</option>
					<option value="30">30</option>
					<option value="50">50</option>
					<option value="100">100</option>
				</select>
			</div>
			<div className="flex items-center">
				<button
					className="flex h-[50px] w-[120px] cursor-pointer select-none items-center justify-center gap-x-3 rounded-l-xl bg-slate-800 px-3 transition-colors hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-white/10"
					onClick={() => dispatch(pageDecrement())}
					disabled={page === 1 ? true : false}
				>
					<BsArrowLeft className="h-5 w-5" />
					Previous
				</button>
				<div className="h-[50px] w-[50px] select-none bg-slate-600 text-center font-Lalezar text-3xl leading-[50px]">
					{page}
				</div>
				<button
					className="flex h-[50px] w-[120px] cursor-pointer select-none items-center justify-center gap-x-3 rounded-r-xl bg-slate-800 px-3 transition-colors hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-white/10"
					onClick={() => dispatch(pageIncrement())}
					disabled={page === Math.ceil(Math.max(allPeers, activePeers, deActivePeers) / perPage)}
				>
					Next
					<BsArrowRight className="h-5 w-5" />
				</button>
			</div>
		</div>
	);
}

// exports
export default PeerPagination;
