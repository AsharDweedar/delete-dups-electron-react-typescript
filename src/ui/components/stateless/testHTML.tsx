import * as React from 'react';
import TestInterface from '../../interfaces/TestInterface'

const TestHTML = (props: TestInterface) => (
    <div>
        <h1>TestHTML Component</h1>
        Hello, {props.name}
        <br />
        You are {props.age} years old,
                <br />
        You live at: {props.address}
        <br />
        you were born at: {props.dob.toDateString()}
    </div>
)

export default TestHTML