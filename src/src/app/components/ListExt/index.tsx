import * as React from 'react';

export class ListExt extends React.Component<ListExt.Props> {
  render() {
    return (
      <section>
        <h2>ListExt !!</h2>
      </section>
    );
  }
}

export default ListExt;

export namespace ListExt {
  export interface Props {}
}
