import React, { useState } from 'react';
import Chapter from './Chapter';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import DndStyling from '../dnd-styling/dndStyles'
import { Grid, Card, Button } from 'semantic-ui-react'
import './Chapter.css'


function Chapters(props) {
  /*
    state management
  */
    const [sortedChapters, setSortedChapters] = useState( (props.data.length === 0 ? [] : props.data))

  const resetData = () => {
    console.log('data would be reset')
  }

  /**
   * 
   * @param {*} result 
   */
  const onDragEnd = (result) => {

    // dropped outside the list
    if (!result.destination) {
      return
    }

    const items = DndStyling.reorder(
      sortedChapters,
      result.source.index,
      result.destination.index
    )

    setSortedChapters(items)
  }


  return (

    <div className='characterForm'>
      <h2>Chapters</h2>
      <Grid>
        <Grid.Column width={16}>
          <Card.Group>
            <Card>
              <Button onClick={resetData} fluid>Start New Chapter</Button>
            </Card>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable">
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      style={DndStyling.getListStyle(snapshot.isDraggingOver)}
                    >
                      
                      {sortedChapters.map((chapter, index) =>
                        <Draggable key={chapter.guid} draggableId={chapter.guid} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={DndStyling.getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style
                              )}>
                              {
                                <Chapter click={props.onChapterSelected} chapterInfo={chapter} />
                              }
                            </div>
                          )}
                        </Draggable>
                      )}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
          </Card.Group>
        </Grid.Column>
      </Grid>
    </div>
  )
}

export default Chapters;