// react
import React from 'react';
import { useNavigate } from 'react-router-dom';

// new peer
function NewPeer() {
	// navigator
	const navigate = useNavigate();

	// close modal handler
	const closeModalHandler = () => navigate('/');

	// jsx
	return (
		<>
			<div className="absolute top-0 z-0 flex h-screen w-screen items-center justify-center backdrop-blur-sm">
				<div className="absolute -z-0 h-full w-full" onClick={closeModalHandler}></div>
				<div className="z-10 h-auto w-auto rounded-3xl bg-slate-800 p-10">
					
				</div>
			</div>
		</>
	);
}

// exports
export default NewPeer;
