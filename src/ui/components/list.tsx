import * as React from 'react'

export class List extends React.Component<{}, undefined> {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <ul className="collection with-header">
                {this.props.list.map(({ name }) => <li className="collection-header"><h4>{name}</h4></li>)}
            </ul>
        );
    }
}

export default List