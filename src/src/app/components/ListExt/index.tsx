import * as React from "react";
import { ExtModel } from "app/models";

export class ListExt extends React.Component<ListExt.Props> {
  render() {
    let list = (console.log(this.props.extensions), this.props.extensions);
    let HtmlList = list.map(({ ext }: { ext: string }) => (
      <Element value={ext} key={ext} />
    ));
    return (
      <div>
        {list.length ? (
          HtmlList
        ) : (
          <li className="collection-item" key="empty">
            <Element value="empty-extensions-list" />
          </li>
        )}
        {/* {this.props.adding.value != "" && (
          <li className="collection-item">
            <div>{this.props.adding.value}</div>
          </li>
        )} */}
      </div>
    );
  }
}

export default ListExt;

export namespace ListExt {
  export interface Props { extensions: ExtModel[] }
}

const Element = ({ value }: { value: string }) =>
  value == "" ? null : (
    <li className="collection-item">
      <div>
        {value}
        {value != "empty-extensions-list" && (
          <a href="#!" className="secondary-content">
            <i className="material-icons">delete</i>
          </a>
        )}
      </div>
    </li>
  );
