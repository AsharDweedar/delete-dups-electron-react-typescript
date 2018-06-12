import * as React from 'react'
import DupInterface from "../interfaces/DupInterface";

export interface propsInterface { list: Array<DupInterface> }

export default class ListPaths extends React.Component<propsInterface, undefined> {
    constructor(props: propsInterface) {
        super(props);
    }
    render() {
        return <div>
            {this.props.list.map(({ value }: { value: string }) =>
                <li className="collection-item" key={value}>
                    {<Element path={value.split("/")} />}
                </li>
            )}
        </div>
    }
}

let Element = ({ path }: { path: string[] }) => (<nav>
    <div className="nav-wrapper" key={path.join("/")}>
        <div className="col s12 nav-wrapper" style={{overflow: "hide", paddingRight: "10%", border: "1px red solid"}}>
            {path.map((pathPart) =>
                <a href="#!" className="breadcrumb">{pathPart}</a>
            )}
            <a href="#!" className="secondary-content">
                <i className="material-icons">
                    delete
                </i>
            </a>
        </div>
    </div>
</nav>)