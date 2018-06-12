import * as React from 'react'

export default class ListPaths extends React.Component<ListPathsI, any> {
    constructor(props: ListPathsI) {
        super(props);
        this.props.list.map(({ path }: { path: string }) =>
            console.log(path)
        )
    }
    render() {
        return <div>
            {this.props.list.map(({ path }: { path: string }) =>
                <li className="collection-item" key={path}>
                    {<Element path={path.split("/")} />}
                </li>
            )}
        </div>
    }
}

let Element = ({ path }: { path: string[] }) => (<nav>
    <div className="nav-wrapper" key={path.join("/")}>
        <div className="col s12 nav-wrapper" style={{ overflow: "hide", paddingRight: "10%", border: "1px red solid" }}>
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
