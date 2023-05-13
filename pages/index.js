import EventList from "../componets/events/event-list";
import { getFeaturedEvents } from "../dummy-data";

const HomePage = () => {
  const featureEvents = getFeaturedEvents();

  return (
    <div>
      <EventList items={featureEvents} />
    </div>
  );
};

export default HomePage;
