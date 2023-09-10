// react
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// icons
import { PiCodesandboxLogoDuotone } from 'react-icons/pi';

// axios
import { getPeerQRCode } from '../../services/Axios/Requests/Peer/peerQRCode';

import QRCode from 'qrcode';

// peer QRcode
function PeerQRCode() {
	// navigator
	const navigate = useNavigate();

	// get peer name from url params
	const { peerName } = useParams();

	// transition handler
	const [isLoad, setIsLoad] = useState(false);

	// close modal handler
	const closeModalHandler = () => {
		// transition handler
		setIsLoad(!isLoad);

		// navigate to panel
		setTimeout(() => {
			navigate('/');
			document.title = 'Wireguard Panel - Panel';
		}, 300);
	};

	// peer QRCode url
	const [QRCodeUrl, setQRCodeUrl] = useState('');

	// mounting side effects
	useEffect(() => {
		// change document title
		document.title = 'Wireguard Panel - QRCode';

		// GET peer configs and convert to QRcode
		getPeerQRCode(peerName).then((res) =>
			QRCode.toDataURL(res.data, {}, (err, url) => setQRCodeUrl(url))
		);

		// load transition
		setIsLoad(true);
	}, []);

	// jsx
	return (
		<div
			className={`absolute top-0 z-0 flex h-screen w-screen items-center justify-center backdrop-blur-sm transition-opacity duration-300 ${
				isLoad ? 'opacity-100' : 'opacity-0'
			}`}
		>
			<div className="absolute -z-0 h-full w-full" onClick={closeModalHandler}></div>
			<div className="z-10 h-auto w-[566px] overflow-scroll rounded-3xl bg-slate-800 p-10">
				<span className="relative flex w-full select-none items-center justify-center gap-x-5 text-center font-Lalezar text-3xl text-slate-300">
					<PiCodesandboxLogoDuotone />
					{`${peerName} Configs QRCode`}
				</span>
				<div className="justify-centers mt-10 flex items-center justify-center">
					<a
						className="inline-block cursor-pointer rounded-3xl bg-slate-700 p-8 shadow-box transition-colors hover:bg-slate-600"
						href={QRCodeUrl}
						download={`${peerName}.png`}
					>
						<img src={QRCodeUrl}></img>
					</a>
				</div>
			</div>
		</div>
	);
}

export default PeerQRCode;
