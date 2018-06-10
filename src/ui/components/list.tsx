import * as React from 'react'
import DupInterface from "../interfaces/DupInterface";

export interface propsInterface { list: Array<DupInterface>; name: String }

export class List extends React.Component<propsInterface, undefined> {
    constructor(props: propsInterface) {
        super(props);
    }
    render() {
        return <ul className="collection with-header">
                    <li className="collection-header"><h4>{this.props.name}</h4></li>
                    {this.props.list.map(({ value }) =>
                        <li className="collection-item" key={value}>
                            <div>{value}
                                <a href="#!" className="secondary-content">
                                    <i className="material-icons">
                                        send
                                    </i>
                                </a>
                            </div>
                        </li>
                    )}
                </ul>    
    }
}

export default List
