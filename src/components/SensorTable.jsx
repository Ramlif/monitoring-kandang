import { useState } from "react";

function SensorTable({ data, title = "Riwayat Data Sensor & Deteksi Anomali" }) {
  const [search, setSearch] = useState("");

  const filteredData = data.filter((item) =>
    item.tanggal.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="rounded-2xl border border-sky-100 bg-white p-6 shadow-md">
      <div className="mb-5 flex items-center justify-between gap-3">
        <h3 className="text-lg font-bold text-slate-800">{title}</h3>

        <input
          type="text"
          placeholder="Cari Riwayat..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-xl border border-sky-200 px-4 py-2 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
        />
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full border-collapse text-sm">
          <thead className="bg-gradient-to-r from-sky-600 to-cyan-500 text-white">
            <tr>
              <TableHead>Tanggal & Waktu</TableHead>
              <TableHead>Suhu (°C)</TableHead>
              <TableHead>Kelembapan (%)</TableHead>
              <TableHead>Gerakan Ayam</TableHead>
              <TableHead>Berat Pakan (kg)</TableHead>
              <TableHead>Status</TableHead>
            </tr>
          </thead>

          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <tr
                  key={item.id}
                  className={index % 2 === 0 ? "bg-white" : "bg-sky-50/60"}
                >
                  <TableCell>{item.tanggal}</TableCell>
                  <TableCell>{item.suhu}°C</TableCell>
                  <TableCell>{item.kelembapan}%</TableCell>
                  <TableCell>{item.gerakan} kali/menit</TableCell>
                  <TableCell>{item.pakan} kg</TableCell>
                  <TableCell>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        item.status === "Normal"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-rose-100 text-rose-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </TableCell>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="border-t border-slate-200 px-4 py-6 text-center text-slate-500"
                >
                  Data tidak ditemukan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function TableHead({ children }) {
  return <th className="px-4 py-3 text-left font-semibold">{children}</th>;
}

function TableCell({ children }) {
  return <td className="border-t border-slate-200 px-4 py-3">{children}</td>;
}

export default SensorTable;