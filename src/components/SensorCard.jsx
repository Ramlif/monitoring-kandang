function SensorCard({ title, value, unit, color }) {
  const colors = {
    blue: "from-sky-500 to-blue-600",
    green: "from-emerald-500 to-green-600",
    orange: "from-orange-500 to-amber-500",
    purple: "from-violet-500 to-purple-600",
    red: "from-rose-500 to-red-600",
  };

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-lg">
      <div className={`h-2 bg-gradient-to-r ${colors[color]}`}></div>

      <div className="p-5">
        <p className="mb-3 text-sm font-bold text-slate-500">{title}</p>

        <h3 className="text-3xl font-extrabold text-slate-800">
          {value}{" "}
          {unit && (
            <span className="text-sm font-medium text-slate-500">{unit}</span>
          )}
        </h3>
      </div>
    </div>
  );
}

export default SensorCard;