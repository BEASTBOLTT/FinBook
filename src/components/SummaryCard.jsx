const SummaryCard = ({ title, value, color, bg, border, icon, subtext }) => {
    return (
        <div
            className={`bg-[#111111] p-5 rounded-2xl border ${border || "border-[#2a2a2a]"} flex flex-col gap-4 hover:border-[#D4AF37] transition-all duration-200`}
        >

            {/* ICON */}
            {icon && (
                <div className={`w-12 h-12 ${bg} rounded-xl flex items-center justify-center`}>
                    {icon}
                </div>
            )}

            {/* TITLE */}
            <p className="text-gray-400 text-sm">
                {title}
            </p>

            {/* VALUE */}
            <h2 className={`text-3xl font-bold tracking-tight ${color}`}>
                ₹{value}
            </h2>

            {/* SUBTEXT */}
            {subtext && (
                <p className={`text-sm ${color}`}>
                    {subtext}
                </p>
            )}

        </div>
    );
};

export default SummaryCard;