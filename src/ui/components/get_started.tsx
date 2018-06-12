import * as React from 'react';

import InputListPaths from './input_list_paths';
import InputListExtensions from './input_list_extensions';
import Options from './options';

export interface EventInterface { value: boolean; }

export default class GetStarted extends React.Component<any, {}> {
  constructor(props: {}) {
    super(props);
  }
  optionsUpdate(key: string, event: EventInterface) {
    this.state[key] = event.value
    this.setState({ refresh: true })
  }
  listsUpdate(key: string, value: string) {
    this.state[key].push(value)
  }
  render() {
    return (
      <div>
        <Options />
        <div style={{ "justify-content": "center", display: "inline-flex"}}>
          <div style={{ "align-items": "stretch"}} >
            <InputListPaths add={this.props.addPath} paths={this.props["paths"]} />
          </div>
          <div style={{ "align-items": "stretch"}} >
            <InputListExtensions add={this.props.addEXT} ext={this.props["ext"]} />
          </div>
        </div>
      </div>
    );
  }
}
