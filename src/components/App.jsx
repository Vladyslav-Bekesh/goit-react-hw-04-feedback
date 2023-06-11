import { useState } from 'react';

import Stats from './stats';
import FeedbackOptions from './FeedbackOptions';
import SectionTitle from './SectionTitle';
import Notification from './Notification';

export function App(params) {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const countTotalFeedback = () => {
    return good + neutral + bad;
  };

  const countPositiveFeedback = () => {
    return ((good / countTotalFeedback()) * 100).toFixed(0);
  };

  const increaseFeedback = ({ target: { name } }) => {
    switch (name) {
      case 'good':
        setGood(prevState => prevState + 1);
        break;

      case 'neutral':
        setNeutral(prevState => prevState + 1);
        break;

      case 'bad':
        setBad(prevState => prevState + 1);
        break;

      default:
        return;
    }
  };

  return (
    <>
      <SectionTitle title="Please leave feeback">
        <form>
          <FeedbackOptions
            options={['good', 'neutral', 'bad']}
            increaseFeedback={increaseFeedback}
          ></FeedbackOptions>
        </form>
      </SectionTitle>

      {good !== 0 || neutral !== 0 || bad !== 0 ? (
        <SectionTitle title="Statistic">
          <Stats
            good={good}
            neutral={neutral}
            bad={bad}
            total={countTotalFeedback}
            countPositiveFeedback={countPositiveFeedback}
          ></Stats>
        </SectionTitle>
      ) : (
        <Notification message="There is no feedback"></Notification>
      )}
    </>
  );
}
