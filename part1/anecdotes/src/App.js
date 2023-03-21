import { useState } from 'react'

const MostVotedAnecdote = ({anecdotes, votes}) => {
    const mostVoted = votes.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0);
    return (
        <div>
            <h1>Anecdote with most votes</h1>
            {anecdotes[mostVoted]}   
            <div>
                has {votes[mostVoted]} votes
            </div>

        </div>
    );
}
const App = () => {
    const anecdotes = [
        'If it hurts, do it more often.',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
        'The only way to go fast, is to go well.'
    ]

    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState(Array(8).fill(0))

    const generateRandomNumber = () => {
        setSelected(Math.floor(Math.random() * 8));
    }

    const vote = () => {
        setVotes(votes.map((x, i) => i === selected ? x + 1 : x));
    }
    console.log(selected);
    console.log("votes", votes);
    return (
        <div>
            <h1>Anecdote of the day</h1>
            <div>
            {anecdotes[selected]}
</div>
            <div>
            has {votes[selected]} votes
            </div>
            <div>
            <button onClick={vote}>vote</button>
            <button onClick={generateRandomNumber} >next anecdote</button>
            </div>
            <MostVotedAnecdote anecdotes={anecdotes} votes={votes} />
        </div>
    )
}

export default App

