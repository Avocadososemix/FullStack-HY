import React from 'react'

const Content = ({parts}) => {
    return (
      <div>
        {parts.map((course) => (
          <Part part={course.name} exercises={course.exercises} />
        ))}
        <Total parts={parts}/>
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


const Header = ({name}) => {
  return (
    <div>
      <h2>
        {name}
      </h2>
    </div>
  )
}

const Total = ({parts}) => {
  let sum = parts.reduce((a, b) => ({exercises: a.exercises + b.exercises}));

  return (
    <div>
      <p>
      <b>Total of {sum.exercises} exercises</b>
      </p>
    </div>
  )
}

const Course = ({name, parts}) => {
  return (
    <div>
       <Header name={name} />
       <Content parts={parts} />
    </div>
  )
}

export default Course