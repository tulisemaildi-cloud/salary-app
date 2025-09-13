import Dexie from "dexie";

export const db = new Dexie("salaryDB");
db.version(1).stores({
  attendance: "++id, employeeName, date, startTime, endTime, baseSalary, workHours, overtimeHours, totalSalary"
});
