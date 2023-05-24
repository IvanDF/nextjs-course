import { Fragment, useState } from "react";
import { buildFeedbackPath, extractFeedback } from "../api/feedbacks";

const FeedbackPage = (props) => {
  const [feedbackData, setFeedbackData] = useState();

  const loadFeedbackHadnler = (id) => {
    fetch(`/api/${id}`).then((response) => response.json()).then((data) => {
      setFeedbackData(data.feedback);
    });
  };

  return (
    <Fragment>
      {feedbackData && <p>{feedbackData.email}</p>}

      <ul>
        {props.feedbackItems.map((item) => (
          <li key={item.id}>
            {item.text}
            <button onClick={loadFeedbackHadnler.bind(null, item.id)}>
              Show details
            </button>
          </li>
        ))}
      </ul>
    </Fragment>
  );
};

export const getStaticProps = () => {
  const filePath = buildFeedbackPath();
  const data = extractFeedback(filePath);

  return {
    props: {
      feedbackItems: data,
    },
  };
};

export default FeedbackPage;
