import * as React from "react";

import { OptModel } from "app/models";

import Switch from "antd/lib/switch";
import "antd/lib/switch/style";
import Icon from "antd/lib/icon";
import "antd/lib/icon/style";

export namespace OneOption {
  export interface Props {
    opt: OptModel;
    onChange: Function;
  }
  export interface State {}
}

export class OneOption extends React.Component<
  OneOption.Props,
  OneOption.State
> {
  constructor(props: OneOption.Props) {
    super(props);
    this.handleSwitch = this.handleSwitch.bind(this);
  }
  handleSwitch(e: boolean): any {
    this.props.onChange(this.props.opt);
  }

  render() {
    return (
      <tr>
        <td>{this.props.opt.message}</td>
        <td>
          <Switch
            checkedChildren={<Icon type="check" />}
            unCheckedChildren={<Icon type="close" />}
            defaultChecked={this.props.opt.enabled}
            onChange={this.handleSwitch}
          />
        </td>
      </tr>
    );
  }
}

export default OneOption;
