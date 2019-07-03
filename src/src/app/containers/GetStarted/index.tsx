import * as React from "react";
import * as style from "./style.css";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { RouteComponentProps } from "react-router";
import { omit } from "app/utils";

import { Options } from "app/containers/Options";
import { InputListPaths } from "app/containers/InputListPaths";
import { InputListExts } from "app/containers/InputListExt";

import { PathActions } from "app/actions";
import { RootState } from "app/reducers";

export namespace GetStarted {
  export interface Props extends RouteComponentProps<void> {
    paths: RootState.PathState;
    actions: Omit<typeof PathActions, "Type">;
  }
}
@connect(
  (state: RootState): Pick<GetStarted.Props, "paths"> => {
    return { paths: state.paths };
  },
  (dispatch: Dispatch): Pick<GetStarted.Props, "actions"> => ({
    actions: bindActionCreators(omit(PathActions, "Type"), dispatch),
  })
)
export class GetStarted extends React.Component<GetStarted.Props, {}> {
  constructor(props: GetStarted.Props, context?: any) {
    super(props, context);
    this.startScan = this.startScan.bind(this);
  }
  startScan() {
    console.log("start scan !!!!!!!!!!!!!!!!!")
  }
  render() {
    return (
      <div>
        <div className={style.container1}>
          <Options />
          <a
            onClick={this.startScan}
            className="waves-effect waves-light btn-large right"
            style={{ margin: "2.5em" }}
          >
            <i className="material-icons left">cloud</i>
            Start Scanning
          </a>
        </div>
        <div
          style={{
            justifyContent: "center",
            display: "flex",
            alignContent: "flex-start",
          }}
        >
          <InputListPaths />
          <InputListExts />
        </div>
      </div>
    );
  }
}
