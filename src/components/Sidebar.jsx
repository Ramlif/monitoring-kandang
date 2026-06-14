function Sidebar({ activePage, setActivePage }) {
  const menus = [
    { key: "dashboard", label: "Dashboard" },
    { key: "history", label: "Riwayat Data" },
    { key: "anomaly", label: "Deteksi Anomali" },
  ];

  return (
    <aside className="fixed left-0 top-0 z-40 min-h-screen w-52 bg-gradient-to-b from-sky-900 via-sky-800 to-cyan-700 p-4 text-white">
      <div className="mb-8 mt-3">
        
      </div>

      <nav className="flex flex-col gap-2 text-sm">
        {menus.map((menu) => (
          <button
            key={menu.key}
            onClick={() => setActivePage(menu.key)}
            className={`rounded-xl px-4 py-3 text-left transition ${
              activePage === menu.key
                ? "bg-white font-semibold text-sky-900 shadow"
                : "text-sky-100 hover:bg-white/15"
            }`}
          >
            {menu.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;