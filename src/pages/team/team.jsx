// components/TeamSection.jsx
import TeamCard from "./Card.jsx";
import { teamData } from "./data/data.js";
import { useRef, useEffect } from "react";

export default function Team() {
	const videoRef = useRef(null);

	useEffect(() => {
		const video = videoRef.current;
		if (!video) return;

		// smoother replay
		const onEnd = () => {
			video.currentTime = 1.5;
			video.play();
		};

		// pause when tab is hidden
		const onVisibilityChange = () => {
			if (document.hidden) {
				video.pause();
			} else {
				video.play();
			}
		};

		video.addEventListener("ended", onEnd);
		document.addEventListener("visibilitychange", onVisibilityChange);

		return () => {
			video.removeEventListener("ended", onEnd);
			document.removeEventListener(
				"visibilitychange",
				onVisibilityChange
			);
		};
	}, []);

	return (
		<section className='relative min-h-screen px-2 py-5'>
			{/* Video */}
			<video
				ref={videoRef}
				className='fixed inset-0 w-full h-full object-cover -z-10'
				autoPlay
				muted
				playsInline
				preload='metadata'>
				{/* Mobile first */}
				<source
					src='/solar.mp4'
					type='video/mp4'
					media='(max-width: 768px)'
				/>

				{/* Desktop */}
				<source
					src='/solar.mp4'
					type='video/mp4'
					media='(min-width: 769px)'
				/>
			</video>

			<div className='max-w-7xl mx-auto'>
				<h2 className='text-center text-3xl md:text-4xl font-bold text-white mb-12'>
					Our Core Team
				</h2>

				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 place-items-center'>
					{teamData.map((member, index) => (
						<TeamCard key={index} member={member} />
					))}
				</div>
			</div>
		</section>
	);
}
