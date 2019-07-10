import * as React from "react";

// import * as classNames from "classnames";
// import * as style from "./style.css";

// import { Checkbox } from "antd";

import { PathModel } from "app/models";

export namespace ListPath {
  export interface Props {
    paths: PathModel[];
    deletePath: Function;
    scanning: boolean;
    toggleScanOnGoing: Function;
  }
}

export class ListPath extends React.Component<ListPath.Props> {
  deletePath(e: any) {
    var id = e.target["id"];
    this.props.deletePath({ id: parseInt(id) });
  }

  componentDidUpdate() {
    console.log("componentDidUpdate inside ListPath");
    let { paths, scanning } = this.props;
    let notDone = paths.filter((ele: PathModel) => !ele.scan_completed).length;
    console.log("scanning: ", scanning);
    console.log("notDone: ", notDone);
    if (scanning && notDone == 0) {
      this.props.toggleScanOnGoing();
    }
  }
  renderList(list: PathModel[]) {
    let deletePath = this.deletePath.bind(this);
    let { scanning } = this.props;
    return (
      <div>
        {list.map((path: PathModel) => (
          <li className="collection-item" key={path.path}>
            <Element scanning={scanning} path={path} deletePath={deletePath} />
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
const Element = (params: {
  path: PathModel;
  deletePath: EventHandler;
  scanning: boolean;
}) => {
  // const classes = classNames(
  //   {
  //     [style.inputter]: true,
  //   },
  //   style.normal
  // );
  var { path, deletePath, scanning } = params;
  if (path.id == -1) {
    return <div>{path.path}</div>;
  }
  return (
    <div>
      {renderDone(path.scan_completed)}
      {scanning && renderLoader(path.scan_completed)}
      {path.path}
      {DeleteElement(deletePath, path.id)}
    </div>
  );
};

const renderDone = (done?: boolean) =>
  done ? <i className="material-icons">done_outline</i> : null;

// font awesome
// const renderDone = (done?: boolean) =>
//   done ? <i className="far fa-check-circle" /> : null;

// const renderDone = (done?: boolean) =>
//   done ? <span className="badge green left">&#9989;</span> : null;

const renderLoader = (done?: boolean) =>
  done ? null : (
    <div className="preloader-wrapper small active">
      <div className="spinner-layer spinner-green-only">
        <div className="circle-clipper left">
          <div className="circle" />
        </div>
        <div className="gap-patch">
          <div className="circle" />
        </div>
        <div className="circle-clipper right">
          <div className="circle" />
        </div>
      </div>
    </div>
  );

const DeleteElement = (deletePath: EventHandler, id: number) => (
  <a href="#!" className="secondary-content">
    <i className="material-icons" onClick={deletePath} id={`${id}`}>
      delete
    </i>
  </a>
);
