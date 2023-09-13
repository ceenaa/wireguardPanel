import { useRef } from 'react';
// react
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// icons
import { LuRefreshCcw } from 'react-icons/lu';
import { BiSearchAlt } from 'react-icons/bi';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { getSystemInfosFromServer } from '../../services/Redux/Slices/System';
import { setSearch } from '../../services/Redux/Slices/Search';
import { setSort } from '../../services/Redux/Slices/Sort';
import { setStatus } from '../../services/Redux/Slices/Status';
import { postSystemReload } from '../../services/Axios/Requests/System/systemReload';

// peers header
function PeersHeader() {
	// navigator
	const navigate = useNavigate();

	// redux dispatch hook
	const dispatch = useDispatch();

	// GET system name
	const systemName = localStorage.getItem('system-name');

	// refresh button handler
	const refreshHandler = () => {
		// POST system reload
		postSystemReload(systemName).then(() => {
			// reload system
			dispatch(getSystemInfosFromServer({ systemName }));

			// reload search input
			dispatch(setSearch(''));

			// reload sort filter
			dispatch(setSort({ value: 'expire_date', order: 'asc' }));

			// reload status filter
			dispatch(setStatus({ value: '', count: 0 }));
		});
	};

	// search input reference
	const searchInput = useRef();

	// focus on input when mounting
	useEffect(() => {
		searchInput.current.focus();
	}, []);

	// jsx
	return (
		<section className="mt-[70px] flex items-center justify-between">
			<div className="relative">
				{/* search bar */}
				<input
					ref={searchInput}
					type="search"
					className=" h-[50px] w-[400px] rounded-3xl border-none bg-slate-900 pl-16 pr-5 text-xl text-slate-100 outline-none placeholder:text-xl placeholder:text-slate-100/50 focus:shadow-box2"
					placeholder="Search"
					value={useSelector((state) => state.search)}
					onChange={(e) => dispatch(setSearch(e.target.value))}
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
				<button
					className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-slate-700 transition-colors hover:bg-slate-600 hover:shadow-box"
					onClick={refreshHandler}
				>
					<LuRefreshCcw className="h-[30px] w-[30px] text-slate-300" />
				</button>
			</div>
		</section>
	);
}

// exports
export default PeersHeader;
