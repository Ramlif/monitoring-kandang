function AnomalySummary({ data }) {
  const anomalyData = data.filter((item) => item.status === "Anomali");

  return (
    <div className="mb-7 rounded-2xl border border-rose-100 bg-white p-6 shadow-md">
      <h3 className="text-lg font-bold text-slate-800">Ringkasan Deteksi Anomali</h3>

      <p className="mt-2 text-sm text-slate-500">
        Halaman ini menampilkan data sensor yang terdeteksi tidak normal berdasarkan
        nilai suhu, kelembapan, aktivitas ayam, dan konsumsi pakan.
      </p>

      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-3">
        <div className="rounded-2xl bg-rose-50 p-5">
          <p className="text-sm font-semibold text-rose-700">Total Anomali</p>
          <h4 className="mt-2 text-3xl font-extrabold text-rose-700">
            {anomalyData.length}
          </h4>
        </div>

        <div className="rounded-2xl bg-orange-50 p-5">
          <p className="text-sm font-semibold text-orange-700">
            Rata-rata Suhu Anomali
          </p>
          <h4 className="mt-2 text-3xl font-extrabold text-orange-700">
            {getAverage(anomalyData, "suhu")}°C
          </h4>
        </div>

        <div className="rounded-2xl bg-purple-50 p-5">
          <p className="text-sm font-semibold text-purple-700">
            Rata-rata Gerakan Anomali
          </p>
          <h4 className="mt-2 text-3xl font-extrabold text-purple-700">
            {getAverage(anomalyData, "gerakan")}
          </h4>
        </div>
      </div>
    </div>
  );
}

function getAverage(data, key) {
  if (data.length === 0) return 0;

  const total = data.reduce((sum, item) => sum + item[key], 0);
  return (total / data.length).toFixed(1);
}

export default AnomalySummary;