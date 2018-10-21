import * as React from 'react';
import { PathModel} from 'app/models'
export class ListPath extends React.Component<ListPath.Props> {
  render() {
    return (
      <section>
        <h2>ListPath !!</h2>
      </section>
    );
  }
}

export default ListPath;

export namespace ListPath {
  export interface Props { paths: PathModel[]; }
}
