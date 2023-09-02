// react
import React, { useState } from 'react';

// packages
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';

// components
import PeersTableItem from '../PeersTableItem/PeersTableItem';

// peers table
function PeersTable({ peers }) {
	// filter
	const [currentFilter, setCurrentFilter] = useState('');

	// filter handler
	const filterHandler = (type) => {
		if (currentFilter === type) setCurrentFilter(`reversed${type}`);
		else setCurrentFilter(type);
	};

	// jsx
	return (
		<table className="mb-10 w-full table-auto overflow-auto rounded-3xl shadow-table shadow-slate-300">
			<thead className="h-[72px] rounded-t-2xl border-b-2 border-b-slate-300 bg-slate-900 p-2">
				<tr className="child:font-Lalezar child:text-3xl child:leading-[72px]">
					<th className="rounded-tl-3xl">User Name</th>
					<th
						className={`relative w-[400px] cursor-pointer transition-all hover:bg-slate-800 hover:shadow-box child:opacity-0 child:transition-all child:delay-100 child:hover:block child:hover:opacity-100 ${
							(currentFilter === 'STATUS') | (currentFilter === 'reversedSTATUS')
								? 'bg-slate-800 shadow-box child:block child:opacity-100'
								: ''
						}`}
						onClick={() => filterHandler('STATUS')}
					>
						Status
						<div className="absolute right-[120px] top-4">
							{currentFilter === 'reversedSTATUS' ? (
								<BiChevronUp className="h-9 w-9 text-slate-400" />
							) : (
								<BiChevronDown className="h-9 w-9 text-slate-400" />
							)}
						</div>
					</th>
					<th
						className={`relative w-[440px] cursor-pointer transition-all hover:bg-slate-800 hover:shadow-box child:opacity-0 child:transition-all child:delay-100 child:hover:block child:hover:opacity-100 ${
							(currentFilter === 'DATA') | (currentFilter === 'reversedDATA')
								? 'bg-slate-800 shadow-box child:block child:opacity-100'
								: ''
						}`}
						onClick={() => filterHandler('DATA')}
					>
						Data Usage
						<div className="absolute right-[120px] top-4">
							{currentFilter === 'reversedDATA' ? (
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
				{peers.map((peer, index) => (
					<PeersTableItem
						key={index}
						peerName={peer.Name}
						isActive={peer.IsActive}
						remainingDays={Math.ceil(
							Math.abs(new Date() - new Date(peer.ExpireDate)) / 1000 / 60 / 60 / 24
						)}
						dataLimit={peer.DataLimit}
						remainingUsage={peer.Usage}
					/>
				))}
			</tbody>
		</table>
	);
}

// exports
export default PeersTable;
