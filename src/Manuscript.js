import React, { Fragment, useState, useContext } from 'react';
import Editor from './Editor'
import './manuscript.css'

function Manuscript(props) {
  return (
    <div>
      <h1>A Webpage Template</h1>

      <p>You can use the <em>grid-area</em> property to name grid items.</p>
      <p>You can refer to the name when you set up the grid layout, by using the <em>grid-template-areas</em> property on the grid container.</p>
      <p>This grid layout contains six columns and three rows:</p>

      <div class="grid-container">
        <div class="item1">Header</div>
        <div class="item2">tools</div>
        <div class="item3">
          <Editor />
        </div>
        <div class="item4">Chapters</div>
        <div class="item5">Footer</div>
      </div>
    </div>
  )
}

export default Manuscript