import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import MapChart from "../Charts/MapChart";
import LineChart from "../Charts/LineChart";
import { getMapDataByCountryId } from "../../services";

export default function Summary({ report, countryId }) {
  const [mapData, setMapData] = useState({});
  useEffect(() => {
    if (countryId) {
      getMapDataByCountryId(countryId)
        .then((res) => {
          setMapData(res);
        })
        .catch((err) => console.log({ err }));
    }
  }, [countryId]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={8}>
        <LineChart data={report} />
      </Grid>
      <Grid item xs={12} sm={4}>
        <MapChart mapData={mapData} />
      </Grid>
    </Grid>
  );
}
