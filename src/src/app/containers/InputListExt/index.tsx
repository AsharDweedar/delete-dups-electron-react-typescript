import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { omit } from "../../utils";

import * as classNames from "classnames";
import * as style from "./style.css";
// import * as $ from "jquery";

import { ExtModel } from "../../models";
import { RootState } from "../../reducers";
import { ExtTextInput } from "../../components";
import { ListExt } from "../../components";
import { ExtActions } from "../../actions";
// import { TextInput } from "react-materialize";
// import { TextInput } from "belle";

export namespace InputListExts {
  export interface Props {
    exts: RootState.ExtState;
    actions: ExtActions;
    addingExt?: string;
  }
  export interface State {
    addingExt: string;
    tooltipDotError: boolean;
    tooltipEmptyError: boolean;
    extsLength: number;
  }
}

@connect(
  (state: RootState): Pick<InputListExts.Props, "exts"> => {
    return { exts: state.exts };
  },
  (dispatch: Dispatch): Pick<InputListExts.Props, "actions"> => ({
    actions: bindActionCreators(omit(ExtActions, "Type"), dispatch),
  })
)
export class InputListExts extends React.Component<
  InputListExts.Props,
  InputListExts.State
> {
  public static defaultProps = {
    exts: [],
    actions: { toggleSensitive: () => alert("Toggle Sensitive Failed") },
  };
  constructor(props: InputListExts.Props) {
    super(props);
    var addingProps = this.props.addingExt || "";
    var adding = this.props.exts.filter(
      (ele: ExtModel) => ele.ext == addingProps
    );
    let addingExt = adding.length ? "" : addingProps;
    this.state = {
      addingExt: addingExt,
      tooltipDotError: false,
      tooltipEmptyError: false,
      extsLength: this.props.exts.length,
    };
  }
  componentDidUpdate() {
    if (this.props.exts.length != this.state.extsLength) {
      this.setState({ addingExt: "", extsLength: this.props.exts.length });
    }
  }

  onInsert(value: string) {
    let error = null;

    if (value[0] != ".") error = "tooltipDotError";
    if (value == "") error = "tooltipEmptyError";

    if (!error) {
      this.props.actions.addExt({ ext: value });
    } else {
      this.setState({ ...this.state, [error]: true });
    }
  }
  changeAddingText(text: string) {
    this.setState({
      addingExt: text,
      tooltipDotError: false,
      tooltipEmptyError: false,
    });
  }
  onAdd(e: Event) {
    var ele = (document.getElementById("addExt") as HTMLInputElement) || {
      value: "",
    };
    this.onInsert(ele.value);
  }

  render() {
    let { tooltipDotError, tooltipEmptyError } = this.state;
    return (
      <div>
        <ul className="collection with-header">
          <li className="collection-header">
            <div id={"subContainer"}>
              {tooltipDotError && (
                <ToolTip
                  key={"tooltipDotError"}
                  tip={"Extension starts with Dot"}
                />
              )}
              {tooltipEmptyError && (
                <ToolTip
                  key={"tooltipEmptyError"}
                  tip={"Can't add empty extension"}
                />
              )}
              <h4 style={{ display: "inline-block" }}>Extensions</h4>
            </div>
            <span style={{ width: "75%" }}>
              <ExtTextInput
                text={this.state.addingExt}
                placeholder="Type files Extensions to include in the search"
                onSave={this.onInsert.bind(this)}
                handleChange={this.changeAddingText.bind(this)}
              />
            </span>
            <button
              onClick={this.onAdd.bind(this)}
              style={{ float: "right" }}
              className="btn-floating btn-small waves-effect waves-light green"
            >
              +
            </button>
          </li>
          <ListExt
            deleteExt={this.props.actions.deleteExt}
            exts={this.props["exts"]}
            toggleSensitive={this.props.actions.toggleSensitive}
          />
        </ul>
      </div>
    );
  }
}

type ToolTip = {
  key: string;
  tip: string;
};
const ToolTip = ({ key, tip }: ToolTip) => (
  <span
    style={{ visibility: "visible" }}
    className={classNames({ [style.tooltiptext]: true })}
    id={key}
  >
    {tip}
  </span>
);
