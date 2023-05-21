export const getAllEvents = async () => {
  const r = await fetch(
    "https://next-s-course-f67e0-default-rtdb.firebaseio.com/events.json",
  );
  const data = await r.json();

  const events = [];

  for (const key in data) {
    events.push({
      id: key,
      ...data[key],
    });
  }

  return events;
};

export const getFeaturedEvents = async () => {
  const allEvents = await getAllEvents();

  return allEvents.filter((event) => event.isFeatured);
};

export const getEventById = async (id) => {
  const allEvents = await getAllEvents();

  return allEvents.find((event) => event.id === id);
};

export const getFilteredEvents = async (dateFilter) => {
  const allEvents = await getAllEvents();

  const { year, month } = dateFilter;

  let filteredEvents = allEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return eventDate.getFullYear() === year &&
      eventDate.getMonth() === month - 1;
  });

  return filteredEvents;
};
