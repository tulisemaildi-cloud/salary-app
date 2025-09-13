import AddAttendance from "./AddAttendance";
import AttendanceList from "./AttendanceList";

function App() {
  return (
    <div style={{padding:20}}>
      <h2>Aplikasi Gaji Harian</h2>
      <AddAttendance />
      <AttendanceList />
    </div>
  );
}

export default App;
