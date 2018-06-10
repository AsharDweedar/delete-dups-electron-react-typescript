import * as React from 'react';
import { TextInput } from 'belle';

import List from './list';

export interface PropsInterface { addToList: Function; name: string; message: string }

export default class InputListPaths extends React.Component<any, {}> {
    constructor(props: PropsInterface) {
        super(props);
        this.state = {
            "paths": [{ value: "Ashar" }, { value: "Aseel" }]
        }
    }
    onBrows(e : {target: {}}) {
        console.log(e.target["files"][0]["path"]) // C:\realpath\options.tsx
    }
    onInsert({ value }: { value: string}) {
        this.state[this.props.name].push(value)
    }
    render() {
        return (
            <div style={{ width: "40%", display: "inline-block" }}>
                <button onClick={() => document.getElementById("newFolder").click()} className="btn-floating btn-large waves-effect waves-light red">+</button>
                <input id="newFolder" type="file" onChange={this.onBrows} style={{display: "none"}}  webkitdirectory />
                <List list={this.state["paths"]} name="paths" />
            </div>
        );
    }
}
