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
        <div style={{
          "justifyContent": "center", display: "flex", alignContent: "flex-start"}}>
            <InputListPaths add={this.props.addPath} paths={this.props["paths"]} />
            <InputListExtensions add={this.props.addEXT} ext={this.props["ext"]} />
        </div>
      </div>
    );
  }
}
