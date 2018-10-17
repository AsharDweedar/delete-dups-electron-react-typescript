import * as React from 'react';
// import { ListPath } from 'app/components';
import { PathModel } from 'app/models';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { omit } from 'app/utils';
import { PathActions } from 'app/actions';
import { RootState } from 'app/reducers';
import remote from 'electron';
@connect(
  (state: RootState): { paths: PathModel[] } => {
    //   (state: RootState): Pick<InputListPath.Props, 'paths'> => {
    return { paths: state.paths };
  },
  (dispatch: Dispatch): { actions: Omit<typeof PathActions, 'Type'> } => ({
    //   (dispatch: Dispatch): Pick<InputListPath.Props, 'actions'> => ({
    actions: bindActionCreators(omit(PathActions, 'Type'), dispatch),
  })
)
export class InputListPath extends React.Component<any> {
  // export class InputListPath extends React.Component<InputListPath.Props> {
  constructor(props: {}) {
    super(props);
    console.log(props);
  }
//   componentDidMount() {
    // let ele = document.getElementById('selector');
    // if (!!ele) {
    //   ele.setAttribute('webkitdirectory', 'true');
    // }
    // this.refs.x.directory = true;
    // this.refs.x.webkitdirectory = true;
//   }
  show(e: any) {
      console.log(require('electron'));
    const { dialog } = remote;
    var [path] = dialog.showOpenDialog({
      properties: ['openDirectory'],
    });
    this.props.actions.addPath({ path });
    console.log(e);
  }
  render() {
    return (
      <div
        style={{
          display: 'inline-block',
          alignItems: 'stretch',
          margin: '50px',
          maxWidth: '45%',
        }}
      >
        <ul className="collection with-header">
          <li className="collection-header">
            <h4 style={{ display: 'inline-block' }}>Paths</h4>
            <button
              onClick={this.show.bind(this)}
              style={{ float: 'right' }}
              className="btn-floating btn-large waves-effect waves-light green"
            />
          </li>
          {/* <ListPath list={this.props['paths']} /> */}
        </ul>
      </div>
    );
  }
}

export default InputListPath;

export namespace InputListPath {
  export interface Props {
    // paths: PathModel[];
    // dispatch: Omit<typeof PathActions, 'Type'>;
    // actions: Omit<typeof PathActions, 'Type'>;
  }
}
