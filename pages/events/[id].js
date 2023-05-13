import { useRouter } from "next/router";
import { getEventById } from "../../dummy-data.js";
import { Fragment } from "react";
import EventSummary from "../../componets/event-detail/event-summary.js";
import EventLogistics from "../../componets/event-detail/event-logistics.js";
import EventContent from "../../componets/event-detail/event-content.js";
import ErrorAlert from "../../componets/ui/error-alert.js";

const EventDetailPage = () => {
  const router = useRouter();

  const eventId = router.query.id;
  const event = getEventById(eventId);

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

export default EventDetailPage;
