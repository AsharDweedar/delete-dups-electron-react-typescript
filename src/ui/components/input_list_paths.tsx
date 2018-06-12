import * as React from 'react';

import ListPaths from './list_paths';

export interface PropsInterface { add: Function; paths: {path: string}[]}

export default class InputListPaths extends React.Component<PropsInterface, {}> {
    constructor(props: PropsInterface) {
        super(props);
    }
    onBrows(e: { target: {} }) {
        let path = e.target["files"][0]["path"]
        this.props.add({ path })
    }
    show() {
        let ele = document.getElementById("newFolder") || { click: () => console.log("couldn't find the input file element") }
        ele.click()
    }
    render() {
        return (
            <div className="List">
                <input id="newFolder" type="file" onChange={this.onBrows.bind(this)} style={{ display: "none" }} />
                <ul className="collection with-header">
                    <li className="collection-header">
                        <h4 style={{ display: "inline-block" }}>Paths</h4>
                        <button
                            onClick={this.show}
                            style={{ float: "right" }}
                            className="btn-floating btn-large waves-effect waves-light green"> +
                    </button>
                    </li>
                    <ListPaths list={this.props["paths"]} />
                </ul>
            </div>
        );
    }
}
