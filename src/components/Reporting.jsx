import React from "react";

const ReportComponent = ({ data }) => {
  const calculatePercentage = (present, total) =>
    total > 0 ? ((present / total) * 100).toFixed(2) : "0.00";

  const ReportSection = ({ title, stats }) => (
    <div className="p-4 border rounded-lg shadow-sm bg-white">
      <h2 className="text-lg font-semibold mb-3">{title}</h2>
      <div className="space-y-2">
        <p className="text-gray-700">
          <span className="font-medium">Total Registered Workers:</span>{" "}
          {stats.total}
        </p>
        <p className="text-gray-700">
          <span className="font-medium">Total Present:</span> {stats.present}
        </p>
        <p className="text-gray-700">
          <span className="font-medium">Total Absent:</span> {stats.absent}
        </p>
        <p className="text-gray-700">
          <span className="font-medium">Percentage Present:</span>{" "}
          {calculatePercentage(stats.present, stats.total)}%
        </p>
      </div>
    </div>
  );

  return (
    <div className="p-6 space-y-6 bg-gray-50">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Report Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ReportSection title="Total Overview" stats={data.overview} />
        <ReportSection title="Main Auditorium" stats={data.mainAud} />
        <ReportSection title="East Auditorium" stats={data.eastAud} />
        <ReportSection title="Reserved" stats={data.reserved} />
      </div>
    </div>
  );
};

const reportData = {
  overview: { total: 200, present: 150, absent: 50 },
  mainAud: { total: 100, present: 80, absent: 20 },
  eastAud: { total: 70, present: 50, absent: 20 },
  reserved: { total: 30, present: 20, absent: 10 },
};

const Reporting = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <ReportComponent data={reportData} />
  </div>
);

export default Reporting;
