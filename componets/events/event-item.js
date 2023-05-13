import classes from "./event-item.module.css";
import Button from "../ui/button";
import DateIcon from "../icons/date-icon";
import ArrowRightIcon from "../icons/arrow-right-icon";
import AddressIcon from "../icons/address-icon";

const EventItem = (props) => {
  const { title, image, date, location, id } = props;

  const fomrattedAddress = location.replace(", ", "\n");
  const exploreLink = `/events/${id}`;

  return (
    <li className={classes.item}>
      <img src={`/${image}`} alt={title} />
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>{title}</h2>
          <div className={classes.date}>
            <DateIcon />
            <time>{date}</time>
          </div>
          <div className={classes.address}>
            <AddressIcon />
            <address>{fomrattedAddress}</address>
          </div>
        </div>
        <div className={classes.actions}>
          <Button link={exploreLink}>
            <span>
              Explore event!
            </span>
            <span className={classes.icon}>
              <ArrowRightIcon />
            </span>
          </Button>
        </div>
      </div>
    </li>
  );
};

export default EventItem;
