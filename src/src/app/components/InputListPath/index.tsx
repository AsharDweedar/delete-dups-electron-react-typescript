import * as React from 'react';
import { ListPath } from 'app/components';
import { PathModel } from 'app/models';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { omit } from 'app/utils';
import { PathActions } from 'app/actions';
import { RootState } from 'app/reducers';

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
export class InputListPath extends React.Component<
  InputListPath.Props,
  { paths: PathModel[] }
> {
  // export class InputListPath extends React.Component<InputListPath.Props> {
  constructor(props: InputListPath.Props) {
    super(props);
    console.log(props);
    this.state = { paths: this.props['paths'] };
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
    // const { dialog } = require('electron').remote;
    // var [path] = dialog.showOpenDialog({
    //   properties: ['openDirectory'],
    // });
    // this.props.actions.addPath({ path });
    console.log('called ', e);
    // var remote = require('remote');
    // var dialog = remote.require('electron').dialog;

    // var path = dialog.showOpenDialog({
    //   properties: ['openDirectory']
    // });

    // console.log(path);
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
            <input type="file" onClick={this.show.bind(this)} />
            <button
              onClick={this.show.bind(this)}
              style={{ float: 'right' }}
              className="btn-floating btn-large waves-effect waves-light green"
            />
          </li>
          <ListPath paths={this.state['paths']} />
        </ul>
      </div>
    );
  }
}

export default InputListPath;

export namespace InputListPath {
  export interface Props {
    paths: PathModel[];
    actions: Omit<typeof PathActions, 'Type'>;
  }
  // dispatch: Omit<typeof PathActions, 'Type'>;
}
