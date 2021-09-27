// pages/index.js

import React from "react";
import { Typography, Paper, Grid } from "@material-ui/core";

import { Fragment } from "react";
import { CraftToolbox } from "./CraftToolbox";
import { CraftSettingsPanel } from "./CraftSettingsPanel";
import { CraftTopbar } from "./CraftTopBar";
import { CraftContainer } from "./CraftContainer";
import { CraftCard } from "./CraftCard";
import { CraftButton } from "./CraftButton";
import { CraftText } from "./CraftText";
import { Editor, Frame, Element } from "@craftjs/core";

export const CraftEditor = () => {
  return (
    <Fragment>
      <div style={{margin: "0 auto", width: "800px"}}>
        <Typography variant="h5" align="center">
          A super simple page editor
        </Typography>
        <Editor
          resolver={{ CraftCard, CraftButton, CraftText, CraftContainer }}
        >
          <CraftTopbar />
          <Grid container spacing={3} style={{ paddingTop: "10px" }}>
            <Grid item xs>
              <Frame>
                <Element
                  is={CraftContainer}
                  padding={5}
                  background="#eee"
                  canvas
                >
                  <CraftCard />
                  <CraftButton size="small" variant="outlined">
                    Click
                  </CraftButton>
                  <CraftText size="small" text="Hi world!" />
                  <Element
                    is={CraftContainer}
                    padding={6}
                    background="#999"
                    canvas
                  >
                    <CraftText size="small" text="It's me again!" />
                  </Element>
                </Element>
              </Frame>
            </Grid>

            <Grid item xs={3}>
              <Paper>
                <CraftToolbox />
                <CraftSettingsPanel />
              </Paper>
            </Grid>
          </Grid>
        </Editor>
      </div>
    </Fragment>
  );
};
