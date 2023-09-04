// react
import React, { useState } from 'react';

// packages
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';

// components
import PeersTableItem from '../PeersTableItem/PeersTableItem';
import { useDispatch, useSelector } from 'react-redux';
import { searchByStatus } from '../../services/Redux/Slices/Sort';

// peers table
function PeersTable({ peers }) {
	// redux dispatch hook
	const dispatch = useDispatch();

	// sort helper
	const [currentFilter, setCurrentFilter] = useState('');

	// filter handler
	const filterHandler = (type) => {
		if (currentFilter === type) {
			dispatch(searchByStatus(`REVERSED - ${type}`));
			setCurrentFilter(`REVERSED - ${type}`);
		} else {
			dispatch(searchByStatus(type));
			setCurrentFilter(type);
		}
	};

	// filter peers
	const filteredPeers = peers.filter((peer) =>
		peer.Name.includes(useSelector((state) => state.search))
	);

	// sorted peers initializing
	let sortedPeers = filteredPeers;

	// sort filter
	let sortPlan = useSelector((state) => state.sort);

	// sorting handler
	if (sortPlan === 'STATUS') sortedPeers = filteredPeers.filter((peer) => peer.IsActive);
	else if (sortPlan === 'REVERSED - STATUS')
		sortedPeers = filteredPeers.filter((peer) => !peer.IsActive);
	else if (sortPlan === 'DATA')
		sortedPeers = filteredPeers.sort((peer1, peer2) => peer1.Usage - peer2.Usage);
	else if (sortPlan === 'REVERSED - DATA')
		sortedPeers = filteredPeers.sort((peer1, peer2) => peer2.Usage - peer1.Usage);

	// jsx
	return (
		<table className="mb-10 w-full table-auto overflow-auto rounded-3xl shadow-table shadow-slate-300">
			<thead className="h-[72px] rounded-t-2xl border-b-2 border-b-slate-300 bg-slate-900 p-2">
				<tr className="child:font-Lalezar child:text-3xl child:leading-[72px]">
					<th className="rounded-tl-3xl">User Name</th>
					<th
						className={`relative w-[400px] cursor-pointer transition-all hover:bg-slate-800 hover:shadow-box child:opacity-0 child:transition-all child:delay-100 child:hover:block child:hover:opacity-100 ${
							(useSelector((state) => state.sort) === 'STATUS') |
							(useSelector((state) => state.sort) === 'REVERSED - STATUS')
								? 'bg-slate-800 shadow-box child:block child:opacity-100'
								: ''
						}`}
						onClick={() => filterHandler('STATUS')}
					>
						Status
						<div className="absolute right-[120px] top-4">
							{useSelector((state) => state.sort) === 'REVERSED - STATUS' ? (
								<BiChevronUp className="h-9 w-9 text-slate-400" />
							) : (
								<BiChevronDown className="h-9 w-9 text-slate-400" />
							)}
						</div>
					</th>
					<th
						className={`relative w-[440px] cursor-pointer transition-all hover:bg-slate-800 hover:shadow-box child:opacity-0 child:transition-all child:delay-100 child:hover:block child:hover:opacity-100 ${
							(useSelector((state) => state.sort) === 'DATA') |
							(useSelector((state) => state.sort) === 'REVERSED - DATA')
								? 'bg-slate-800 shadow-box child:block child:opacity-100'
								: ''
						}`}
						onClick={() => filterHandler('DATA')}
					>
						Data Usage
						<div className="absolute right-[120px] top-4">
							{useSelector((state) => state.sort) === 'REVERSED - DATA' ? (
								<BiChevronUp className="h-9 w-9 text-slate-400" />
							) : (
								<BiChevronDown className="h-9 w-9 text-slate-400" />
							)}
						</div>
					</th>
					<th className="w-[190px] rounded-tr-3xl"></th>
				</tr>
			</thead>
			<tbody className="divide-y-2 divide-sky-700">
				{sortedPeers.length ? (
					sortedPeers.map((peer, index) => (
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
