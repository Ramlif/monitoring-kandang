function SensorChart({ data }) {
  const chartData = data.slice(0, 6).reverse();

  return (
    <div className="mb-7 rounded-2xl border border-sky-100 bg-white p-6 shadow-md">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-800">
            Data Sensor (Waktu Nyata)
          </h3>
          <p className="mt-1 text-xs text-slate-500">
            Perbandingan suhu, kelembapan, aktivitas ayam, dan berat pakan.
          </p>
        </div>

        <div className="flex gap-2 text-xs">
          <button className="rounded-lg bg-sky-600 px-3 py-2 font-semibold text-white">
            Realtime
          </button>
          <button className="rounded-lg border border-sky-200 px-3 py-2 text-sky-700 hover:bg-sky-50">
            1 Jam
          </button>
          <button className="rounded-lg border border-sky-200 px-3 py-2 text-sky-700 hover:bg-sky-50">
            12 Jam
          </button>
          <button className="rounded-lg border border-sky-200 px-3 py-2 text-sky-700 hover:bg-sky-50">
            24 Jam
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[900px]">
          <div className="flex">
            <div className="mr-3 flex h-72 flex-col justify-between pb-10 text-right text-xs text-slate-500">
              <span>100</span>
              <span>75</span>
              <span>50</span>
              <span>25</span>
              <span>0</span>
            </div>

            <div className="relative h-72 flex-1 border-b border-l border-slate-300 px-8 pb-10">
              <div className="absolute left-0 top-0 h-full w-full pb-10">
                <div className="h-1/4 border-t border-sky-100"></div>
                <div className="h-1/4 border-t border-sky-100"></div>
                <div className="h-1/4 border-t border-sky-100"></div>
                <div className="h-1/4 border-t border-sky-100"></div>
              </div>

              <div className="relative z-10 flex h-full items-end justify-around gap-8">
                {chartData.map((item) => (
                  <div key={item.id} className="flex flex-col items-center">
                    <div className="flex h-56 items-end gap-3">
                      <Bar
                        value={item.suhu}
                        max={100}
                        color="bg-sky-500"
                        label={`${item.suhu}°C`}
                      />

                      <Bar
                        value={item.kelembapan}
                        max={100}
                        color="bg-emerald-500"
                        label={`${item.kelembapan}%`}
                      />

                      <Bar
                        value={item.gerakan}
                        max={100}
                        color="bg-orange-500"
                        label={`${item.gerakan} kali`}
                      />

                      <Bar
                        value={item.pakan * 10}
                        max={100}
                        color="bg-purple-500"
                        label={`${item.pakan} kg`}
                      />
                    </div>

                    <p className="mt-3 text-xs font-medium text-slate-500">
                      {item.tanggal.slice(11)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <p className="mt-2 text-xs text-slate-500">
            Catatan: berat pakan dikalikan 10 agar dapat dibandingkan dalam
            grafik.
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-6 text-xs font-medium text-slate-600">
        <Legend label="Suhu (°C)" color="bg-sky-500" />
        <Legend label="Kelembapan (%)" color="bg-emerald-500" />
        <Legend label="Gerakan Ayam" color="bg-orange-500" />
        <Legend label="Berat Pakan (kg)" color="bg-purple-500" />
      </div>
    </div>
  );
}

function Bar({ value, max, color, label }) {
  const height = Math.max((value / max) * 224, 8);

  return (
    <div className="group relative flex h-56 w-8 items-end justify-center">
      <div
        className={`w-7 rounded-t-lg ${color} shadow-md transition-all duration-300 hover:scale-105 hover:opacity-90`}
        style={{ height: `${height}px` }}
      ></div>

      <div
        className="pointer-events-none absolute z-20 mb-2 hidden rounded-md bg-slate-800 px-2 py-1 text-[10px] font-semibold text-white shadow-md group-hover:block"
        style={{ bottom: `${height}px` }}
      >
        {label}
      </div>
    </div>
  );
}

function Legend({ label, color }) {
  return (
    <span className="flex items-center gap-2">
      <span className={`h-3 w-3 rounded-full ${color}`}></span>
      {label}
    </span>
  );
}

export default SensorChart;