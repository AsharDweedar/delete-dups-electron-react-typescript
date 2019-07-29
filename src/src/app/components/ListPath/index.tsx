import * as React from "react";
import { Preloader } from "react-materialize";

import Switch from "antd/lib/switch";
import Icon from "antd/lib/icon";

import { PathModel } from "app/models";

export namespace ListPath {
  export interface Props {
    paths: PathModel[];
    deletePath: Function;
    scanning: boolean;
    toggleScanOnGoing: Function;
    toggleRecursive: Function;
  }
}

export class ListPath extends React.Component<ListPath.Props> {
  constructor(props: ListPath.Props) {
    super(props);
    this.deletePath = this.deletePath.bind(this);
  }
  deletePath(e: any) {
    var id = e.target["id"];
    this.props.deletePath({ id: parseInt(id) });
  }

  componentDidUpdate() {
    let { paths, scanning } = this.props;
    let notDone = paths.filter((ele: PathModel) => !ele.scan_completed).length;
    if (scanning && notDone == 0) {
      this.props.toggleScanOnGoing();
    }
  }
  renderList(list: PathModel[]) {
    let { scanning } = this.props;
    return (
      <div>
        {list.map((path: PathModel) => (
          <li className="collection-item" key={path.path}>
            <Element
              scanning={scanning}
              path={path}
              deletePath={this.deletePath}
              toggleRecursive={(() => this.props.toggleRecursive(path.id)).bind(
                this
              )}
            />
          </li>
        ))}
      </div>
    );
  }

  render() {
    let list = this.props.paths;
    if (list.length && list[0].id != -1) return this.renderList(list);
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
  toggleRecursive: Function;
  scanning: boolean;
}) => {
  var { path, deletePath, scanning, toggleRecursive } = params;
  return (
    <div>
      {renderDone(path.scan_completed)}
      {scanning && renderLoader(path.scan_completed)}
      <span style={{ marginLeft: "2%" }}>
        <Switch
          checkedChildren={<Icon type="check" />}
          unCheckedChildren={<Icon type="close" />}
          defaultChecked={path.recursively}
          onChange={(): any => toggleRecursive(path.id)}
        />
      </span>
      <span
        style={{
          marginLeft: "15px",
          marginRight: "15px",
          overflow: "hidden",
          maxWidth: "40vw",
        }}
      >
        {path.path}
      </span>
      {!scanning && DeleteElement(deletePath, path.id)}
    </div>
  );
};

const renderDone = (done?: boolean) =>
  done ? (
    <a
      id="scale-demo"
      className="btn-floating btn-small scale-transition"
    >
      <i className="material-icons">done_outline</i>
    </a>
  ) : null;

const renderLoader = (done?: boolean) => {
  return done ? null : <Preloader size="big" />;
}
/* const renderLoader = (done?: boolean) => {
  return done ? null : (
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
};
 */
const DeleteElement = (deletePath: EventHandler, id: number) => (
  <a className="secondary-content">
    <i
      className="material-icons"
      onClick={e => {
        e.stopPropagation();
        deletePath(e);
      }}
      id={`${id}`}
    >
      delete
    </i>
  </a>
);
