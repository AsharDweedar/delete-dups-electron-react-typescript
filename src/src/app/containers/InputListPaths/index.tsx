import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { omit } from "app/utils";

import { PathActions } from "app/actions";
import { RootState } from "app/reducers";

import { ListPath } from "app/components";

export namespace InputListPaths {
  export interface Props {
    paths: RootState.PathState;
    actions: PathActions;
    scanning: boolean;
    toggleScanOnGoing: Function;
  }
}

@connect<
  Pick<InputListPaths.Props, "paths">,
  Pick<InputListPaths.Props, "actions">,
  {}
>(
  (state: RootState): Pick<InputListPaths.Props, "paths"> => {
    return { paths: state.paths };
  },
  (dispatch: Dispatch): Pick<InputListPaths.Props, "actions"> => ({
    actions: bindActionCreators(omit(PathActions, "Type"), dispatch),
  })
)
export class InputListPaths extends React.Component<InputListPaths.Props, {}> {
  public static defaultProps = {
    paths: [],
    actions: { addPath: () => alert("Add Failed") },
  };

  constructor(props: InputListPaths.Props, context?: any) {
    super(props, context);
  }

  componentDidMount() {
    let ele = document.getElementById("selector");
    if (!!ele) {
      ele.setAttribute("webkitdirectory", "true");
      ele.setAttribute("mozdirectory", "true");
      ele.setAttribute("msdirectory", "true");
      ele.setAttribute("odirectory", "true");
      ele.setAttribute("directory", "true");
      ele.setAttribute("multiple", "true");
    }
  }

  show(e: any) {
    var ele = document.getElementById("selector") || {
      click: () => {},
      refs: { x: {} },
    };
    ele.click();
  }

  update_list(e: any) {
    let file = e.target.files[0].path;
    this.props["actions"]["addPath"]({ path: file });
  }

  render() {
    const { paths } = this.props;
    return (
      <div
        style={{
          display: "inline-block",
          alignItems: "stretch",
          margin: "25px",
          maxWidth: "45%",
        }}
      >
        <ul className="collection with-header">
          <li className="collection-header">
            <h4 style={{ display: "inline-block" }}>Paths</h4>
            <input
              type="file"
              style={{ display: "none" }}
              id="selector"
              onChange={this.update_list.bind(this)}
            />
            <button
              onClick={this.show.bind(this)}
              style={{ float: "right" }}
              className="btn-floating btn-large waves-effect waves-light green"
            >
              +
            </button>
          </li>
          <ListPath
            scanning={this.props.scanning}
            paths={paths}
            deletePath={this.props.actions.deletePath}
            toggleRecursive={this.props.actions.togglePathRecursively}
            toggleScanOnGoing={this.props.toggleScanOnGoing}
          />
        </ul>
      </div>
    );
  }
}
