import { Fragment } from "react";
import EventList from "../../componets/events/event-list";
import EventsSearch from "../../componets/events/events-search";
import { getAllEvents } from "../../helpers/api-util.js";
import { useRouter } from "next/router";

const EventsPage = (props) => {
  const { events } = props;
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

export const getStaticProps = async () => {
  const events = await getAllEvents();

  return {
    props: {
      events,
    },
    revalidate: 60,
  };
};

export default EventsPage;
