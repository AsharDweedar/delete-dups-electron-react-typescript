import * as React from "react";
import { PathModel } from "app/models";
export class ListPath extends React.Component<ListPath.Props> {
  deletePath(e: any) {
    var id = e.target["id"];
    this.props.deletePath({ id: parseInt(id) });
  }
  render() {
    let deletePath = this.deletePath.bind(this);
    let list = this.props.paths;
    let HTMLlist = list.length
      ? list.map((path: PathModel) => (
          <li className="collection-item" key={path.path}>
            {<Element path={path} deletePath={deletePath} />}
          </li>
        ))
      : [
          <li className="collection-item" key="empty">
            {
              <Element
                path={{
                  path: "No Paths Selected",
                  id: -1,
                  scan_completed: false,
                  recursively: false,
                }}
                deletePath={deletePath}
              />
            }
          </li>,
        ];

    return <div>{HTMLlist}</div>;
  }
}

export default ListPath;

export namespace ListPath {
  export interface Props {
    paths: PathModel[];
    deletePath: Function;
  }
}

let Element = (params: {
  path: PathModel;
  deletePath: (event: any) => void;
}) => {
  var { path, deletePath } = params;
  return (
    <li className="collection-item">
      <div>
        {path.path}
        {path.id != -1 && (
          <a href="#!" className="secondary-content">
            <i
              className="material-icons"
              onClick={deletePath}
              id={`${path.id}`}
            >
              delete
            </i>
          </a>
        )}
      </div>
    </li>
  );
};
