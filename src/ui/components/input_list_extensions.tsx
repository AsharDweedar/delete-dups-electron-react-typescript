import * as React from 'react';
import { TextInput } from 'belle';

import ListExt from './list_extensions';

export default class InputListExtensions extends React.Component<any, {}> {
    constructor(props: InputListExtI) {
        super(props);
        this.state = {
            "adding": ""
        }
    }
    onInsert() {
        let value = this.state["adding"]
        this.props.add({ value })
    }
    toAdd(e: {value: string}) {
        this.state["adding"] = e.value
    }
    render() {
        return (
            <div style={{ display: "inline-block"}}>
                <ul className="collection with-header">
                    <li className="collection-header">
                        <h4 style={{ display: "inline-block" }}>Extensions</h4>
                        <TextInput 
                            placeholder="Type files Extensions to include in the search"
                            style={{width: "80%", display: "inline-block"}}
                            onUpdate={this.toAdd.bind(this)}
                        />
                        <button
                            onClick={this.onInsert.bind(this)}
                            style={{ float: "right" }}
                            className="btn-floating btn-small waves-effect waves-light green"> +
                        </button>
                    </li>
                    <ListExt list={this.props["ext"]} />
                </ul>
            </div>
        );
    }
}
