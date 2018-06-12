import * as React from 'react'

export class ListExt extends React.Component<ExtListI, {}> {
    constructor(props: ExtListI) {
        super(props);
    }
    render() {
        return <div>
            {this.props.list.map(({ value }: { value: string }) =>
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
