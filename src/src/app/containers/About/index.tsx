import * as React from 'react';
import { TodoActions } from 'app/actions/todos';
import { TodoModel } from 'app/models/TodoModel';

export class About extends React.Component<About.Props> {
    render() {
        return (
            <section>
                <h2>About !!</h2>
            </section>
        );
    }
}

export default About;

export namespace About {
    export interface Props {
        todos: TodoModel[];
        actions: TodoActions;
    }
}
