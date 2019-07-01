import * as React from 'react';
// import { TodoActions } from 'app/actions/todos';
// import { TodoModel } from 'app/models/TodoModel';

export class Home extends React.Component<Home.Props> {
  render() {
    return (
      <section>
        <h2>Home !!</h2>
      </section>
    );
  }
}

export default Home;

export namespace Home {
  export interface Props {
    // todos: TodoModel[];
    // actions: TodoActions;
  }
}
