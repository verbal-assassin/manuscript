import React, { Fragment, useState, useEffect } from 'react';
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';

Font.register({
  family: 'Oswald',
  src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
});

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    fontFamily: 'Oswald'
  },
  author: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
    fontFamily: 'Oswald'
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: 'justify',
    fontFamily: 'Times-Roman'
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
});



// Create Document Component
function Renderer(props) {
  //
  // state management
  //
  const [manuscript, setManuscript] = useState([]);
  const [chapters, setChapters] = useState(["a", "bcd", "efg", "hijklmn"])

  const getManuscript = async () => {

    let response = await fetch('http://localhost:8091/manuscript/60274612a2786815445b259f')
    let data = await response.json()

    var chapterText = []
    await data[0].chapters.forEach(async(chapter) => {

      var currentChapterSet = chapters
      currentChapterSet.push("argh, what the hell?")
      setChapters(currentChapterSet)
      //await retrieveChapterFromLibrary(chapter.guid)
    })

    console.log(`logging chapters ${chapters}`)
  }

  useEffect(() => {
    
    getManuscript()
    console.log(`after get manuscript chapters ${chapters}`)
  }, [])


  const retrieveChapterFromLibrary = async (chapterId) => {

    const url = `http://localhost:8091/manuscript/chapter/${chapterId}`

    let response = await fetch(url)
    let data = await response.json()
    console.log(chapters)
    console.log('made it.')
  }


  return (
  <Fragment>
        { 
          chapters.map((chapter, index) => 
            <p>{chapter}</p>
        )}
  </Fragment>
  )
}

export default Renderer