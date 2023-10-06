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
import PeerPagination from '../../components/PeerPagination/PeerPagination';

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

	// GET status from redux
	let status = useSelector((state) => state.status.value);

	// GET sort from redux
	let sortBy = useSelector((state) => state.sort.value);

	// GET order by from redux
	let order = useSelector((state) => state.sort.order);

	// GET peer name from redux
	let peerName = useSelector((state) => state.search);

	// GET page from redux
	let page = useSelector((state) => state.page);

	// GET per page from redux
	let perPage = useSelector((state) => state.perPage);

	useEffect(() => {
		systemName !== null
			? // GET system infos
			  dispatch(
					getSystemInfosFromServer({
						systemName: systemName,
						page,
						perPage,
						order,
						sortBy,
						status,
						peerName
					})
			  )
			: navigate('/system');
	}, [status, sortBy, order, peerName, page, perPage]);

	// mounting side effects
	useEffect(() => {
		// check if system name is set
		systemName === null
			? navigate('/system')
			: // GET system infos
			  dispatch(
					getSystemInfosFromServer({
						systemName: systemName
					})
			  );
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
							deActivePeers={systemInfos.AllPeersCount - systemInfos.ActivePeersCount}
						/>
					</div>
					{systemInfos.Peers ? (
						<>
							<PeersHeader />
							<section className="my-10">
								<PeersTable peers={peers} />
								<PeerPagination
									allPeers={systemInfos.AllPeersCount}
									activePeers={systemInfos.ActivePeersCount}
									deActivePeers={systemInfos.AllPeersCount - systemInfos.ActivePeersCount}
								/>
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
