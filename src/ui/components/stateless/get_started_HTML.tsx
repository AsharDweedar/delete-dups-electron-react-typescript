import * as React from 'react';
import ConclusionInterface from '../../interfaces/ConclusionInterface'

const GetStartedHTML = (props: GetStartedInterface) => (
    <div>
        <h1>GetStartedHTML Component</h1>
        Hello, {props.name}
        <br />
        You are {props.age} years old,
                <br />
        You live at: {props.address}
        <br />
        you were born at: {props.dob.toDateString()}
    </div>
)

export default GetStartedHTML