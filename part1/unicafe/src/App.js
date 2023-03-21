import { useState } from 'react'

const Title = () => <h1>give feedback</h1>;

const Button = ({clickHandler, text}) => {
    return <button onClick={clickHandler}>{text}</button>
}

const Statistics = ({good, neutral, bad}) => {
    const totalReviews = good + bad + neutral;
    if (totalReviews === 0) {
        return <div>No feedback given</div>
    }
    return (
        <table>
            <thead></thead>
            <tbody>
                <StatisticLine text="good" value={good} />
                <StatisticLine text="neutral" value={neutral} />
                <StatisticLine text="bad" value={bad} />
                <StatisticLine text="all" value={totalReviews} />
                <StatisticLine text="average" value={(good-bad)/totalReviews} />
                <StatisticLine text="positive" value={good/totalReviews * 100 + ' %'} />
            </tbody>
        </table>
    );
}
const StatisticLine = ({text, value}) => {
    return <tr><td>{text}</td><td>{value}</td></tr>
}
const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const goodReview = () => {
        setGood(good + 1);
    }
    const neutralReview = () => {
        setNeutral(neutral + 1);
    }
    const badReview = () => {
        setBad(bad + 1);
    }
    return (
        <>
            <Title />
            <Button clickHandler={goodReview} text="good" />
            <Button clickHandler={neutralReview} text="neutral" />
            <Button clickHandler={badReview} text="bad" />
            <h1>statistics</h1>
            <Statistics good={good} bad={bad} neutral={neutral} />
        </>
    )
}

export default App
