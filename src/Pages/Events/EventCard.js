import React from 'react';
import { Row } from 'reactstrap';
import { getDateWithSlashes } from '../../APIFunctions/Event';
import { mapPinSymbol, clockSymbol } from '../Overview/SVG';

function EventCard(props) {
  const {
    title,
    description,
    eventDate,
    eventLocation,
    startTime,
    endTime,
    handleClick,
    imageURL
  } = props;

  return (
    <button
      className='event-card-button'
      onClick={() => {
        handleClick();
      }}
    >
      <img id='event-image'
        className='event-image'
        src={imageURL} alt=''
      />
      <div className='event-text-block'>
      <Row className='event-title'>{title}</Row>
      <div className='event-info'>
        <Row style= {{marginRight:'0px'}}> {description}</Row>
        <Row><b>DATE </b>
          : {getDateWithSlashes(eventDate.slice(0, 10))}
        </Row>
        <Row><b>TIME </b>: {startTime} - {endTime}</Row>
        <Row>
          <b>LOCATION </b>
          : {eventLocation}
        </Row>
      </div>
      </div>
    </button>
  );
}

export default EventCard;
