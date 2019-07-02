import * as React from "react";
import * as classNames from "classnames";
import * as style from "./style.css";

export namespace ExtTextInput {
  export interface Props {
    text: string;
    placeholder?: string;
    onSave: (text: string) => void;
    handleChange: Function;
  }

  export interface State {
    text: string;
    validExt: boolean;
    editing: boolean;
    newExt: boolean;
  }
}

export class ExtTextInput extends React.Component<
  ExtTextInput.Props,
  ExtTextInput.State
> {
  constructor(props: ExtTextInput.Props, context?: any) {
    super(props, context);
    var text = this.props.text || "";
    var validExt = text == "" || text[0] == ".";
    this.state = { text, validExt, editing: true, newExt: text == "" };
    this.handleBlur = this.handleBlur.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.which === 13 && this.props.text != "") {
      this.props.onSave(this.props.text);
    }
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.props.handleChange(event.target.value);
  }

  handleBlur(event: React.FocusEvent<HTMLInputElement>) {
    const text = event.target.value.trim();
    this.setState({ text, editing: false });
  }

  changeEditing() {
    this.setState({ editing: true });
  }

  render() {
    // var ele = (document.getElementById("#addExt") as HTMLInputElement);
    var editing = this.state.editing;
    const classes = classNames(
      {
        [style.edit]: editing,
        [style.new]: this.state.newExt,
      },
      style.normal
    );

    var txt = this.props.text;
    var validExt = txt == "" || txt[0] == ".";
    var color = editing ? (validExt ? "green" : "red") : "black";
    return (
      <span style={{ width: "80%", display: "inline-block" }}>
        <input
          id="addExt"
          className={classes}
          type="text"
          autoFocus
          placeholder={(this.props.placeholder, "type here")}
          value={txt}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
          onKeyDown={this.handleSubmit}
          onClick={this.changeEditing.bind(this)}
          style={{ color: color }}
        />
      </span>
    );
  }
}
