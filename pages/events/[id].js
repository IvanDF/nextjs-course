import { getAllEvents, getEventById } from "../../helpers/api-util.js";
import { Fragment } from "react";
import EventSummary from "../../componets/event-detail/event-summary.js";
import EventLogistics from "../../componets/event-detail/event-logistics.js";
import EventContent from "../../componets/event-detail/event-content.js";
import ErrorAlert from "../../componets/ui/error-alert.js";

const EventDetailPage = (props) => {
  const event = props.event;

  if (!event) {
    return (
      <ErrorAlert>
        <p>No event found!</p>
      </ErrorAlert>
    );
  }

  return (
    <Fragment>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
};

export const getStaticProps = async (context) => {
  const eventId = context.params.id;

  const event = await getEventById(eventId);

  return {
    props: {
      event,
    },
    revalidate: 1800,
  };
};

export const getStaticPaths = async () => {
  const allEvents = await getAllEvents();

  const paths = allEvents.map((event) => ({ params: { id: event.id } }));

  return {
    paths,
    fallback: false, // Blocking wait untill the page is ready, not shows loading error or other
  };
};

export default EventDetailPage;
