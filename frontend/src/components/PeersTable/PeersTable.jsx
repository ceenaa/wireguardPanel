// react
import React from 'react';

// icons
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';
import { AiOutlineApi } from 'react-icons/ai';
import { PiPlugsConnectedLight } from 'react-icons/pi';
import { MdWifiTethering } from 'react-icons/md';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { setStatus } from '../../services/Redux/Slices/Status';
import { setSort } from '../../services/Redux/Slices/Sort';

// components
import PeersTableItem from '../PeersTableItem/PeersTableItem';

// peers table
function PeersTable({ peers }) {
	// redux dispatch hook
	const dispatch = useDispatch();

	// status plan
	let status = useSelector((state) => state.status);

	// sort plan
	let sort = useSelector((state) => state.sort);

	// change status plan when clicking status button
	const statusHandler = (e) => {
		e.stopPropagation();

		if (status.count === 0) dispatch(setStatus({ value: 'enable', count: 1 }));
		else if (status.count === 1) dispatch(setStatus({ value: 'disable', count: 2 }));
		else if (status.count === 2) dispatch(setStatus({ value: '', count: 0 }));
	};

	// change sort plan when clicking status tr
	const expireDateHandler = () => {
		if (sort.value === 'usage') dispatch(setSort({ value: 'expire_date', order: 'asc' }));
		else if (sort.value === 'expire_date' && sort.order === 'asc')
			dispatch(setSort({ value: 'expire_date', order: 'desc' }));
		else if (sort.value === 'expire_date' && sort.order === 'desc')
			dispatch(setSort({ value: 'expire_date', order: 'asc' }));
	};

	// change sort plan when clicking data usage tr
	const usageHandler = () => {
		if (sort.value === 'expire_date') dispatch(setSort({ value: 'usage', order: 'asc' }));
		else if (sort.value === 'usage' && sort.order === 'asc')
			dispatch(setSort({ value: 'usage', order: 'desc' }));
		else if (sort.value === 'usage' && sort.order === 'desc')
			dispatch(setSort({ value: 'expire_date', order: 'asc' }));
	};

	// jsx
	return (
		<table className="mb-10 w-full table-auto overflow-auto rounded-3xl shadow-table shadow-slate-300">
			<thead className="h-[72px] rounded-t-2xl border-b-2 border-b-slate-300 bg-slate-900 p-2">
				<tr className="child:font-Lalezar child:text-3xl child:leading-[72px]">
					<th className="rounded-tl-3xl">User Name</th>
					<th
						className={`relative w-[400px] cursor-pointer select-none transition-all hover:shadow-box child:transition-all child:delay-100 child:hover:block child:hover:opacity-100 ${
							sort.value === 'expire_date' ? 'bg-slate-800' : ''
						}`}
						onClick={expireDateHandler}
					>
						Status
						<div className="absolute left-[90px] top-4">
							{status.value === 'disable' ? (
								<div
									className="flex h-[40px] w-[40px] items-center justify-center rounded-lg bg-slate-700 shadow-box transition-all"
									onClick={(e) => statusHandler(e)}
								>
									<AiOutlineApi className="h-8 w-8 rounded-xl text-red-500" />
								</div>
							) : status.value === 'enable' ? (
								<div
									className="flex h-[40px] w-[40px] items-center justify-center rounded-lg bg-slate-700 shadow-box transition-all"
									onClick={statusHandler}
								>
									<PiPlugsConnectedLight className="h-8 w-8 rounded-xl text-green-500" />
								</div>
							) : status.value === '' ? (
								<div
									className="flex h-[40px] w-[40px] items-center justify-center rounded-lg bg-slate-700 transition-all hover:shadow-box"
									onClick={statusHandler}
								>
									<MdWifiTethering className="h-8 w-8 rounded-xl text-slate-400" />
								</div>
							) : null}
						</div>
						<div className="absolute right-[120px] top-4">
							{sort.value === 'expire_date' && sort.order === 'asc' ? (
								<BiChevronDown className="h-9 w-9 text-slate-400" />
							) : sort.value === 'expire_date' && sort.order === 'desc' ? (
								<BiChevronUp className="h-9 w-9 text-slate-400" />
							) : null}
						</div>
					</th>
					<th
						className={`relative w-[440px] cursor-pointer select-none transition-all child:transition-all child:delay-100 child:hover:block child:hover:opacity-100 ${
							sort.value === 'usage' ? 'bg-slate-800' : ''
						}`}
						onClick={usageHandler}
					>
						Data Usage
						<div className="absolute right-[120px] top-4">
							{sort.value === 'usage' && sort.order === 'asc' ? (
								<BiChevronDown className="h-9 w-9 text-slate-400" />
							) : sort.value === 'usage' && sort.order === 'desc' ? (
								<BiChevronUp className="h-9 w-9 text-slate-400" />
							) : null}
						</div>
					</th>
					<th className="w-[190px] rounded-tr-3xl"></th>
				</tr>
			</thead>
			<tbody className="divide-y-2 divide-sky-700">
				{peers.length ? (
					peers.map((peer, index) => (
						<PeersTableItem
							key={index}
							peerName={peer.Name}
							isActive={peer.IsActive}
							remainingDays={Math.floor(
								Math.abs(new Date() - new Date(peer.ExpireDate)) / 1000 / 60 / 60 / 24
							)}
							dataLimit={peer.DataLimit}
							remainingUsage={peer.Usage}
						/>
					))
				) : (
					<tr className="relative h-[114px] w-full divide-x-2 divide-slate-300 text-center text-2xl leading-[114px]">
						<td className="absolute right-1/2 translate-x-1/2 font-bold text-slate-300">
							No Peer Found !
						</td>
					</tr>
				)}
			</tbody>
		</table>
	);
}

// exports
export default PeersTable;
