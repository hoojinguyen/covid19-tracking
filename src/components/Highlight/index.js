import React from "react";
import { Grid } from "@material-ui/core";
import HighlighCard from "./HighlighCard";

export default function Highlight({ summary }) {
  return (
    <Grid container spacing={3}>
      {summary.map((item) => (
        <Grid item sm={4} xs={12} key={item.type}>
          <HighlighCard
            title={item.title}
            count={item.count}
            type={item.type}
          />
        </Grid>
      ))}
    </Grid>
  );
}
