import * as React from 'react';

import ListPaths from './list_paths';

export default class InputListPaths extends React.Component<InputPathsListI, any> {
    constructor(props: InputPathsListI) {
        super(props);
    }
    show() {
        const { dialog } = require('electron').remote;
        var [path] = dialog.showOpenDialog({
            properties: ['openDirectory']
        });
        this.props.add({ path })
    }
    render() {
        return (
            <div style={{ display: "inline-block", "alignItems": "stretch", "margin": "50px", "maxWidth": "45%" }}>
                <ul className="collection with-header">
                    <li className="collection-header">
                        <h4 style={{ display: "inline-block" }}>Paths</h4>
                        <button
                            onClick={this.show.bind(this)}
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
