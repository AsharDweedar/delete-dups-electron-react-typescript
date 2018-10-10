import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RouteComponentProps } from 'react-router';
import { PathActions } from 'app/actions';
import { RootState } from 'app/reducers';
import { TodoModel } from 'app/models';
import { omit } from 'app/utils';

const FILTER_VALUES = (Object.keys(
    TodoModel.Filter
) as (keyof typeof TodoModel.Filter)[]).map(key => TodoModel.Filter[key]);


export namespace Other {
    export interface Props extends RouteComponentProps<void> {
        todos: RootState.TodoState;
        paths: RootState.PathState;
        actions: Omit<typeof PathActions, 'Type'>;
        filter: TodoModel.Filter;
    }
}

@connect(
    (state: RootState): Pick<Other.Props, 'todos' | 'filter'> => {
        const hash =
            state.router.location && state.router.location.hash.replace('#', '');
        const filter =
            FILTER_VALUES.find(value => value === hash) || TodoModel.Filter.SHOW_ALL;
        return { todos: state.todos, filter };
    },
    (dispatch: Dispatch): Pick<Other.Props, 'actions'> => ({
        actions: bindActionCreators(omit(PathActions, 'Type'), dispatch),
    })
)
export class Other extends React.Component<Other.Props> {
    constructor(props: Other.Props, context?: any) {
        super(props, context);
    }
    render() {
        return (
            <div>
                other rout
            </div>
        );
    }
}
