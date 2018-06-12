import * as React from 'react';

import ListPaths from './list_paths';

export interface PropsInterface { addToList: Function; name: string; message: string }

export default class InputListPaths extends React.Component<any, {}> {
    constructor(props: PropsInterface) {
        super(props);
        this.state = {
            "paths": [{ value: "Ashar/Fayez/Dweedar" }, { value: "Aseel/Fayez/Dweedar" }]
        }
    }
    onBrows(e: { target: {} }) {
        console.log(e.target["files"][0]["path"]) // \path\to\file.ext
        this.onInsert({ value: e.target["files"][0]["path"] })
    }
    onInsert(value: { value: string }) {
        let paths = this.state["paths"].concat([value])
        console.log(paths)
        this.setState({ paths })
    }
    render() {
        return (
            <div style={{ width: "45%", display: "inline-block" }}>
                <input id="newFolder" type="file" onChange={this.onBrows.bind(this)} style={{ display: "none" }} webkitdirectory />
                <ul className="collection with-header">
                    <li className="collection-header">
                        <h4 style={{ display: "inline-block" }}>Paths</h4>
                        <button
                            onClick={() => document.getElementById("newFolder").click()}
                            style={{ float: "right" }}
                            className="btn-floating btn-large waves-effect waves-light green"> +
                    </button>
                    </li>
                    <ListPaths list={this.state["paths"]} />
                </ul>
            </div>
        );
    }
}
