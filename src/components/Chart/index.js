import React from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export default function index(props) {
  //     const patientHistory = useSelector(selectPatientHistory)
  // const bata =  patientHistory

  // console.log("bata", bata)
  console.log("chart props", props);
  const data = props.data;

  return (
    <LineChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 5,
        left: 5,
        bottom: 5,
      }}
    >
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis dataKey="date" />
      <YAxis type="number" domain={[0, 5]} />
      <Tooltip />
      <Legend />
      {/* <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} /> */}
      <Line
        type="monotone"
        dataKey="itchScore"
        stroke="#0062e6"
        activeDot={{ r: 8 }}
      />
    </LineChart>
  );
}
