const delays = [100, 200, 300, 400, 500, 600];

const FeatureCard = ({ icon: Icon, title, desc, index }) => {
  return (
    <div
      className={`group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 transition-all hover:-translate-y-1 hover:shadow-lg hover:border-yellow-500/50 animate-fade-up delay-${delays[index % delays.length]}`}
    >
      <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center mb-4 group-hover:bg-yellow-500/20 transition-colors">
        <Icon className="text-yellow-500" size={20} />
      </div>
      <h3 className="font-bold text-lg mb-1">{title}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
        {desc}
      </p>
    </div>
  );
};

export default FeatureCard;
