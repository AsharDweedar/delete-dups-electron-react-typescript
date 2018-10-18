// import * as React from 'react';
// import * as style from './style.css';
// import { connect } from 'react-redux';
// import { bindActionCreators, Dispatch } from 'redux';
// import { RouteComponentProps } from 'react-router';
// import { PathActions } from 'app/actions';
// // import { TodoActions, PathActions } from 'app/actions';
// import { RootState } from 'app/reducers';
// import { TodoModel } from 'app/models';
// // import { TodoModel, PathModel } from 'app/models';
// import { omit } from 'app/utils';
// import { LocalFooter } from 'app/components';
// // import { Header, TodoList, Footer } from 'app/components';

// // const FILTER_VALUES = (Object.keys(
// //   TodoModel.Filter
// // ) as (keyof typeof TodoModel.Filter)[]).map(key => TodoModel.Filter[key]);

// // const FILTER_FUNCTIONS: Record<
// //   TodoModel.Filter,
// //   (todo: TodoModel) => boolean
// // > = {
// //   [TodoModel.Filter.SHOW_ALL]: () => true,
// //   [TodoModel.Filter.SHOW_ACTIVE]: todo => !todo.completed,
// //   [TodoModel.Filter.SHOW_COMPLETED]: todo => todo.completed,
// // };

// export namespace App {
//   export interface Props extends RouteComponentProps<void> {
//     todos: RootState.TodoState;
//     paths: RootState.PathState;
//     extensions: RootState.ExtState;
//     actions: Omit<typeof PathActions, 'Type'>;
//   }
//   // filter: TodoModel.Filter;
// }

// @connect(
//   (state: RootState): Pick<App.Props, 'paths' | 'extensions'> => {
//     return { paths: state.paths, extensions: state.extensions };
//   },
//   (dispatch: Dispatch): Pick<App.Props, 'actions'> => ({
//     actions: bindActionCreators(omit(PathActions, 'Type'), dispatch),
//   })
// )
// export class App extends React.Component<App.Props> {
//   constructor(props: App.Props, context?: any) {
//     super(props, context);
//     this.handleClearCompleted = this.handleClearCompleted.bind(this);
//     this.handleFilterChange = this.handleFilterChange.bind(this);
//   }

//   handleClearCompleted(): void {
//     // const hasCompletedTodo = this.props.todos.some(
//     //   todo => todo.completed || false
//     // );
//     // if (hasCompletedTodo) {
//     //   this.props.actions.clearCompleted();
//     // }
//   }

//   handleFilterChange(filter: TodoModel.Filter): void {
//     // this.props.history.push(`#${filter}`);
//   }

//   render() {
//     // const { todos, actions, filter } = this.props;
//     // const activeCount =
//     //   todos.length - todos.filter(todo => todo.completed).length;
//     // const filteredTodos = filter
//     //   ? todos.filter(FILTER_FUNCTIONS[filter])
//     //   : todos;
//     // const completedCount = todos.reduce(
//     //   (count, todo) => (todo.completed ? count + 1 : count),
//     //   0
//     // );

//     return <div className={style.normal}>
//         still works well and logs stuff
//         {/* <Header addTodo={actions.addTodo} />
//         <TodoList todos={filteredTodos} actions={actions} />
//         <Footer
//           filter={filter}
//           activeCount={activeCount}
//           completedCount={completedCount}
//           onClickClearCompleted={this.handleClearCompleted}
//           onClickFilter={this.handleFilterChange}
//         /> */}
//       <LocalFooter />
//       </div>;
//   }
// }
