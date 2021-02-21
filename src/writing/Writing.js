import React, { Fragment, useState, useEffect } from 'react';
import { Grid, Button } from 'semantic-ui-react'
import ReactQuill from 'react-quill'

import Chapters from '../chapters/Chapters'
import SaveWarning from './SaveWarning'
import './Writing.css'

function Writing(props) {
  const [chapterText, setChapterText] = useState('<i>Select a chapter to get started</i>');
  const [chapterId, setChapterId] = useState('')
  const [isDirty, setIsDirty] = useState(false)
  const [saveWarningOpen, setSaveWarningOpen] = useState(false)

  const chapterSelected = async (chapterId) => {

    console.log(`In writing, selected chapter=${chapterId}`)
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
   */
  const onTextUpdated = (content, delta, source, editor) => {

    setIsDirty(true)
    setChapterText(content)
  }
  /**
   * retrieveChapterFromLibrary() method will retrieve the specified chapter
   * from the library API using the chapterId guid indentifier.
   * 
   * @param {GUID} chapterId the guid identifying this chapter.  This value
   * is used to correctly update the right chapter using the library API.
   */
  const retrieveChapterFromLibrary = async (chapterId) => {

    if (isDirty) {
      setSaveWarningOpen(true)
    } else {

      const url = `http://localhost:8091/manuscript/chapter/${chapterId}`

      let response = await fetch(url)
      let data = await response.json()
      if (data === null || data === undefined) {
        data = 'Chapter Not Found'
      }
      
      setChapterText(data[0].chapterText)
      setChapterId(chapterId)
      setIsDirty(false)
    }
  }
  /**
   * updateChapterText is the method responsible for updating the 
   * chapter text in the library for this manuscript.
   */
  const updateChapterText = async () => {

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
  }


  if (props.chapters.length > 0) {
    return (
      <Fragment>
        <SaveWarning open={saveWarningOpen} toggle={setSaveWarningOpen}/>
        <Grid>
          <Grid.Row>
            <Grid.Column width={12}>
              <ReactQuill value={chapterText} onChange={onTextUpdated} />
              <Button onClick={updateChapterText} fluid icon='save' content='Save' />
            </Grid.Column>
            <Grid.Column width={4}>
              <Chapters onChapterSelected={chapterSelected} data={props.chapters[0].chapters} />
            </Grid.Column>
          </Grid.Row>
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