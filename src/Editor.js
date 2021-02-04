import React, { Fragment, useState, useContext } from 'react';
import './Editor.css'
var defaultText = {
  text:"# Type in Markdown styling to preview it \n Rendered by **marked**."
}

//Editor component that returns textarea and updates accordingly
export default class Editor extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      text:defaultText['text']
    };
    this.handleChange = this.handleChange.bind(this);
  }
  
  //on any change, update text to be the value of what's in textarea
  //also calls the props onChange method
  handleChange(event){
    this.setState({text:event.target.value});
    //this.props.onChange(event.target.value)
  }
  
  render(){ 
    //show in preview defaultText
    return( 
      <textarea 
        className = 'editor'
        spellCheck = 'true'
        rows = '20'
        value = {this.state.text} 
        onChange={this.handleChange}>
      </textarea>
    )
  }
}