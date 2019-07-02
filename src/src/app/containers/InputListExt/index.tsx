import * as React from "react";
import { ExtTextInput } from "app/components";
// import { TextInput } from "react-materialize";
// import { TextInput } from "belle";
import { ExtModel } from "app/models";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { omit } from "app/utils";
import { RootState } from "app/reducers";

import { ListExt } from "app/components";
import { ExtActions } from "app/actions";
// Pick<P, Exclude<keyof P, keyof IMessageProps>>

export namespace InputListExts {
  export interface Props {
    exts: RootState.ExtState;
    actions: ExtActions;
    addingExt?: string;
  }
}

@connect(
  (state: RootState): Pick<InputListExts.Props, "exts"> => {
    console.log("state of getting InputListExts connect");
    console.log(state);
    // const hash =
    //     state.router.location && state.router.location.hash.replace('#', '');
    return { exts: state.exts };
  },
  (dispatch: Dispatch): Pick<InputListExts.Props, "actions"> => ({
    actions: bindActionCreators(omit(ExtActions, "Type"), dispatch),
  })
)
export class InputListExts extends React.Component<
  InputListExts.Props,
  { addingExt: string }
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
    this.state = adding.length ? { addingExt: "" } : { addingExt: addingProps };
  }
  onInsert(value: string) {
    this.props.actions.addExt({ ext: value });
  }
  changeAddingText(text: string) {
    this.setState({ addingExt: text });
  }
  onAdd(e: Event) {
    var ele = (document.getElementById("addExt") as HTMLInputElement) || {
      value: "",
    };
    this.props.actions.addExt({ ext: ele.value });
  }

  render() {
    return (
      <div
        style={{
          display: "inline-block",
          alignItems: "stretch",
          margin: "50px",
          maxWidth: "45%",
        }}
      >
        <ul className="collection with-header">
          <li className="collection-header">
            <h4 style={{ display: "inline-block" }}>Extensions</h4>
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
