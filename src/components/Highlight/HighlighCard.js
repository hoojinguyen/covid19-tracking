import React from "react";
import { Card, CardContent, Typography, makeStyles } from "@material-ui/core";
import CountUp from "react-countup";

const useStyles = makeStyles({
  wrapper: ({ type }) => {
    if (type === "Confirmed") return { borderLeft: "5px solid #c9302c" };
    if (type === "Recovered") return { borderLeft: "5px solid #28a745" };
    if (type === "Deaths") return { borderLeft: "5px solid gray" };
  },
  title: { fontSize: 18, marginBottom: 5 },
  count: { fontWeight: "bold", fontSize: 18 },
});

export default function HighlighCard({ title, count, type }) {
  const classes = useStyles({ type });

  return (
    <Card className={classes.wrapper}>
      <CardContent>
        <Typography variant="body2" component="p" className={classes.title}>
          {title}
        </Typography>
        <Typography variant="body2" component="span" className={classes.count}>
          <CountUp end={count} deruation={2} separator=" " />
        </Typography>
      </CardContent>
    </Card>
  );
}
