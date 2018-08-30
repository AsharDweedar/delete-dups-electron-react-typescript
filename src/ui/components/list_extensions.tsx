import * as React from 'react'

export class ListExt extends React.Component<ExtListI, ExtI> {
    constructor(props: ExtListI) {
        super(props);
    }
    render() {
        let list = (console.log(this.props.list), this.props.list)
        let HtmlList =
            list.map(({ value }: { value: string }) => <Element value={value} key={value} />)
        return <div>
            {list.length ?
                HtmlList
                :
                <li className="collection-item" key="empty">
                    <Element value="empty-extensions-list" />
                </li>}
            {this.props.adding.value != "" && <li className="collection-item" >
                <div>{this.props.adding.value}</div>
            </li>}
        </div>
    }
}

const Element = ({ value }: { value: string }) => (
    value == "" ?
        null
        :
        <li className="collection-item" >
            <div>{value}
                {value != "empty-extensions-list" && <a href="#!" className="secondary-content">
                    <i className="material-icons" >
                        delete
                    </i>
                </a>}
            </div>
        </li>
)

export default ListExt
