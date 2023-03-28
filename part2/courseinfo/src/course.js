const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => <p><strong>Total of {sum} exercises</strong></p>

const Part = ({ part }) =>
    <p>
        {part.name} {part.exercises}
    </p>

const Content = ({ parts }) => {
    const partsList = parts.map((x) => <Part key={x.id} part={x} />)
    return partsList;
}


const Course = ({ course }) => {
    const total = course.parts.reduce((x, y) => {
        console.log('what is happening', x, y)
        return x + y.exercises;
    }, 0)
    return (
        <>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total sum={total} />
        </>
    )
}

export default Course;
