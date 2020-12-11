import React from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Typography, Accordion, AccordionDetails } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  title: {
    fontSize: 14,
  },
}));

const AccordionSummary = withStyles({
  content: {
    flexGrow: 0,
  },
})(MuiAccordionSummary);

export default function index(props) {
  //  console.log("chart props", props);
  const data = props.data;
  console.log("data", data);

  return (
    <Accordion
      style={{
        paddingTop: 12,
        paddingBottom: 12,
        paddingRight: 12,
        paddingLeft: 12,
        backgroundColor: "#decbf5",
        marginTop: 6,
        marginBottom: 12,
        width: "90%",
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography variant="h6">Your eczema chart</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
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
          </ResponsiveContainer>
        </div>
      </AccordionDetails>
    </Accordion>
  );
}
