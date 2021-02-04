import React, { PureComponent } from 'react'

const Content = ({parts}) => {
  console.log(parts)
    return (
      <div>
        {parts.map((course) => (
          console.log(course.name, course.exercises),
          <Part part={course.name} exercises={course.exercises} />
        ))}
      </div>
    )
}

const Part = ({part, exercises}) => {
  return (
    <div>
      <p>
        {part} {exercises} 
      </p>
    </div>
  )
}


const Header = (props) => {
  return (
    <div>
      <h1>
        {props.course}
      </h1>
    </div>
  )
}

const Total = ({parts}) => {
  let exercisesCount = 0
  {parts.map((course) => (
    exercisesCount += course.exercises
  ))}
  return (
    <div>
      <p>
      Number of exercises {exercisesCount} 
      </p>
    </div>
  )
}

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
      }
    ]
  }


  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App