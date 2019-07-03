import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { omit } from "app/utils";

import { OptActions } from "app/actions";
import { RootState } from "app/reducers";
import { OptModel } from "app/models";

import { OneOption } from "app/components";

export namespace Options {
  export interface Props {
    opts: RootState.OptState;
    actions: OptActions;
  }
  export interface State {}
}

@connect<Pick<Options.Props, "opts">, Pick<Options.Props, "actions">, {}>(
  (state: RootState): Pick<Options.Props, "opts"> => {
    return { opts: state.opts };
  },
  (dispatch: Dispatch): Pick<Options.Props, "actions"> => ({
    actions: bindActionCreators(omit(OptActions, "Type"), dispatch),
  })
)
export class Options extends React.Component<Options.Props, Options.State> {
  public static defaultProps = {
    opts: [],
    actions: { updateOpts: () => alert("updateOpts Failed") },
  };

  constructor(props: Options.Props, context?: any) {
    super(props, context);
    this.updateOptions = this.updateOptions.bind(this);
  }
  updateOptions(opt: OptModel) {
    this.props.actions.updateOpt(opt);
  }
  render() {
    var opts = this.props.opts;
    var list = [];
    for (var opt of opts) {
      list.push(<OneOption opt={opt} onChange={this.updateOptions} />);
    }
    return (
      <div style={{ width: "70%", display: "inline-block" }}>
        <table className="responsive-table">
          <tbody>{list}</tbody>
        </table>
      </div>
    );
  }
}
