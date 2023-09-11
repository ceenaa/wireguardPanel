// react
import React from 'react';
import { useNavigate } from 'react-router-dom';

// icons
import { IoQrCodeSharp } from 'react-icons/io5';
import { BiLinkAlt } from 'react-icons/bi';
import { MdWifi, MdWifiOff } from 'react-icons/md';

// axios
import { getPeerConfigs } from '../../services/Axios/Requests/Peer/peerConfigs';

function PeersTableItem({ peerName, isActive, remainingDays, remainingUsage, dataLimit }) {
	// navigator
	const navigate = useNavigate();

	// peer config file
	const peerConfigHandler = () => {
		getPeerConfigs(peerName).then((res) => {
			const href = window.URL.createObjectURL(res.data);
			const anchorElement = document.createElement('a');

			anchorElement.href = href;
			anchorElement.download = `${peerName}.txt`;

			document.body.appendChild(anchorElement);
			anchorElement.click();

			document.body.removeChild(anchorElement);
			window.URL.revokeObjectURL(href);
		});
	};

	// jsx
	return (
		<tr className="group h-[114px] cursor-pointer divide-x-2 divide-slate-300 text-center text-2xl leading-[114px] shadow-blue-500 transition-all hover:bg-slate-500/20 hover:shadow-box">
			{/* User Name */}
			<td
				className="cursor-pointer px-5 font-bold text-slate-50 transition-all group-hover:text-blue-500"
				onClick={() => navigate(`${peerName}`)}
			>
				<span>{peerName}</span>
			</td>
			{/* Status  */}
			<td
				className="flex h-[114px] items-center justify-between p-5"
				onClick={() => navigate(`${peerName}`)}
			>
				<div
					className={`flex items-center gap-x-2 ${isActive ? 'text-green-500' : 'text-red-500'}`}
				>
					<div className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-slate-900">
						{isActive ? <MdWifi className="h-9 w-9" /> : <MdWifiOff className="h-9 w-9" />}
					</div>
					<span className="text-2xl font-bold">{isActive ? 'Active' : 'DeActive'}</span>
				</div>
				<span className="text-xs text-slate-200">
					Expire in
					<span className="text-base text-blue-500"> {remainingDays} </span>
					day
				</span>
			</td>
			{/* Data Usage   */}
			<td className="p-5 leading-none" onClick={() => navigate(`${peerName}`)}>
				<div className="relative ml-4 mt-3 flex flex-col justify-center gap-y-2">
					<span className="h-[10px] w-[400px] rounded-full bg-slate-200"></span>
					<span
						className={`absolute top-0 h-[10px] rounded-full bg-blue-500`}
						style={{ width: `${(remainingUsage / dataLimit) * 400}px` }}
					></span>
					<div className="mr-5 flex items-center justify-between text-xl">
						<span className="text-blue-500">
							{remainingUsage}
							<span className="text-slate-100"> GB</span>
						</span>
						<span>
							{dataLimit}
							<span className="text-slate-100"> GB</span>
						</span>
					</div>
				</div>
			</td>
			{/* Action Buttons */}
			<td className="p-5">
				<div className="flex items-center justify-between gap-x-[60px]">
					<button
						className="flex h-[50px] w-[50px] items-center justify-center rounded-lg transition-all hover:bg-slate-700 hover:shadow-box"
						onClick={() => navigate(`${peerName}/qrcode`)}
					>
						<IoQrCodeSharp className="h-9 w-9 text-slate-400 " />
					</button>
					<button
						className="flex h-[50px] w-[50px] items-center justify-center rounded-lg transition-all hover:bg-slate-700 hover:shadow-box"
						onClick={peerConfigHandler}
					>
						<BiLinkAlt className="h-9 w-9 text-slate-400" />
					</button>
				</div>
			</td>
		</tr>
	);
}

// exports
export default PeersTableItem;
