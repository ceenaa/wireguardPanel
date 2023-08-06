// react
import React, { useEffect, useState } from 'react';

// components
import SystemHeader from '../../components/SystemHeader/SystemHeader';
import SystemDataUsage from '../../components/SystemDataUsage/SystemDataUsage';
import { systemInfos } from '../../services/Axios/Requests/System/systemName';
import SystemUsers from '../../components/SytemUsers/SystemUsers';
import PeersHeader from '../../components/PeersHeader/PeersHeader';
import PeersTable from '../../components/PeersTable/PeersTable';

// panel
function Panel() {
	// system name
	const [systemName, setSystemName] = useState('System Name');

	// system started date
	const [systemStartedDate, setSystemStartedDate] = useState('0000/00/00');

	// system total usage
	const [systemTotalUsage, setSystemTotalUsage] = useState('000.00');

	// system active users
	const [systemActiveUsers, setSystemActiveUsers] = useState('000');

	// system active users
	const [systemDeActiveUsers, setSystemDeActiveUsers] = useState('000');

	// mounting side effects
	useEffect(() => {
		// GET system infos
		systemInfos('my system').then((res) => {
			setSystemName(res.data.Name);
			setSystemStartedDate(res.data.StartedDate);
			setSystemTotalUsage(res.data.TotalUsage);
		});
	}, []);

	// jsx
	return (
		<div className="container">
			<SystemHeader systemName={systemName} systemStartedDate={systemStartedDate} />
			<main>
				<div className="mt-6 flex flex-wrap items-center justify-between lg:px-16">
					<SystemDataUsage totalUsage={systemTotalUsage} title="Data Usage" />
					<SystemUsers activeUsers={systemActiveUsers} deActiveUsers={systemDeActiveUsers} />
				</div>
				<PeersHeader />
				<section className="my-10">
					<PeersTable />
				</section>
			</main>
		</div>
	);
}

// exports
export default Panel;
