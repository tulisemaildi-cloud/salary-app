import { useState } from "react";
import { db } from "./db";

export default function AddAttendance() {
  const [employeeName, setEmployeeName] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [baseSalary, setBaseSalary] = useState("");
  const overtimeRate = 20000;

  function calculateSalary() {
    const start = new Date(`${date}T${startTime}`);
    const end = new Date(`${date}T${endTime}`);
    const hours = (end - start) / (1000 * 60 * 60);

    const workHours = Math.min(hours, 8);
    const overtimeHours = hours > 8 ? hours - 8 : 0;

    const totalSalary = Number(baseSalary) + (overtimeHours * overtimeRate);

    return { workHours, overtimeHours, totalSalary };
  }

  async function saveAttendance(e) {
    e.preventDefault();
    const { workHours, overtimeHours, totalSalary } = calculateSalary();

    await db.attendance.add({
      employeeName,
      date,
      startTime,
      endTime,
      baseSalary: Number(baseSalary),
      workHours,
      overtimeHours,
      totalSalary
    });

    alert("Data gaji tersimpan!");
    setEmployeeName(""); setDate(""); setStartTime(""); setEndTime(""); setBaseSalary("");
  }

  return (
    <form onSubmit={saveAttendance}>
      <input type="text" placeholder="Nama Karyawan" value={employeeName} onChange={e=>setEmployeeName(e.target.value)} required/>
      <input type="date" value={date} onChange={e=>setDate(e.target.value)} required/>
      <input type="time" value={startTime} onChange={e=>setStartTime(e.target.value)} required/>
      <input type="time" value={endTime} onChange={e=>setEndTime(e.target.value)} required/>
      <input type="number" placeholder="Gaji Pokok" value={baseSalary} onChange={e=>setBaseSalary(e.target.value)} required/>
      <button type="submit">Simpan</button>
    </form>
  );
    }
