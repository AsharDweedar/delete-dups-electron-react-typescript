import * as React from 'react';
import { TextInput } from 'belle';

import ListExt from './list_extensions';

export interface PropsInterface { add: Function; ext: [{value: string}] }

export default class InputListExtensions extends React.Component<any, {}> {
    constructor(props: PropsInterface) {
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
            <div className="List">
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
