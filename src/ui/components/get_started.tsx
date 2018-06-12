import * as React from 'react';

import InputListPaths from './input_list_paths';
import InputListExtensions from './input_list_extensions';
import Options from './options';

export default class GetStarted extends React.Component<any, {}> {
  constructor(props: {}) {
    super(props);
  }
  render() {
    return (
      <div>
        <Options />
        <div style={{ "justifyContent": "center", display: "inline-flex" }}>
          <div style={{ "alignItems": "stretch" }} >
            <InputListPaths add={this.props.addPath} paths={this.props["paths"]} />
          </div>
          <div style={{ "alignItems": "stretch" }} >
            <InputListExtensions add={this.props.addEXT} ext={this.props["ext"]} />
          </div>
        </div>
      </div>
    );
  }
}
