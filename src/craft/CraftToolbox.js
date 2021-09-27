// components/Toolbox.js
import React from "react";

import { Box, Typography, Grid, Button as MaterialButton } from "@material-ui/core";
import { Element, useEditor } from "@craftjs/core";

import { CraftContainer} from "./CraftContainer"
import { CraftCard } from './CraftCard'
import { CraftButton } from './CraftButton'
import { CraftText } from "./CraftText"

export const CraftToolbox = () => {
  const { connectors, query } = useEditor();

  return (
    <Box px={2} py={2}>
      <Grid container direction="column"  alignItems="center" justify="center" spacing={1}>
        <Box pb={2}>
          <Typography>Drag to add</Typography>
        </Box>
        <Grid container direction="column" item>
          <MaterialButton ref={ref=> connectors.create(ref, <CraftButton text="Click me" size="small" />)} variant="contained">Button</MaterialButton>
        </Grid>
        <Grid container direction="column" item>
          <MaterialButton ref={ref=> connectors.create(ref, <CraftText text="Hi world" />)} variant="contained">Text</MaterialButton>
        </Grid>
        <Grid container direction="column" item>
          <MaterialButton ref={ref=> connectors.create(ref, <Element is={CraftContainer} padding={20} canvas />)} variant="contained">Container</MaterialButton>
        </Grid>
        <Grid container direction="column" item>
          <MaterialButton ref={ref=> connectors.create(ref, <CraftCard />)} variant="contained">Card</MaterialButton>
        </Grid>
      </Grid>
    </Box>
  )
};