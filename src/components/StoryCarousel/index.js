import React from "react";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { deleteStory } from "../../store/user/actions";

export default function StoryCarousel(props) {
  const dispatch = useDispatch();

  const onDelete = id => {
    console.log("deleting story!", id);
    dispatch(deleteStory(id));
  };
  return (
    <Carousel className='mt-5'>
      {props.homepage.stories.map(story => {
        return (
          <Carousel.Item key={story.id}>
            {story.imageUrl ? (
              <img
                className='d-block w-100'
                src={story.imageUrl}
                alt={story.name}
              />
            ) : null}
            <Carousel.Caption
              style={{
                backgroundColor: `${props.homepage.backgroundColor}99`,
                color: props.homepage.color
              }}
              className='p-5'
            >
              <h3>{story.name}</h3>
              <p>{story.content}</p>
              <Button variant='danger' onClick={() => onDelete(story.id)}>
                Delete story
              </Button>
            </Carousel.Caption>
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
}
