// react
import React from 'react';

// icons
import { HiShieldCheck } from 'react-icons/hi';

// system infos
function SystemUsers({ activePeers, deActivePeers }) {
	// jsx
	return (
		<section className="flex h-[90px] w-[400px] items-center justify-between rounded-3xl bg-slate-900 p-5 shadow-box">
			<div className="flex items-center gap-x-2">
				<div className="flex h-[70px] w-[70px] items-center justify-center rounded-full bg-slate-700">
					<HiShieldCheck className="h-9 w-9 text-slate-300" />
				</div>
				<span className="font-Lalezar text-3xl text-slate-200">Peers</span>
			</div>
			<div className="flex items-center justify-center gap-x-1.5">
				<span className="text-3xl font-bold text-green-500">
					{activePeers ? String(activePeers) : 0}
				</span>
				<span className="text-xl text-slate-100">/</span>
				<span className="text-xl text-red-500">{deActivePeers ? String(deActivePeers) : 0}</span>
			</div>
		</section>
	);
}

// exports
export default SystemUsers;
