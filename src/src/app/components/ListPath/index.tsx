import * as React from "react";

import * as classNames from "classnames";
import * as style from "./style.css";

// import { Checkbox } from "antd";

import { PathModel } from "app/models";

export namespace ListPath {
  export interface Props {
    paths: PathModel[];
    deletePath: Function;
  }
}

export class ListPath extends React.Component<ListPath.Props> {
  deletePath(e: any) {
    var id = e.target["id"];
    this.props.deletePath({ id: parseInt(id) });
  }

  renderList(list: PathModel[]) {
    let deletePath = this.deletePath.bind(this);
    return (
      <div>
        {list.map((path: PathModel) => (
          <li className="collection-item" key={path.path}>
            <Element path={path} deletePath={deletePath} />
          </li>
        ))}
      </div>
    );
  }

  render() {
    let list = this.props.paths;
    if (list.length) return this.renderList(list);
    return (
      <li className="collection-item" key="empty">
        <li className="collection-item">
          <div>No Paths Selected</div>
        </li>
      </li>
    );
  }
}

export default ListPath;

type EventHandler = (event: any) => void;
const Element = (params: { path: PathModel; deletePath: EventHandler }) => {
  const classes = classNames(
    {
      [style.inputter]: true,
    },
    style.normal
  );
  var { path, deletePath } = params;
  // TODO: input does not appear
  return (
    <div>
      <form>
        <p>
          <label>
            <input
              id="myID"
              className={classes}
              style={{ border: "3px solid red" }}
              title="doneScanning"
              name="scanComplete"
              type="checkbox"
              disabled
              checked={true}
            />
          </label>
        </p>
      </form>
      {path.id != -1 && CheckCompleteElement(path.scan_completed)}
      {path.path}
      {path.id != -1 && DeleteElement(deletePath, path.id)}
    </div>
  );
};

const CheckCompleteElement = (status: boolean) => (
  <span>Done: {`${status}`}</span>
);
// <Checkbox disabled checked={status} />);
// <div>
//   <form>
//     <p>
//       <label>
//         <input
//           style={{
//             // backgroundColor: "#eee",
//             width: "20px",
//             height: "20px",
//           }}
//           type="checkbox"
//           checked={true}
//         />
//       </label>
//     </p>
//   </form>
// </div>);

const DeleteElement = (deletePath: EventHandler, id: number) => (
  <a href="#!" className="secondary-content">
    <i className="material-icons" onClick={deletePath} id={`${id}`}>
      delete
    </i>
  </a>
);
