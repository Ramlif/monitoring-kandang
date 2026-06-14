function Header({ onExportPDF }) {
  return (
    <header className="fixed left-52 right-0 top-0 z-30 flex h-24 items-center justify-between border-b border-sky-100 bg-white px-8 py-5 shadow-sm">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          Dashboard Monitoring Kandang Ayam Petelur
        </h1>
        <p className="mt-1 text-sm font-medium text-sky-700">
          IoT Monitoring + Deteksi Anomali
        </p>
      </div>

      <button
        onClick={onExportPDF}
        className="rounded-xl bg-gradient-to-r from-sky-600 to-cyan-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:from-sky-700 hover:to-cyan-600"
      >
        Ekspor Data PDF
      </button>
    </header>
  );
}

export default Header;