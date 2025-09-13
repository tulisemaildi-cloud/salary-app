import { useEffect, useState } from "react";
import { db } from "./db";

export default function AttendanceList() {
  const [list, setList] = useState([]);

  useEffect(() => {
    async function load() {
      setList(await db.attendance.toArray());
    }
    load();
  }, []);

  return (
    <div>
      <h3>Riwayat Gaji Harian</h3>
      <table border="1">
        <thead>
          <tr>
            <th>Tanggal</th><th>Nama</th><th>Jam</th><th>Lembur</th><th>Total Gaji</th>
          </tr>
        </thead>
        <tbody>
          {list.map(r => (
            <tr key={r.id}>
              <td>{r.date}</td>
              <td>{r.employeeName}</td>
              <td>{r.workHours} jam</td>
              <td>{r.overtimeHours} jam</td>
              <td>Rp {r.totalSalary.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
            }
