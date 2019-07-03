import * as React from "react";
import { ExtModel } from "app/models";
// import { Toggle } from "belle";

import Switch from "antd/lib/switch";
import Icon from "antd/lib/icon";

export class ListExt extends React.Component<ListExt.Props> {
  render() {
    let list = this.props.exts;
    let HtmlList = list.map((ext: ExtModel) => (
      <Element
        deleteExt={this.props.deleteExt}
        ext={ext}
        key={ext.id}
        toggleSensitive={this.props.toggleSensitive}
      />
    ));
    return (
      <div>
        {list.length ? (
          HtmlList
        ) : (
          <li className="collection-item" key="empty">
            <Element
              deleteExt={this.props.deleteExt}
              ext={{ ext: "empty-extensions-list", sensitive: false, id: -1 }}
              toggleSensitive={this.props.toggleSensitive}
            />
          </li>
        )}
      </div>
    );
  }
}

export default ListExt;

export namespace ListExt {
  export interface Props {
    exts: ExtModel[];
    toggleSensitive: Function;
    deleteExt: Function;
  }
}

const Element = ({
  ext,
  toggleSensitive,
  deleteExt,
}: {
  ext: ExtModel;
  toggleSensitive: Function;
  deleteExt: Function;
}) => {
  var value = ext.ext;
  return value == "" ? null : (
    <li className="collection-item">
      <div>
        {ext.id != -1 && (
          <span style={{ marginLeft: "2.5%" }}>
            <Switch
              checkedChildren={<Icon type="check" />}
              unCheckedChildren={<Icon type="close" />}
              defaultChecked={ext.sensitive}
              onChange={(): any => toggleSensitive(ext)}
            />
          </span>
        )}
        {value}
        {ext.id != -1 && (
          <a href="#!" className="secondary-content">
            <i onClick={() => deleteExt(ext)} className="material-icons">
              delete
            </i>
          </a>
        )}
      </div>
    </li>
  );
};
