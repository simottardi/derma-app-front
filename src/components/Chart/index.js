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

/* const data = [
  {
    name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
  },
  {
    name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
  },
  {
    name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
  },
  {
    name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
  },
  {
    name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
  },
  {
    name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
  },
  {
    name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
  },
]; */

//     const patientHistory = useSelector(selectPatientHistory)
// const bata =  patientHistory

// console.log("bata", bata)

//     const data = [
//   {
//     name: 'Page A', uv: 0, //pv: 2400, amt: 2400,
//   },
//   {
//     name: 'Page B', uv: 1, //pv: 1398, amt: 2210,
//   },
//   {
//     name: 'Page C', uv: 2, //pv: 9800, amt: 2290,
//   },
//   {
//     name: 'Page D', uv: 4, //pv: 3908, amt: 2000,
//   },
//   {
//     name: 'Page E', uv: 2, //pv: 4800, amt: 2181,
//   },
//   {
//     name: 'Page F', uv: 1, //pv: 3800, amt: 2500,
//   },
//   {
//     name: 'Page G', uv: 0, //pv: 4300, amt: 2100,
//   },
// ];

export default function index(props) {
  //     const patientHistory = useSelector(selectPatientHistory)
  // const bata =  patientHistory

  // console.log("bata", bata)
  console.log("chart props", props);
  const data = props.data;

  return (
    <div>
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="date" />
        <YAxis type="number" domain={[0, 5]} />
        <Tooltip />
        <Legend />
        {/* <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} /> */}
        <Line type="monotone" dataKey="itchScore" stroke="#82ca9d" />
      </LineChart>
    </div>
  );
}
