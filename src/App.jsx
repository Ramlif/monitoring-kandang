import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import SensorCard from "./components/SensorCard";
import SensorChart from "./components/SensorChart";
import SensorTable from "./components/SensorTable";
import AnomalySummary from "./components/AnomalySummary";

function App() {
  const [activePage, setActivePage] = useState("dashboard");
  const [sensorData, setSensorData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [cameraError, setCameraError] = useState(false);

  const API_URL = "http://localhost:5000/api/sensor";

  // URL ESP32-CAM
  const CAMERA_URL = "http://192.168.0.106:81/stream";

  const getSensorData = async () => {
    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Gagal mengambil data dari server");
      }

      const data = await response.json();

      setSensorData(data);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(
        "Backend belum terhubung atau server sedang tidak berjalan."
      );
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSensorData();

    const interval = setInterval(() => {
      getSensorData();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const latestData = sensorData[0];

  const anomalyData = sensorData.filter(
    (item) => item.status === "Anomali"
  );

  const handleExportPDF = () => {
    if (sensorData.length === 0) {
      alert("Data masih kosong, tidak dapat ekspor PDF.");
      return;
    }

    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text(
      "Laporan Data Monitoring Kandang Ayam Petelur",
      14,
      15
    );

    doc.setFontSize(10);
    doc.text(
      "Sistem IoT Monitoring dan Deteksi Anomali",
      14,
      22
    );

    doc.text(
      `Tanggal Ekspor: ${new Date().toLocaleString("id-ID")}`,
      14,
      28
    );

    doc.setFontSize(11);
    doc.text(`Total Data: ${sensorData.length}`, 14, 38);
    doc.text(`Total Anomali: ${anomalyData.length}`, 14, 44);

    autoTable(doc, {
      startY: 52,
      head: [
        [
          "Tanggal & Waktu",
          "Suhu",
          "Kelembapan",
          "Gerakan Ayam",
          "Berat Pakan",
          "Status",
        ],
      ],
      body: sensorData.map((item) => [
        item.tanggal,
        `${item.suhu} °C`,
        `${item.kelembapan} %`,
        `${item.gerakan} kali/menit`,
        `${item.pakan} kg`,
        item.status,
      ]),
      styles: {
        fontSize: 8,
      },
      headStyles: {
        fillColor: [2, 132, 199],
      },
    });

    doc.save("laporan-monitoring-kandang.pdf");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-cyan-50 to-emerald-50 text-slate-800">
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
      />

      <Header onExportPDF={handleExportPDF} />

      <main className="ml-52 pt-24">
        <section className="p-8">
          {loading && (
            <div className="rounded-2xl border border-sky-100 bg-white p-6 shadow-md">
              <p className="text-sm font-medium text-slate-600">
                Sedang mengambil data sensor...
              </p>
            </div>
          )}

          {!loading && errorMessage && (
            <div className="mb-6 rounded-2xl border border-rose-200 bg-rose-50 p-5 text-rose-700 shadow-sm">
              <h3 className="font-bold">
                Gagal Mengambil Data
              </h3>

              <p className="mt-1 text-sm">
                {errorMessage}
              </p>

              <p className="mt-2 text-xs">
                Pastikan backend berjalan di
                http://localhost:5000
              </p>
            </div>
          )}

          {!loading &&
            sensorData.length === 0 &&
            !errorMessage && (
              <div className="rounded-2xl border border-yellow-200 bg-yellow-50 p-6 text-yellow-700 shadow-sm">
                <h3 className="font-bold">
                  Data Sensor Kosong
                </h3>

                <p className="mt-1 text-sm">
                  Belum ada data sensor yang tersimpan di
                  database.
                </p>
              </div>
            )}

          {!loading && sensorData.length > 0 && (
            <>
              {activePage === "dashboard" && (
  <>
    {/* CARD SENSOR */}
    <div className="mb-7 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-5">
      <SensorCard
        title="Suhu"
        value={`${latestData.suhu}°C`}
        color="blue"
      />

      <SensorCard
        title="Kelembapan"
        value={`${latestData.kelembapan}%`}
        color="green"
      />

      <SensorCard
        title="Gerakan Ayam"
        value={latestData.gerakan}
        unit="kali/menit"
        color="orange"
      />

      <SensorCard
        title="Berat Pakan"
        value={latestData.pakan}
        unit="kg"
        color="purple"
      />

      <SensorCard
        title="Total Anomali"
        value={anomalyData.length}
        color="red"
      />
    </div>

    {/* GRAFIK + KAMERA */}
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">

      {/* GRAFIK */}
      <div className="rounded-2xl border border-sky-100 bg-white p-5 shadow-md">
        <h3 className="mb-4 text-lg font-bold text-slate-800">
          Grafik Monitoring Sensor
        </h3>

        <SensorChart data={sensorData} />
      </div>

      {/* KAMERA */}
      <div className="rounded-2xl border border-sky-100 bg-white p-5 shadow-md">
        <h3 className="mb-4 text-lg font-bold text-slate-800">
          Monitoring Kamera Kandang
        </h3>

        <div className="h-[520px] overflow-hidden rounded-xl border border-slate-200">
          <>
  {!cameraError ? (
    <img
      src={CAMERA_URL}
      alt="ESP32-CAM"
      className="w-full h-full object-cover"
      onError={() => setCameraError(true)}
    />
  ) : (
    <div className="flex h-full items-center justify-center bg-slate-100">
      <div className="text-center">
        <h3 className="font-bold text-red-500">
          ESP32-CAM Offline
        </h3>

        <p className="mt-2 text-sm text-slate-500">
          Pastikan ESP32-CAM terhubung ke WiFi
        </p>

        <p className="mt-1 text-xs text-slate-400">
          {CAMERA_URL}
        </p>
      </div>
    </div>
  )}
</>
        </div>
      </div>

    </div>

    {/* TABEL */}
    <SensorTable
      data={sensorData.slice(0, 8)}
    />
  </>
)}

              {activePage === "history" && (
                <>
                  <div className="mb-6">
                    <h2 className="text-xl font-bold text-slate-800">
                      Riwayat Data
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      Menampilkan seluruh riwayat data sensor
                      yang tersimpan.
                    </p>
                  </div>

                  <SensorTable
                    data={sensorData}
                    title="Seluruh Riwayat Data Sensor"
                  />
                </>
              )}

              {activePage === "anomaly" && (
                <>
                  <div className="mb-6">
                    <h2 className="text-xl font-bold text-slate-800">
                      Deteksi Anomali
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      Menampilkan data yang terdeteksi tidak
                      normal.
                    </p>
                  </div>

                  <AnomalySummary data={sensorData} />

                  <SensorTable
                    data={anomalyData}
                    title="Data Sensor dengan Status Anomali"
                  />
                </>
              )}
            </>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;