import { useState } from 'react';

const Total = (props) => {

    return (
        <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
    );
}
const Part = (props) => {
    return (
        <p>{props.part} {props.exercise}</p>
    );
}
const Content = (props) => {
    return (
        <>
            <Part part={props.parts[0].name} exercise={props.parts[0].exercises} />
            <Part part={props.parts[1].name} exercise={props.parts[1].exercises} />
            <Part part={props.parts[2].name} exercise={props.parts[2].exercises} />
        </>
    );
}

const Header = (props) => {
    console.log(props);
    return (
        <h1>{props.course}</h1>
    );
}
 
// const Counter = () => {
//     const [counter, setCounter] = useState(0);
//     console.log('rendering with counter value', counter);
//     const increaseByOne = () => {
//         console.log('increasing, value before', counter)
//         setCounter(counter + 1)
//     };
//     const decreaseByOne = () => {
//         console.log('decreasing, value before', counter)
//         setCounter(counter - 1);
//     }
//     const setToZero = () => {
//         console.log("resetting to zero, value before", counter)
//         setCounter(0);
//     }
//     console.log("rendering...");
//     return (
//         <>
//             <Display counter={counter} />
//             <Button handleClick={increaseByOne} text="Plus" />
//             <Button handleClick={decreaseByOne} text="Minus" />
//             <Button handleClick={setToZero} text="Reset" />
//         </>
//     );
// }
// const Display = ({ counter }) => <div>{counter}</div>;

// const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>;

// const LeftRight = () => {
//     const [allClicks, setAll] = useState([]);
//     const [left, setLeft] = useState(0);
//     const [right, setRight] = useState(0);
//     const [total, setTotal] = useState(0);


//     const handleLeftClick = () => {
//         setAll(allClicks.concat('L'));
//         console.log('left before', left)
//         const updatedLeft = left + 1;
//         setLeft(updatedLeft);
//         console.log('left after', left)
//         setTotal(updatedLeft + right);
//     }

//     const handleRightClicks = () => {
//         setAll(allClicks.concat('R'));
//         const updatedRight = right + 1;
//         setRight(updatedRight)
//         setTotal(updatedRight + right);
//     }
//     return (
//     <div>
//         {left}
//         <Button handleClick={handleLeftClick} text="left" />
//         <Button handleClick={handleRightClicks} text="right" />
//         {right}
//         <History allClicks={allClicks}/>
//         <p>total: {total}</p>
//     </div>
//     );

// }

// const History = (props) => {
//     if (props.allClicks.length === 0) {
//         return <div>the app is used by pressing buttons</div>
//     }

//     return (
//     <div>
//         button press history: {props.allClicks.join(' ')}
//     </div>)
// }

// const EventHandling = () => {
//     const [value, setValue] = useState(10);

//     return (
//         <div>
//             {value}
//             <button onClick={() => console.log('clicked the button')}>reset to zero</button>
//         </div>
//     );
// }



const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10
            },
            {
                name: 'Using props to pass data',
                exercises: 7
            },
            {
                name: 'State of a component',
                exercises: 14
            }]
    }

    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
            {/* <Counter /> */}
            {/* <LeftRight /> */}
            {/* <EventHandling /> */}
        </div>
    );
}


export default App
