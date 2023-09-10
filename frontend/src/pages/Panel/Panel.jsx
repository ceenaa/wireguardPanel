// react
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { getSystemInfosFromServer } from '../../services/Redux/Slices/System';

// components
import SystemHeader from '../../components/SystemHeader/SystemHeader';
import SystemDataUsage from '../../components/SystemDataUsage/SystemDataUsage';
import SystemUsers from '../../components/SytemUsers/SystemUsers';
import PeersTable from '../../components/PeersTable/PeersTable';
import PeersHeader from '../../components/PeersHeader/PeersHeader';
import { Outlet } from 'react-router-dom';

// panel
function Panel() {
	// navigator
	const navigate = useNavigate();

	// redux dispatch hook
	const dispatch = useDispatch();

	// system infos
	let systemInfos = useSelector((state) => state.system);

	// peers list
	let peers = useSelector((state) => state.system.Peers);

	// GET system name
	let systemName = localStorage.getItem('system-name');

	// mounting side effects
	useEffect(() => {
		// change document title
		document.title = 'Wireguard Panel - Panel';
	}, []);

	// mounting side effects
	useEffect(() => {
		// check if system name is set
		systemName === null ? navigate('/system') : null;

		// GET system infos
		dispatch(getSystemInfosFromServer(systemName));
	}, [systemName]);

	// jsx
	return (
		<>
			<div className="container">
				<SystemHeader systemName={systemInfos.Name} systemStartedDate={systemInfos.StartedDate} />
				<main>
					<div className="mt-6 flex flex-wrap items-center justify-between lg:px-16">
						<SystemDataUsage totalUsage={systemInfos.TotalUsage} title="Data Usage" />
						<SystemUsers
							activePeers={systemInfos.ActivePeersCount}
							deActivePeers={systemInfos.AllPeersCount}
						/>
					</div>
					{systemInfos.Peers ? (
						<>
							<PeersHeader />
							<section className="my-10">
								<PeersTable peers={peers} />
							</section>
						</>
					) : null}
				</main>
			</div>
			<Outlet />
		</>
	);
}

// exports
export default Panel;
