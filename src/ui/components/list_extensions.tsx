import * as React from 'react'
import DupInterface from "../interfaces/DupInterface";

export interface propsInterface { list: Array<DupInterface>}

export class ListExt extends React.Component<propsInterface, undefined> {
    constructor(props: propsInterface) {
        super(props);
    }
    render() {
        return <div>
            {this.props.list.map(({ value }: {value: string}) =>
                <li className="collection-item" key={value}>
                    <div>{value}
                        <a href="#!" className="secondary-content">
                            <i className="material-icons">
                                delete
                            </i>
                        </a>
                    </div>
                </li>
            )}
        </div>
    }
}

export default ListExt
