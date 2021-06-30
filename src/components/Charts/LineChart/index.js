import React, { useState, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import moment from "moment";
import { ButtonGroup, Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  btnGroup: { display: "flex", justifyContent: "flex-end" },
});

const generateOptions = (data) => {
  const categories = data.map((e) => moment(e.Date).format("DD/MM/YYYY"));
  return {
    chart: {
      height: 500,
    },
    title: {
      text: "",
    },
    xAxis: {
      categories,
      crosshair: { color: "#f28f43" },
      title: null,
    },
    yAxis: {
      min: 0,
      title: { text: null },
      labels: { align: "right" },
      crosshair: false,
    },
    colors: ["#f28f43"],
    series: [
      {
        name: "Cases",
        data: data.map((e) => e.Confirmed),
      },
    ],
  };
};

export default function LineChart({ data }) {
  const classes = useStyles();
  const [reportType, setReportType] = useState("all");
  const [options, setOptions] = useState({});

  useEffect(() => {
    let temp = data;
    switch (reportType) {
      case "all":
        temp = data;
        break;
      case "30":
        temp = data.slice(data.length - 30);
        break;
      case "7":
        temp = data.slice(data.length - 7);
        break;
      default:
        break;
    }

    setOptions(generateOptions(temp));
  }, [reportType, data]);

  return (
    <>
      <ButtonGroup
        size="small"
        aria-label="outlined primary button group"
        className={classes.btnGroup}
      >
        <Button
          color={reportType === "all" ? "secondary" : ""}
          onClick={() => setReportType("all")}
        >
          All
        </Button>
        <Button
          color={reportType === "30" ? "secondary" : ""}
          onClick={() => setReportType("30")}
        >
          30 Days
        </Button>
        <Button
          color={reportType === "7" ? "secondary" : ""}
          onClick={() => setReportType("7")}
        >
          7 Days
        </Button>
      </ButtonGroup>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </>
  );
}
