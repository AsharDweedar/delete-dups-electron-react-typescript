import * as React from 'react';
import List from './list';

export default class GetStarted extends React.Component<any, {}> {
    constructor() {
        super();
    }
    render() {
        return (
            <div>
                <h2>Welcome To get started Component!</h2>
                <div>
                    <h1>GetStarted Component</h1>
                    <List list={[{ name: "ashar" }, { name: "aseel" }]} />
                </div>
            </div>
        );
    }
}
