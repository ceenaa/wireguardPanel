// react
import React, { useEffect, useState } from 'react';

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
import { getPeersFromServer } from '../../services/Redux/Slices/Peers';

// panel
function Panel() {
	// system active users
	const [systemActiveUsers, setSystemActiveUsers] = useState('000');

	// system active users
	const [systemDeActiveUsers, setSystemDeActiveUsers] = useState('000');

	// redux dispatch hook
	const dispatch = useDispatch();

	// mounting side effects
	useEffect(() => {
		// GET system infos
		dispatch(getSystemInfosFromServer());
		dispatch(getPeersFromServer());
	}, []);

	// system infos
	let systemInfos = useSelector((state) => state.system);

  // peers list
	let peers = useSelector((state) => state.peers);

	// jsx
	return (
		<>
			<div className="container">
				<SystemHeader systemName={systemInfos.Name} systemStartedDate={systemInfos.StartedDate} />
				<main>
					<div className="mt-6 flex flex-wrap items-center justify-between lg:px-16">
						<SystemDataUsage totalUsage={systemInfos.TotalUsage} title="Data Usage" />
						<SystemUsers activeUsers={systemActiveUsers} deActiveUsers={systemDeActiveUsers} />
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
