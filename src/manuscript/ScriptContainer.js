import React, { useState, useEffect, Fragment } from "react";
import { Grid, Card } from "semantic-ui-react";
import { ScriptText } from "./ScriptText";

export const ScriptContainer = (manuscript, chapterText) => {
  
  const [oldWordCount, setOldWordCount] = useState(0);

  const countWords = (str) => {
    str = str.replace(/(^\s*)|(\s*$)/gi, "");
    str = str.replace(/[ ]{2,}/gi, " ");
    str = str.replace(/\n /, "\n");

    return str.split(" ").length;
  }
  /**
   * handleWordCount  
   * 
   * A callback method blah, blah...
   * 
   * @param {String} textToCount string that needs word counting.
   * 
   * @returns {Number} number of words in the string named textToCount
   */
  const handleWordCount = (textToCount) => {

    let wordCount = countWords(textToCount)
    if( Math.abs(oldWordCount - wordCount) > 10){
      console.log("saving...")
      setOldWordCount(wordCount)
    }
  } 

  return (
    <Fragment>
      <Grid>
        <Grid.Row>
          <Grid.Column width={16}>
            <h1 style={{ textAlign: "center"}}>working title</h1>
            <h3 style={{ textAlign: "center"}}>author</h3>
            <h4 style={{ textAlign: "center"}}><i>blurb</i></h4>
            <Card.Group centered>
              <Card>
                <Card.Content>
                  <Card.Header>Words</Card.Header>
                  <Card.Meta>Number of words in the manuscript</Card.Meta>
                  <Card.Description>{oldWordCount}</Card.Description>
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
              onWordCountChange={handleWordCount}
              manuText={manuscript.chapterText} 
              fontSize={8}/>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Fragment>
  );
};
