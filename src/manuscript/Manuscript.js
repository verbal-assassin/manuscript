import React, { Fragment, useState, useEffect } from "react";
import { Grid, Card } from "semantic-ui-react";
import { Route, Switch } from "react-router-dom";

import Home from "../Home";
import Characters from "../characters/Characters";
import Writing from "../writing/Writing";
import Locations from "../locations/Locations";
import LocationManager from "../logic/LocationManager";
import ManuscriptManager from "../logic/ManuscriptManager";
import Cartographer from "../logic/Cartographer";

import appConfig from "../AppConfig";

import "./manuscript.css";
import { useSelector } from "react-redux";

function Manuscript(props) {
  const [manuscript, setManuscript] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const manuscriptId = useSelector((state) => state.manuscriptId);

  const manager = new ManuscriptManager(appConfig);

  const getManuscript = async () => {
    console.log(`getManuscript ${manuscriptId}`);
    const manuscript = await manager.Get(manuscriptId);
    setManuscript(manuscript);
  };

  //  '60274612a2786815445b259f' TODO  adding a dependency on useeffect will cause getManuscript to fire when that value changes.

  useEffect(() => {
    console.log(`useEffect ${manuscriptId}`);

    getManuscript("pp");
    setRefresh(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  const WritingComponent = () => <Writing data={manuscript} />;

  const CharactersComponent = () => <Characters data={manuscript} />;

  const LocationsComponent = () => (
    <Locations
      data={manuscript}
      manager={new LocationManager(appConfig)}
      onRefresh={setRefresh}
      meta={new Cartographer(appConfig)}
    />
  );

  return (
    <Fragment>
      <Grid>
        <Grid.Row>
          <Grid.Column width={16}>
            <Card.Group centered>
              <Card>
                <Card.Content>
                  <Card.Header>Words</Card.Header>
                  <Card.Meta>Number of words in the manuscript</Card.Meta>
                  <Card.Description>
                    3285
                  </Card.Description>
                </Card.Content>
              </Card>
              <Card>
                <Card.Content>
                  <Card.Header>Chapters</Card.Header>
                  <Card.Meta>Number of chapters in the manuscript</Card.Meta>
                  <Card.Description>
                    15
                  </Card.Description>
                </Card.Content>
              </Card>
              <Card>
                <Card.Content>
                  <Card.Header>Other?</Card.Header>
                  <Card.Meta>Other meta to display?</Card.Meta>
                  <Card.Description>
                    3285
                  </Card.Description>
                </Card.Content>
              </Card>

            </Card.Group>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={4}></Grid.Column>
          <Grid.Column width={12}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/manuscript" component={WritingComponent} />
              <Route exact path="/characters" component={CharactersComponent} />
              <Route exact path="/locations" component={LocationsComponent} />
            </Switch>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Fragment>
  );
}

export default Manuscript;
