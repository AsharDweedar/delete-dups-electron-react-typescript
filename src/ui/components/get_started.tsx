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
        <div style={{
          justifyContent: "center", display: "flex", alignContent: "center", padding: "0.5em"
        }}>
          <Options />
          <a className="waves-effect waves-light btn-large right" style={{ margin: "2.5em" }}><i className="material-icons left">cloud</i>Start Scanning</a>
        </div>
        <div style={{
          "justifyContent": "center", display: "flex", alignContent: "flex-start"
        }}>
          <InputListPaths
            add={this.props.addPath}
            paths={this.props["paths"]}
          />
          <InputListExtensions
            add={this.props.addEXT}
            ext={this.props["ext"]}
            ExtCase={this.props.ExtCase}
            ExtCaseChange={this.props.ExtCaseChange}
          />
        </div>
      </div>
    );
  }
}
