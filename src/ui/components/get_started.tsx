import * as React from 'react';

import InputListPaths from './input_list_paths';
import InputListExtensions from './input_list_extensions';
import Options from './options';

export interface EventInterface { value: boolean; }

export default class GetStarted extends React.Component<any, {}> {
    constructor(props: {}) {
        super(props);
        this.state = {
            "delete?": false,
            "priorities?": true,
            "prioritiesPath": "/tmp/priorities.json",
            "refresh": false,
            "paths": [{ path: "Ashar" }, { path: "Aseel" }],
            "extensions": [{ value: ".png" }, { value: ".jpeg" }]
        }
    }
    optionsUpdate (key: string, event: EventInterface) {
        this.state[key] = event.value
        this.setState({refresh : true})
    }
    listsUpdate (key: string, value: string) {
        this.state[key].push(value)
    }
    addPath (e: {target: {}}) {
        console.log(e.target["value"]);
    }
    addEXT (ele: {value: string}) {
        let extensions = this.state["extensions"].concat([ele])
        this.setState({ extensions })
    }
    render() {
        return (
            <div>
                <Options />
                <InputListPaths add={this.addPath.bind(this)}/>
                <InputListExtensions add={this.addEXT.bind(this)} ext={this.state["extensions"]}/>
            </div>
        );
    }
}
