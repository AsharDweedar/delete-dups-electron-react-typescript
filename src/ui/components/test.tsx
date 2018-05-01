import * as React from 'react';
import TestInterface from '../interfaces/TestInterface'
import TestHTML from './stateless/testHTML'

export default class Test extends React.Component<TestInterface, {}> {
    constructor(props: TestInterface) {
        super(props);
        this.state = props
    }
    render() {
        return (
            <div>
                <h2>Welcome To Test Component!</h2>
                <TestHTML {...this.state}/>
            </div>
        );
    }
}