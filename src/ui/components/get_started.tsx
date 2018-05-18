import * as React from 'react';
import List from './list';
import { Toggle } from 'belle';

export interface EventInterface { value: boolean; }

export default class GetStarted extends React.Component<any, {}> {
    constructor(props: {}) {
        super(props);
        this.state = {
            "delete?": false,
            "priorties?": true,
            "priortiesPath": "/tmp/priorties.json",
            "resresh": false
        }
    }
    optionsUpdate (key: string, event: EventInterface) {
        this.state[key] = event.value
        this.setState({refresh : true})
    }
    render() {
        return (
            <div>
                <h6>should delete duplicates?</h6>
                <Toggle defaultValue={false} onUpdate={(e: EventInterface) => this.optionsUpdate("delete?", e)} />
                {this.state["delete?"] && <p><h6>should delete according to prirties?</h6>
                <Toggle defaultValue onUpdate={(e: EventInterface) => this.optionsUpdate("prirties?", e)} /> </p>}
                <List list={[{ name: "ashar" }, { name: "aseel" }]} />
            </div>
        );
    }
}
