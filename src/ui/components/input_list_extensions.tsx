import * as React from 'react';
import { TextInput } from 'belle';

import List from './list';

export interface PropsInterface { addToList: Function; name: string; message: string }

export default class InputListExtensions extends React.Component<any, {}> {
    constructor(props: PropsInterface) {
        super(props);
        this.state = {
            "ext": [{ value: "Ashar" }, { value: "Aseel" }]
        }
    }
    onInsert({ value }: { value: string}) {
        this.state["ext"].push(value)
    }
    render() {
        let p = this.props
        return (
            <div style={{ width: "40%", display: "inline-block" }}>
                <TextInput defaultValue="Type files Extensions to include in the search" />
                <List list={this.state["ext"]} name={"ext"} />
            </div>
        );
    }
}
