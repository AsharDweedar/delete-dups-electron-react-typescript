import * as React from 'react';

import InputLists from './input_lists';
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
                <InputLists name="paths" message="Type folders paths to include in the search"/>
                <InputLists name="extensions" message="Type files Extensions to include in the search"/>
                
            </div>
        );
    }
}
