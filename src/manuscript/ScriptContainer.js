import React, { useState, useEffect, Fragment } from "react";
import { Grid, Card } from "semantic-ui-react";
import { ScriptText } from "./ScriptText";

export const ScriptContainer = ({ text, fontSize }) => {
  return (
    <Fragment>
      <Grid>
        <Grid.Row>
          <Grid.Column width={16}>
            <h1
              style={{ textAlign: "center"}}>Title</h1>
            <Card.Group centered>
              <Card>
                <Card.Content>
                  <Card.Header>Words</Card.Header>
                  <Card.Meta>Number of words in the manuscript</Card.Meta>
                  <Card.Description>3285</Card.Description>
                </Card.Content>
              </Card>
              <Card>
                <Card.Content>
                  <Card.Header>Chapters</Card.Header>
                  <Card.Meta>Number of chapters in the manuscript</Card.Meta>
                  <Card.Description>15</Card.Description>
                </Card.Content>
              </Card>
              <Card>
                <Card.Content>
                  <Card.Header>Other?</Card.Header>
                  <Card.Meta>Other meta to display?</Card.Meta>
                  <Card.Description>3285</Card.Description>
                </Card.Content>
              </Card>
            </Card.Group>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16}>
            <ScriptText 
              fontSize={8}/>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Fragment>
  );
};
