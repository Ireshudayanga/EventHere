import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import animation1 from "../../assets/animation/Animation - 1745317964833.json";
import animation2 from "../../assets/animation/Animation - 1745317690843.json";
import logo from "../../assets/images/300PPI.png";

export default function ComingSoon() {
  const [countdown, setCountdown] = useState(null);
  const launchTime = import.meta.env.VITE_LAUNCH_TIME;

  const calculateCountdown = () => {
    if (!launchTime) return null;
    const [h, m] = launchTime.split(":").map(Number);
    if (isNaN(h) || isNaN(m)) return null;

    const now = new Date();
    const target = new Date();
    target.setHours(h, m, 0, 0);
    if (target <= now) target.setDate(target.getDate() + 1);
    return Math.floor((target - now) / 1000);
  };

  useEffect(() => {
    const initial = calculateCountdown();
    setCountdown(initial);
    if (initial === null) return;

    const timer = setInterval(() => {
      setCountdown((prev) => (prev && prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (secs) => {
    const h = String(Math.floor(secs / 3600)).padStart(2, "0");
    const m = String(Math.floor((secs % 3600) / 60)).padStart(2, "0");
    const s = String(secs % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-indigo-100 flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-xl w-full flex flex-col items-center text-center space-y-8">
        {/* Animation 1 */}
        <Lottie animationData={animation1} loop className="w-80 h-auto" />
        {/* Animation 2 */}
        <Lottie animationData={animation2} loop className="w-80 h-auto" />

        {/* Big Logo */}
        <img
          src={logo}
          alt="Logo"
          className="w-48 sm:w-60 md:w-72 drop-shadow-xl transition-all duration-500"
        />

        {/* Text + Timer */}
        <div className="mt-4">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
            Coming Soon
          </h1>
          <p className="text-gray-600 mb-6">
            We’re preparing something exciting. Stay tuned.
          </p>

          {countdown !== null ? (
            <div className="text-2xl font-mono bg-white/50 text-gray-800 py-3 px-8 rounded-xl shadow-inner border border-white/30 backdrop-blur">
              {formatTime(countdown)}
            </div>
          ) : (
            <p className="text-gray-500 italic">Launch time not yet announced</p>
          )}
        </div>
      </div>
    </div>
  );
}
