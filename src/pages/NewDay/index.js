import React from "react";
import NewDayForm from "./NewDayForm";
import { Container, Grid, Typography } from "@material-ui/core";

export default function newday() {
  return (
    <Container>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        style={{ marginTop: 12, marginBottom: 12 }}
      >
        <Typography
          variant="h5"
          justify="center"
          align="center"
          style={{ marginBottom: 12 }}
        >
          New diary entry
        </Typography>
        <NewDayForm />
      </Grid>
    </Container>
  );
}
