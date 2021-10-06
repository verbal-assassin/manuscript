import React, { Fragment, useState, useEffect } from "react";
import {
  List,
  Menu,
  Input,
  Divider,
  Header,
  Icon,
  Accordion,
} from "semantic-ui-react";
import "./manuscript.css";

function Structure(props) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;

    setActiveIndex(newIndex);
    
  };

  const handleChapterClick = (chapterGuid) => {
    
    console.log(`Chapter Guid => ${chapterGuid}`)
    props.onChapterChange(chapterGuid)
  }

  useEffect(() => {
    console.log(`PROPS => ${props}`);
  });

  return (
    <Fragment>
      <Divider horizontal>
        <Header as="h4">
          <Icon name="search" />
          Search
        </Header>
      </Divider>
      <Menu vertical>
        <Menu.Item>
          <Input placeholder="Search manuscript..." />
        </Menu.Item>
      </Menu>
      <Divider horizontal>
        <Header as="h4">
          <Icon name="book" />
          Manuscript
        </Header>
      </Divider>
      <List relaxed>
        <Accordion styled>
          <Accordion.Title
            active={activeIndex === 0}
            index={0}
            onClick={handleClick}
          >
            <Icon name="folder" />
            Chapters
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 0} exclusive={false}>
            <List.Item>
              <List.Content>
                <List.List>
                  {props.chapters &&
                    props.chapters.length > 0 &&
                    props.chapters.map((chapter) => {
                      return (
                        <List.Item onClick={() => handleChapterClick(chapter.guid)}>
                          <List.Icon name="file" />
                          <List.Content>
                            <List.Header>{`Chapter ${chapter.chapter}`}</List.Header>
                            <List.Description>
                              <i>{`Viewpoint ${chapter.viewpoint}`}</i>
                            </List.Description>
                          </List.Content>
                        </List.Item>
                      );
                    })}
                </List.List>
              </List.Content>
            </List.Item>
          </Accordion.Content>
          <Accordion.Title
            active={activeIndex === 1}
            index={1}
            onClick={handleClick}
          >
            <Icon name="folder" />
            Characters
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 1}>
            <List.Item>
              <List.Content>
                <List.List>
                  {props.characters &&
                    props.characters.length > 0 &&
                    props.characters.map((character) => {
                      return (
                        <List.Item>
                          <List.Icon name="file" />
                          <List.Content>
                            <List.Header>{`${character.firstname} ${character.lastname}`}</List.Header>
                            <List.Description>
                              {character.description}
                            </List.Description>
                          </List.Content>
                        </List.Item>
                      );
                    })}
                </List.List>
              </List.Content>
            </List.Item>
          </Accordion.Content>
        </Accordion>

        <Accordion styled exclusive={false}>
          <Accordion.Title
            active={activeIndex === 2}
            index={2}
            onClick={handleClick}
          >
            <Icon name="folder" />
            Locations
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 2}>
            <List.Item>
              <List.Content>
                <List.List>
                  {props.locations &&
                    props.locations.length > 0 &&
                    props.locations.map((location) => {
                      return (
                        <List.Item>
                          <List.Icon name="file" />
                          <List.Content>
                            <List.Header>{location.name}</List.Header>
                            <List.Description>
                              {location.description}
                            </List.Description>
                          </List.Content>
                        </List.Item>
                      );
                    })}
                </List.List>
              </List.Content>
            </List.Item>
          </Accordion.Content>
        </Accordion>
      </List>
    </Fragment>
  );
}

export default Structure;
