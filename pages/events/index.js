import { Fragment } from "react";
import EventList from "../../componets/events/event-list";
import EventsSearch from "../../componets/events/events-search";
import { getAllEvents } from "../../dummy-data";
import { useRouter } from "next/router";

const EventsPage = () => {
  const events = getAllEvents();
  const router = useRouter();

  const findEventsHandler = (year, month) => {
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  };

  return (
    <Fragment>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </Fragment>
  );
};

export default EventsPage;
