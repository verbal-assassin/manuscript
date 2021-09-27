import React, { Fragment, useState } from 'react';
import { Grid, Button } from 'semantic-ui-react'

import Chapters from '../chapters/Chapters'
import SaveWarning from './SaveWarning'
import './Writing.css'

function Writing(props) {
  const [chapterText, setChapterText] = useState('<i>Select a chapter to get started</i>');
  const [chapterId, setChapterId] = useState('')
  const [isDirty, setIsDirty] = useState(false)
  const [saveWarningOpen, setSaveWarningOpen] = useState(false)
  //const [timer, setTimer] = useState(0)

  const ChapterSelected = async (chapterId) => {

    await retrieveChapterFromLibrary(chapterId)

  }
  /**
   * onTextUpdated is called during the updating of the chapter text,
   * yes, this will be called for every character typed in the ReactQuill
   * component.
   * 
   * @param {HTML} content new content
   * @param {object} delta expressing the change
   * @param {object} source the source of the change
   * @param {object} editor read only proxy to editor
  const onTextUpdated = (content, delta, source, editor) => {
    //
    //  is dirty will come into play soon...
    //
    setIsDirty(true)
    setChapterText(content)
    clearTimeout(timer)
    setTimer(setTimeout(saveManuscript, 5000))
    if(isDirty){
    }
  }
  */
  /**
   * retrieveChapterFromLibrary() method will retrieve the specified chapter
   * from the library API using the chapterId guid indentifier.
   * 
   * @param {GUID} chapterId the guid identifying this chapter.  This value
   * is used to correctly update the right chapter using the library API.
   */
  const retrieveChapterFromLibrary = async (chapterId) => {

    if (isDirty);
   //   setSaveWarningOpen(true)
   // } else {

      const url = `http://localhost:8091/manuscript/chapter/${chapterId}`

      let response = await fetch(url)
      let data = await response.json()
      if (data === null || data === undefined) {
        data = 'Chapter Not Found'
      }
      
      setChapterText(data[0].chapterText)
      setChapterId(chapterId)
      setIsDirty(false)
  //  }
  }//
  /**
   * updateChapterText is the method responsible for updating the 
   * chapter text in the library for this manuscript.
   */
  const updateChapterText = async () => {
    /*
    const url = `http://localhost:8091/manuscript/chapter/${chapterId}`
    var update = { chapterText: chapterText }

    var response = await fetch(url, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(update)
    })

    console.log(response)
    */
  }

  if (props.data.length > 0) {
    return (
      <Fragment>
        <SaveWarning open={saveWarningOpen} toggle={setSaveWarningOpen}/>
        <Grid>
            <Grid.Column width={10}>
            </Grid.Column>
            <Grid.Column width={5}>
              <Chapters onChapterSelected={ChapterSelected} data={props.data[0].chapters} />
            </Grid.Column>
            <Grid.Column width={1}>
            </Grid.Column>
        </Grid>
      </Fragment>
    )
  } else {
    return (
      <Fragment />
    )
  }

}

export default Writing