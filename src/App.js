import React, { Fragment, useState, useEffect } from "react"
import { BrowserRouter } from "react-router-dom"
import { Grid } from "semantic-ui-react"

import ManuscriptManager from "./logic/ManuscriptManager"

import Manuscript from "./manuscript/Manuscript"
import Structure from "./manuscript/Structure"
import ToolHeader from "./ToolHeader"

import appConfig from "./AppConfig"
import { CraftEditor } from "./craft/CraftEditor"
import { ScriptContainer } from "./manuscript/ScriptContainer"

export default function App() {
  const manager = new ManuscriptManager(appConfig)
  const [refresh, setRefresh] = useState(false)
  const [manuscript, setManuscript] = useState([])
  const [locations, setLocations] = useState([])
  const [characters, setCharacters] = useState([])
  const [chapters, setChapters] = useState([])
  const [chapter, setChapter] = useState("")
  const [chapterText, setChapterText] = useState("")

  const getManuscript = async () => {
    const manuscript = await manager.Get("60274612a2786815445b259f")
    console.log(manuscript)
    setManuscript(manuscript)

    if (manuscript.length > 0) {
      console.log("setting locations")
      setLocations(manuscript[0].locations)
      setCharacters(manuscript[0].characters)
      setChapters(manuscript[0].chapters)
      setChapter(manuscript[0].chapters[0].guid)
    }
  }

  useEffect(() => {
    //
    //  first make sure chapters exist.
    //
    if(chapter !== ""){
      console.log(`Chapter = ${chapter}`)
    }
  }, [chapter])

  useEffect(() => {
    getManuscript()
    setRefresh(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh])

  const handleChapterChange = async (chapterGuid) => {
    //
    //  fires the useEffct because the chapter value of state
    //  has changed.
    //
    setChapter(chapterGuid)
    const text = await manager.GetChapter(chapterGuid)
    setChapterText(text)
  }

  return (
    <Fragment>
      {/*
          top bar, mainly handles the various "file" aspects
        */}
      <BrowserRouter>
        <Grid>
          <Grid.Column width={16}>
            <ToolHeader />
          </Grid.Column>
        </Grid>
        <Grid>
          {/*
              left side bar, typically made for navigation
            */}
          <Grid.Column width={3}>
            <Structure
              onChapterChange={handleChapterChange}
              locations={locations}
              characters={characters}
              chapters={chapters}
            />
          </Grid.Column>
          {/*
              Most of the good stuff will be done withing
              this particular section.
            */}
          <Grid.Column width={13}>
            <ScriptContainer manuscript={manuscript} chapterText={chapterText} />
          </Grid.Column>
        </Grid>
      </BrowserRouter>
    </Fragment>
  )
}
