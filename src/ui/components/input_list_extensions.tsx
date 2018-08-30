import * as React from 'react';
import { TextInput, Toggle } from 'belle';

import ListExt from './list_extensions';

export default class InputListExtensions extends React.Component<any, {}> {
    constructor(props: InputListExtI) {
        super(props);
        this.state = {
            "adding": { value: "" }
        }
    }
    onInsert() {
        let value = this.state["adding"].value
        this.state["adding"] = {value: ""}
        this.props.add({ value })
    }
    toAdd(e: { value: string }) {
        let adding = { value: e.value }
        this.setState({ adding })
    }
    render() {
        let p = this.props["ExtCase"]
        return (
            <div style={{ display: "inline-block", "alignItems": "stretch", "margin": "50px", " maxWidth": "45%" }}>
                <ul className="collection with-header">
                    <li className="collection-header">
                        <h4 style={{ display: "inline-block" }}>Extensions</h4>
                        <span style={{"marginLeft" : "10%"}} >
                            Case Sensitive ? <span style={{ "marginLeft": "2.5%" }} ><Toggle defaultValue={p} value={p} onUpdate={this.props.ExtCaseChange} /></span>
                        </span>
                        <TextInput
                            placeholder="Type files Extensions to include in the search"
                            style={{ width: "80%", display: "inline-block" }}
                            onUpdate={this.toAdd.bind(this)}
                            value={this.state["adding"].value}
                        />
                        <button
                            onClick={this.onInsert.bind(this)}
                            style={{ float: "right" }}
                            className="btn-floating btn-small waves-effect waves-light green"> +
                        </button>
                    </li>
                    <ListExt list={this.props["ext"]} adding={this.state["adding"]} />
                </ul>
            </div>
        );
    }
}
