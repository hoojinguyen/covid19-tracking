import React, { useEffect, useState, useMemo, useCallback } from "react";
import "./App.css";
import CountrySelector from "./components/CountrySelector";
import Highlight from "./components/Highlight";
import Summary from "./components/Summary";

import { Container, makeStyles } from "@material-ui/core";
import { getCountries, getReportByCountry } from "./services";
import { sortBy } from "lodash";

const useStyles = makeStyles({
  wrapperLogo: { maxWidth: "100%", textAlign: "center" },
  logo: { width: "20%" },
  margin: { marginTop: "20px", marginBottom: "20px" },
});

const getSummary = (value) => {
  return [
    {
      title: "Cases",
      count: value ? value.Confirmed : 0,
      type: "Confirmed",
    },
    {
      title: "Recoveries",
      count: value ? value.Recovered : 0,
      type: "Recovered",
    },
    {
      title: "Deaths",
      count: value ? value.Deaths : 0,
      type: "Deaths",
    },
  ];
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountryId, setSelectedCountryId] = useState("");
  const [report, setReport] = useState([]);

  const classes = useStyles();

  const summary = useMemo(() => {
    if (report && report.length) {
      const latestData = report[report.length - 1];
      return getSummary(latestData);
    }
    return [];
  }, [report]);

  useEffect(() => {
    getCountries().then((res) => {
      setCountries(sortBy(res.data, "Country"));
      setSelectedCountryId("vn");
    });
  }, []);

  useEffect(() => {
    if (selectedCountryId) {
      getReportByCountry(selectedCountryId).then(({ data }) => {
        if (data && data.length) {
          data.pop();
          setReport(data);
        }
      });
    }
  }, [selectedCountryId, countries]);

  const handleOnChange = useCallback((e) => {
    setSelectedCountryId(e.target.value);
  }, []);

  return (
    <Container style={{ marginTop: 20 }}>
      <div className={classes.wrapperLogo}>
        <img
          alt="logo"
          src="https://flad-hkteam.s3.ap-southeast-1.amazonaws.com/background-images/corona-virus-4984021_640.jpeg"
          className={classes.logo}
        />
      </div>
      <div className={classes.margin}>
        <CountrySelector
          value={selectedCountryId}
          countries={countries}
          handleOnChange={handleOnChange}
        />
      </div>
      <div className={classes.margin}>
        <Highlight summary={summary} />
      </div>
      <div className={classes.margin}>
        <Summary report={report} countryId={selectedCountryId} />
      </div>
    </Container>
  );
};

export default App;
