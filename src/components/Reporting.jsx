import React, { useEffect, useState } from "react";
import supabase from "../services/supabase";

const Reporting = () => {
  const [data, setData] = useState({
    overview: { total: 0, present: 0, absent: 0 },
    mainAud: { total: 0, present: 0, absent: 0 },
    eastAud: { total: 0, present: 0, absent: 0 },
    reserved: { total: 0, present: 0, absent: 0 },
  });
  const [loading, setLoading] = useState(true);

  const calculatePercentage = (present, total) =>
    total > 0 ? ((present / total) * 100).toFixed(2) : "0.00";

  // const fetchTotals = async () => {
  //   setLoading(true);
  //   try {
  //     // Fetch mainAud total
  //     const { data: mainAudData, error: mainAudError } = await supabase
  //       .from("workertables")
  //       .select("id", { count: "exact" })
  //       .neq("code", "Reserved");

  //     if (mainAudError) throw mainAudError;

  //     // Fetch eastAud total
  //     const { data: eastAudData, error: eastAudError } = await supabase
  //       .from("workertablesinactive")
  //       .select("id", { count: "exact" });

  //     if (eastAudError) throw eastAudError;

  //     // Fetch reserved total
  //     const { data: reservedData, error: reservedError } = await supabase
  //       .from("workertables")
  //       .select("id", { count: "exact" })
  //       .eq("code", "Reserved");

  //     if (reservedError) throw reservedError;

  //     const mainAudTotal = mainAudData.length;
  //     const eastAudTotal = eastAudData.length;
  //     const reservedTotal = reservedData.length;

  //     const totalOverview = mainAudTotal + eastAudTotal + reservedTotal;

  //     // Update state
  //     setData({
  //       overview: { total: totalOverview, present: 0, absent: 0 },
  //       mainAud: { total: mainAudTotal, present: 0, absent: 0 },
  //       eastAud: { total: eastAudTotal, present: 0, absent: 0 },
  //       reserved: { total: reservedTotal, present: 0, absent: 0 },
  //     });
  //   } catch (error) {
  //     console.error("Error fetching data from Supabase:", error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const fetchTotals = async () => {
    setLoading(true);
    try {
      // Fetch mainAud totals and present count
      const { data: mainAudData, error: mainAudError } = await supabase
        .from("workertables")
        .select("*", { count: "exact" })
        .neq("code", "Reserved");
  
      const { data: mainAudPresentData, error: mainAudPresentError } = await supabase
        .from("workertables")
        .select("*", { count: "exact" })
        .neq("code", "Reserved")
        .eq("ispresent", true); // Assuming `status` is the column indicating presence
  
      if (mainAudError) throw mainAudError;
      if (mainAudPresentError) throw mainAudPresentError;
  
      // Fetch eastAud totals and present count
      const { data: eastAudData, error: eastAudError } = await supabase
        .from("workertablesinactive")
        .select("*", { count: "exact" });
  
      const { data: eastAudPresentData, error: eastAudPresentError } = await supabase
        .from("workertablesinactive")
        .select("*", { count: "exact" })
        .eq("ispresent", true);
  
      if (eastAudError) throw eastAudError;
      if (eastAudPresentError) throw eastAudPresentError;
  
      // Fetch reserved totals and present count
      const { data: reservedData, error: reservedError } = await supabase
        .from("workertables")
        .select("*", { count: "exact" })
        .eq("code", "Reserved");
  
      const { data: reservedPresentData, error: reservedPresentError } = await supabase
        .from("workertables")
        .select("*", { count: "exact" })
        .eq("code", "Reserved")
        .eq("ispresent", true);
  
      if (reservedError) throw reservedError;
      if (reservedPresentError) throw reservedPresentError;
  
      const mainAudTotal = mainAudData.length;
      const mainAudPresent = mainAudPresentData.length;
  
      const eastAudTotal = eastAudData.length;
      const eastAudPresent = eastAudPresentData.length;
  
      const reservedTotal = reservedData.length;
      const reservedPresent = reservedPresentData.length;
  
      const totalOverview = mainAudTotal + eastAudTotal + reservedTotal;
      const totalPresent = mainAudPresent + eastAudPresent + reservedPresent;
  
      // Update state
      setData({
        overview: {
          total: totalOverview,
          present: totalPresent,
          absent: totalOverview - totalPresent,
        },
        mainAud: {
          total: mainAudTotal,
          present: mainAudPresent,
          absent: mainAudTotal - mainAudPresent,
        },
        eastAud: {
          total: eastAudTotal,
          present: eastAudPresent,
          absent: eastAudTotal - eastAudPresent,
        },
        reserved: {
          total: reservedTotal,
          present: reservedPresent,
          absent: reservedTotal - reservedPresent,
        },
      });
    } catch (error) {
      console.error("Error fetching data from Supabase:", error.message);
    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
    fetchTotals();
  }, []);

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

  if (loading) {
    return <div className="text-center p-6">Loading...</div>;
  }

  return (
    <div className="p-24 space-y-6">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Report Overview
        </h1>
        <button
          className="bg-green-500 py-2 px-6 rounded-2xl text-white cursor-pointer"
          onClick={async () => {
            await fetchTotals();
          }}
        >
          Reload
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ReportSection title="Total Overview" stats={data.overview} />
        <ReportSection title="Main Aud" stats={data.mainAud} />
        <ReportSection title="East Aud" stats={data.eastAud} />
        <ReportSection title="Reserved" stats={data.reserved} />
      </div>
    </div>
  );
};

export default Reporting;
