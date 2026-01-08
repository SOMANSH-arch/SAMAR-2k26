import React from "react";
// import OrbitalView from "./OrbitalView"; // Import the new component

const TeamCard = ({ member }) => {
  if (!member) return null;
  const { name, description, image, role } = member;

  return (
    <div className="relative w-full max-w-[320px] mb-4">
      <div className="absolute inset-0 rounded-3xl"></div>

      <div className="relative bg-white/5 rounded-3xl border-3 border-blue-300/30 shadow-2xl">
        <div className="relative bg-white/5 rounded-3xl px-6 py-2 border m-1 border-white/30 shadow-2xl">
          <div className="relative w-46 h-46 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full bg-blue-200/20 blur-2xl"></div>

            {/* Injected SVG Functionality */}
            {/* <OrbitalView name={name} /> */}

            <div className="absolute inset-6 rounded-full overflow-hidden border-2 border-blue-400/60 shadow-lg shadow-blue-500/50">
              <img
                src={image}
                alt={name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <h3 className="text-2xl font-bold text-white text-center mb-2 tracking-wide">
            {name}
          </h3>
          <p className="text-cyan-400 text-center text-sm font-medium mb-6 tracking-wider">
            {role}
          </p>
          <div className="w-full h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent mb-5"></div>
          <p className="text-gray-200 text-center text-sm mb-8 leading-relaxed truncate w-48">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TeamCard;
