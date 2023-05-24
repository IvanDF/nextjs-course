import { useRef, useState } from "react";

const HomePage = () => {
  const emailInputRef = useRef();
  const feedbackInputRef = useRef();

  const [feedbackItems, setFeedbackItems] = useState([]);

  const submitFormHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredFeedback = feedbackInputRef.current.value;

    const body = { email: enteredEmail, text: enteredFeedback };

    fetch("/api/feedbacks", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => response.json()).then((data) => console.log(data));
  };

  const loadFeedbackHandler = () => {
    fetch("/api/feedbacks").then((response) => response.json()).then(
      (data) => setFeedbackItems(data.feedback),
    );
  };

  return (
    <div>
      <h1>The home page</h1>

      <form onSubmit={submitFormHandler}>
        <div>
          <label htmlFor="email">Your email address</label>
          <input type="email" id="email" ref={emailInputRef} />
        </div>
        <div>
          <label htmlFor="message">Your feedback</label>
          <textarea id="message" rows={5} ref={feedbackInputRef} />
        </div>
        <button type="submit">Send feedback</button>
      </form>
      <hr />
      <button onClick={loadFeedbackHandler}>Load feedbacks</button>
      <ul>
        {feedbackItems.map((item) => <li key={item.id}>{item.text}</li>)}
      </ul>
    </div>
  );
};

export default HomePage;
