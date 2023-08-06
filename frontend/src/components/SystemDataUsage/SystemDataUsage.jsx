// react
import React from 'react';

// packages
import { BsFillClipboardDataFill } from 'react-icons/bs';

// system infos
function SystemDataUsage({ totalUsage }) {
	// jsx
	return (
		<section className="flex h-[90px] w-[400px] items-center justify-between rounded-3xl bg-slate-900 p-5 shadow-box">
			<div className="flex items-center gap-x-2">
				<div className="flex h-[70px] w-[70px] items-center justify-center rounded-full bg-slate-700">
					<BsFillClipboardDataFill className="h-9 w-9 text-slate-300" />
				</div>
				<span className="font-Lalezar text-3xl text-slate-200">Data Usage</span>
			</div>
			<div className="flex items-center justify-center gap-x-1.5">
				<span className="text-3xl font-bold text-blue-500">{totalUsage}</span>
				<span className="text-xl text-sky-700">GB</span>
			</div>
		</section>
	);
}

// exports
export default SystemDataUsage;
