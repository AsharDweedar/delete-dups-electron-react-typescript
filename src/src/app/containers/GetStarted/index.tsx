import * as React from 'react';
// import { connect } from 'react-redux';
// import { bindActionCreators, Dispatch } from 'redux';
import { RouteComponentProps } from 'react-router';
// import { omit } from 'app/utils';

// import InputListPaths from './input_list_paths';
// import InputListExtensions from './input_list_extensions';
import { Options, InputListPath, InputListExt } from 'app/components';
// import { PathActions } from 'app/actions';

// import { RootState } from 'app/reducers';

export namespace GetStarted {
  export interface Props extends RouteComponentProps<void> {
    // todos: RootState.TodoState;
    // paths: RootState.PathState;
    // actions: Omit<typeof PathActions, 'Type'>;
    // filter: TodoModel.Filter;
  }
}
// @connect(
//   (state: RootState): Pick<GetStarted.Props, 'paths'> => {
//     // const hash =
//     //     state.router.location && state.router.location.hash.replace('#', '');
//     return { paths: state.paths };
//   },
//   (dispatch: Dispatch): Pick<GetStarted.Props, 'actions'> => ({
//     actions: bindActionCreators(omit(PathActions, 'Type'), dispatch),
//   })
// )
export class GetStarted extends React.Component<GetStarted.Props, {}> {
  constructor(props: GetStarted.Props, context?: any) {
    super(props, context);
    console.log('props within getting started: ', props);
  }
  render() {
    return (
      <div>
        <div
          style={{
            justifyContent: 'center',
            display: 'flex',
            alignContent: 'center',
            padding: '0.5em',
          }}
        >
          This is get Started Component (first div ) ...
          <Options />
          <a
            className="waves-effect waves-light btn-large right"
            style={{ margin: '2.5em' }}
          >
            <i className="material-icons left">cloud</i>
            Start Scanning
          </a>
        </div>
        <div
          style={{
            justifyContent: 'center',
            display: 'flex',
            alignContent: 'flex-start',
          }}
        >
          This is get Started Component ...
          <InputListPath
            // add={this.props.addPath}
            // paths={this.props["paths"]}
          />
          <InputListExt
            // add={this.props.addEXT}
            // ext={this.props["ext"]}
            // ExtCase={this.props.ExtCase}
            // ExtCaseChange={this.props.ExtCaseChange}
          />
        </div>
      </div>
    );
  }
}
