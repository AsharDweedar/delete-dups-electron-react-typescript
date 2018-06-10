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
            "extensions": [{ ext: ".png" }, { ext: ".jpeg" }]
        }
    }
    optionsUpdate (key: string, event: EventInterface) {
        this.state[key] = event.value
        this.setState({refresh : true})
    }
    listsUpdate (key: string, value: string) {
        this.state[key].push(value)
    }
    render() {
        return (
            <div>
                <Options />
                <InputListPaths />
                <InputListExtensions />
                
            </div>
        );
    }
}
