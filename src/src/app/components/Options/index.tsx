import * as React from 'react';
import Switch from 'antd/lib/switch';
import 'antd/lib/switch/style';
import Icon from 'antd/lib/icon';
import 'antd/lib/icon/style';
export class Options extends React.Component<Options.Props, {}> {
  constructor(props: {}) {
    super(props);
    this.state = {
      'delete?': false,
      'priorities?': true,
      prioritiesPath: '/tmp/priorities.json',
      'ext_case_sensitive?': false,
    };
  }
  deleteUpdate(event: boolean) {
    // if (event.value && this.state["priorities?"]) {
    if (event) {
      return this.setState({
        'priorities?': false,
        'delete?': event,
      });
    }
    this.setState({ 'delete?': event });
  }
  prioritiesUpdate(event: boolean) {
    this.setState({ 'priorities?': event });
  }
  render() {
    // let p = this.state["priorities?"]
    let p = true;
    return (
      <div style={{ width: '70%', display: 'inline-block' }}>
        <table className="responsive-table">
          <tbody>
            <tr>
              <td>should delete duplicates once found?</td>
              <td>
                <Switch
                  checkedChildren={<Icon type="check" />}
                  unCheckedChildren={<Icon type="close" />}
                  defaultChecked={false}
                  onChange={(e: boolean): any => this.deleteUpdate(e)}
                />
              </td>
            </tr>
            <tr>
              <td>should delete according to priorities?</td>
              <td>
                <Switch
                  checkedChildren={<Icon type="check" />}
                  unCheckedChildren={<Icon type="close" />}
                  defaultChecked={p}
                  onChange={(e: boolean): any => this.prioritiesUpdate(e)}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Options;

export namespace Options {
  export interface Props {}
}
