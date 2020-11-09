import React, { useState, useEffect } from 'react';
import { Container } from 'reactstrap';
import './event-page.css';
import { getAllEvents } from '../../APIFunctions/Event';
import EventCard from './EventCard';
import EventInfoModal from './EventInfoModal';
import Header from '../../Components/Header/Header';

function AnnouncementList() {
  const [modal, setModal] = useState(false);
  const [currentEvent, setEvent] = useState(null);
  const [eventList, setEventList] = useState();
  const [validList, setValidList] = useState();

  async function toggle() {
    setModal(!modal);
  }

  const modalProps = {
    currentEvent,
    modal,
    toggle
  };

  const headerProps = {
    title: 'SCE Event Page'
  };

  async function populateEventList() {
    let currDate = new Date().getDate();
    console.log(currDate);
    console.log("I am in populateEventsList()");
    const eventResponse = await getAllEvents();
    if (!eventResponse.error) setEventList(eventResponse.responseData);
    //getFilteredEvents();
  }

  const getFilteredEvents= () => {
    console.log("I am in getFilteredEvents()");
    try {
      var currDate = new Date().getDate();
      console.log(currDate);
      let validList = [];
      console.log("Before for loop");
      console.log(eventList);
     // console.log("Length: " + eventList.length);
      for (let i = 0; i < 5; i++){
        console.log("Inside for loop");
        console.log(eventList[i]);
      }
      eventList.forEach(item => {
        console.log("Trying to print event date");
        console.log(item.eventDate);
        console.log("Success printed event date");
        if (item.eventDate >= currDate) {
          validList.push(item);
        }
      }, setValidList(validList));
      // validList.forEach(function(item) {
      //     console.log(item);           
      // })
    } catch (error) {
      const alertText = 'There are no events to filter!';
      // window.setTimeout(() => {
      //   alert(alertText);
      // }, 1750)
    }
  }

  useEffect(() => {
    async function fetchData() {
      await populateEventList();
    }
    fetchData();
  }, []);

  function handleClick(clickedEvent) {
    setEvent(clickedEvent);
    toggle();
  }

  return (
    <div className='event-background'>
      <Header {...headerProps} />
      <Container className='event-list'>
        {currentEvent === null ? <></> : <EventInfoModal {...modalProps} />}
        {console.log(eventList)}
        {getFilteredEvents()}
        {eventList && eventList.length ? (
          eventList.reverse().map((event, index) => {
            return (
              <EventCard
                key={index}
                handleClick={() => handleClick(event)}
                {...event}
              />
            );
          })
        ) : (
          <h1>No events yet!</h1>
        )}
      </Container>
    </div>
  );
}

export default AnnouncementList;
