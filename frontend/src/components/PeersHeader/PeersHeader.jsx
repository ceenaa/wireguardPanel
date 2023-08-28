// react
import React from 'react';

// packages
import { LuRefreshCcw } from 'react-icons/lu';
import { BiSearchAlt } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

// peers header
function PeersHeader() {
  // navigator
	const navigate = useNavigate();

	return (
		<section className="mt-[70px] flex items-center justify-between">
			<div className="relative">
				{/* search bar */}
				<input
					type="search"
					className=" h-[50px] w-[400px] rounded-3xl border-none bg-slate-900 pl-16 pr-5 text-xl text-slate-100 outline-none placeholder:text-xl placeholder:text-slate-100/50 focus:shadow-box2"
					placeholder="Search"
				/>
				<BiSearchAlt className="absolute left-5 top-2 h-9 w-9 text-slate-300" />
			</div>
			<div className="flex gap-x-10">
				{/* create new user button */}
				<button
					className="h-[50px] w-[200px] rounded-3xl bg-slate-900 font-Lalezar text-2xl text-slate-50 shadow-box2 transition-all hover:bg-slate-800 hover:shadow-box"
					onClick={() => navigate('new-peer')}
				>
					Create New User
				</button>
				{/* refresh button */}
				<button className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-slate-700 transition-colors hover:bg-slate-600 hover:shadow-box">
					<LuRefreshCcw className="h-[30px] w-[30px] text-slate-300" />
				</button>
			</div>
		</section>
	);
}

// exports
export default PeersHeader;
