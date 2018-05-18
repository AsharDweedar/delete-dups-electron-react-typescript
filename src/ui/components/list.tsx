import * as React from 'react'
import DupInterface from "../interfaces/DupInterface";

export class List extends React.Component<{ list: Array<{name: string}> }, undefined> {
    constructor(props: { list: Array<DupInterface>}) {
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