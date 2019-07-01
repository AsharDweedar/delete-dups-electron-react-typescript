import * as React from "react";
import { PathModel } from "app/models";
export class ListPath extends React.Component<ListPath.Props> {
  render() {
    let list = this.props.paths;
    let HTMLlist = list.length
      ? list.map(({ path }: { path: string }) => (
          <li className="collection-item" key={path}>
            {/* {<Element path={path.split("/")} />} */}
            {<Element path={path} />}
          </li>
        ))
      : [
          <li className="collection-item" key="empty">
            {/* {<Element path={"empty-paths-list".split("/")} />} */}
            {<Element path={"empty-paths-list"} />}
          </li>,
        ];

    return <div>{HTMLlist}</div>;
  }
}

export default ListPath;

export namespace ListPath {
  export interface Props {
    paths: PathModel[];
  }
}

let Element = ({ path }: { path: string }) => (
  <li className="collection-item">
    <div>
      {path}
      {path != "empty-extensions-list" && (
        <a href="#!" className="secondary-content">
          <i className="material-icons">delete</i>
        </a>
      )}
    </div>
  </li>
);
