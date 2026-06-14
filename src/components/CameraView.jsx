function CameraView() {
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">
        Live Monitoring Kamera
      </h2>

      <img
        src="http://192.168.0.106:81/stream"
        alt="ESP32-CAM"
        style={{
          width: "100%",
          borderRadius: "10px"
        }}
      />
    </div>
  );
}

export default CameraView;