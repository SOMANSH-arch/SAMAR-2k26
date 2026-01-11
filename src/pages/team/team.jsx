import TeamCard from "./Card.jsx";
import { teamData } from "./data/data.js";
import { useRef, useEffect, useMemo } from "react";

export default function Team() {
  const videoRef = useRef(null);
  const sectionRef = useRef(null);

  // 1. MEMOIZATION: Freeze the UI
  // This ensures the 10+ TeamCard components are never re-rendered
  // by React unless the teamData itself changes.
  const renderedTeamCards = useMemo(() => {
    return teamData.map((member, index) => (
      <TeamCard key={member.id || index} member={member} />
    ));
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // 2. SAFE PLAYBACK: Handle browser restrictions
    const safePlay = async () => {
      try {
        if (video.paused) await video.play();
      } catch (err) {
        // Autoplay was likely blocked; browser waits for user click
      }
    };

    // 3. FRAME-SYNCED REPLAY: Fix the Red Bars
    // Using requestAnimationFrame tells the browser to wait for a
    // "free moment" to jump the video back to 1.5s, avoiding jank.
    const onEnd = () => {
      requestAnimationFrame(() => {
        video.currentTime = 1.5;
        safePlay();
      });
    };

    // 4. RESOURCE SAVER: Intersection Observer
    // This is the most important for efficiency. It stops the video
    // completely when the user scrolls away from the section.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          safePlay();
        } else {
          video.pause();
        }
      },
      { threshold: 0.1 }
    );

    const onVisibilityChange = () => {
      document.hidden ? video.pause() : safePlay();
    };

    video.addEventListener("ended", onEnd);
    document.addEventListener("visibilitychange", onVisibilityChange);
    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      video.removeEventListener("ended", onEnd);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen px-4 py-12 overflow-hidden"
    >
      {/* 5. HARDWARE ACCELERATION: CSS fixes for the Main Thread
          transform: translateZ(0) pushes the video to the GPU.
          will-change prevents the browser from being surprised by the video loop.
      */}
      <video
        ref={videoRef}
        className="fixed inset-0 w-full h-full object-cover -z-10 pointer-events-none"
        style={{
          willChange: "transform",
          transform: "translateZ(0)",
          backfaceVisibility: "hidden",
        }}
        autoPlay
        muted
        playsInline
        disablePictureInPicture
        preload="auto"
        poster="/solar-poster.webp"
      >
        <source src="/solar.mp4" type="video/mp4" />
      </video>

      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-center text-3xl md:text-5xl font-bold text-white mb-16 drop-shadow-xl">
          Our Core Team
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 place-items-center">
          {renderedTeamCards}
        </div>
      </div>
    </section>
  );
}
