import * as React from 'react'

export default class ListPaths extends React.Component<ListPathsI, any> {
    constructor(props: ListPathsI) {
        super(props);
    }
    render() {
        let list = this.props.list
        let HTMLlist = list.length ?  list.map(({ path }: { path: string }) =>
                    <li className="collection-item" key={path}>
                        {/* {<Element path={path.split("/")} />} */}
                        {<Element path={path} />}
                    </li>
                )
        :
            [<li className="collection-item" key="empty">
                {/* {<Element path={"empty-paths-list".split("/")} />} */}
                {<Element path={"empty-paths-list"} />}
            </li>]

        return <div>
            {HTMLlist}
        </div>
    }
}
let Element = ({path}: {path: string}) => (
    <li className="collection-item" >
        <div>{path}
            {path != "empty-extensions-list" && <a href="#!" className="secondary-content">
                <i className="material-icons">
                    delete
                </i>
            </a>}
        </div>
    </li>
)
// let Element = ({ path }: { path: string[] }) => (<nav>
//     <div className="nav-wrapper" key={path.join("/")}>
//         <div className="col s12 nav-wrapper" style={{ overflow: "hide", paddingRight: "10%", border: "1px red solid" }}>
//             {path.map((pathPart) =>
//                 <a href="#!" key={pathPart} className="breadcrumb">{pathPart}</a>
//             )}
//             {path[0] != "empty-paths-list" && <a href="#!" className="secondary-content">
//                 <i className="material-icons">
//                     delete
//                 </i>
//             </a>}
//         </div>
//     </div>
// </nav>)
