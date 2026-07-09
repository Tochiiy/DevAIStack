import { FiShield, FiMail, FiKey, FiLock, FiUserPlus } from "react-icons/fi";

const steps = [
  { icon: FiUserPlus, label: "Register" },
  { icon: FiMail, label: "Verify" },
  { icon: FiLock, label: "Login" },
  { icon: FiKey, label: "OTP" },
  { icon: FiShield, label: "Dashboard" },
];

const AuthFlow = () => {
  return (
    <div className="mt-16 animate-fade-up delay-300">
      <div className="flex items-center justify-center gap-1 sm:gap-3">
        {steps.map((s, i) => (
          <div key={s.label} className="flex items-center">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-yellow-500/10 border-2 border-yellow-500/30 flex items-center justify-center transition-colors hover:border-yellow-500 hover:bg-yellow-500/20">
                <s.icon
                  size={18}
                  className="text-yellow-500 hidden sm:block"
                />
                <s.icon
                  size={14}
                  className="text-yellow-500 sm:hidden"
                />
              </div>
              <span className="text-[10px] sm:text-xs mt-1.5 text-gray-500 dark:text-gray-400 font-medium">
                {s.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className="w-4 sm:w-10 h-px bg-gradient-to-r from-yellow-500/50 to-yellow-500/20 mx-1 sm:mx-2 mt-[-1.2rem] sm:mt-[-1.5rem]" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuthFlow;
