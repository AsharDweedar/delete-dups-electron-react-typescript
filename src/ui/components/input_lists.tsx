import * as React from 'react';
import { TextInput } from 'belle';

import List from './list';

export interface PropsInterface { addToList: Function; name: string; message: string }

export default class InputLists extends React.Component<any, {}> {
    constructor(props: PropsInterface) {
        super(props);
        this.state = {
            [props.name]: [{ value: "Ashar" }, { value: "Aseel" }]
        }
    }
    onBrows(e) {
    // onBrows(e: HTMLInputElement) {
        console.log(e.target.value) // C:\fakepath\options.tsx
    }
    onInsert({ value }: { value: string}) {
        this.state[this.props.name].push(value)
    }
    render() {
        let p = this.props
        return (
            <div style={{ width: "40%", display: "inline-block" }}>
                {p.name == "paths" && <input type="file" onChange={this.onBrows} webkitdirectory />}
                <TextInput defaultValue={p.message} />
                <List list={this.state[p.name]} name={p.name} />
            </div>
        );
    }
}
