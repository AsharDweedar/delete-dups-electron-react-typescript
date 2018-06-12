import * as React from 'react';
import { Toggle } from 'belle'

export default class Options extends React.Component<any, {}> {
    constructor(props: {}) {
        super(props);
        this.state = {
            "delete?": false,
            "priorities?": true,
            "prioritiesPath": "/tmp/priorities.json",
            "ext_case_sensitive?": false,
        }
    }
    deleteUpdate(event: EventI) {
        if (event.value && this.state["priorities?"]) {
            return this.setState({
                "priorities?": false,
                "delete?": event.value
            })
        } 
        this.setState({"delete?" : event.value})
    }
    prioritiesUpdate(event: EventI) {
        this.setState({ "priorities?": event.value })
    }
    render() {
        let p = this.state["priorities?"]
        return (
            <div>
                <h6>should delete duplicates once found?</h6>
                <span style={{width: "30%", display: "inline-block"}}>
                    <Toggle defaultValue={false} onUpdate={(e: EventI) => this.deleteUpdate(e)} />
                </span>

                <div>
                    <span style={{width: "30%", display: "inline-block"}}>
                        <h6>should delete according to priorities?</h6>
                        <Toggle defaultValue={p} value={p} onUpdate={(e: EventI) => this.prioritiesUpdate(e)} disabled={this.state["delete?"]}/>
                    </span>
                </div>
            </div>
        );
    }
}

