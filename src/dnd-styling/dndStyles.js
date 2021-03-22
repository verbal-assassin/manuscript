/**
 * DndStyling - will probably be renamed. This class is used
 * to encapsulate the logic of the various places where 
 * Drag and Drop is utilized.
 */
export default class DndStyling {
  static grid = 8
  
  /**
   * 
   * @param {*} isDragging 
   * @param {*} draggableStyle 
   */
  static getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    // padding: grid * 1,
    margin: `0 0 ${this.grid}px 0`,

    // change background colour if dragging
    background: isDragging ? "lightgreen" : "white",

    // styles we need to apply on draggables
    ...draggableStyle
  })
  
  /**
   * 
   * @param {*} isDraggingOver 
   */
  static getListStyle = isDraggingOver => ({
    background: isDraggingOver ? "lightblue" : "white",
    padding: this.grid,
    width: 250
  })

  /**
   * reorder - method to reorder the given list after 
   * the object has been dropped into the appropriate
   * slot.
   * 
   * @param {*} list 
   * @param {*} startIndex 
   * @param {*} endIndex 
   */
  static reorder = (list, startIndex, endIndex) => {

    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    return result
  }
}