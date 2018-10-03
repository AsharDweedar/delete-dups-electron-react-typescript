import * as React from 'react';

const Footer = () => (
    <footer className="page-footer">
        <div className="container">
            <div className="row">
                <div className="col l6 s12">
                    <h5 className="white-text">Created By: AsharDweedar</h5>
                    <p className="grey-text text-lighten-4">Nice to meet you</p>
                </div>
                <div className="col l4 offset-l2 s12">
                    <h5 className="white-text">Reach Out:</h5>
                    <ul>
                        <li><a className="grey-text text-lighten-3" href="https://github.com/AsharDweedar">GitHub</a></li>
                        <li><a className="grey-text text-lighten-3" href="https://www.linkedin.com/in/as-har-dweedar/">LinkedIn</a></li>
                        <li><a className="grey-text text-lighten-3" href="https://3dwarehouse.sketchup.com/user/65e0a2df-177a-41de-b0fd-a9d561a45ad8/AsharDweedar?nav=models">3DWearHouse</a></li>
                        <li><a className="grey-text text-lighten-3" href="https://www.facebook.com/AsharDweedar">FaceBook</a></li>
                    </ul>
                </div>
            </div>
        </div>
        <div className="footer-copyright">
            <div className="container">
                © 2018 Copyright Text (GNU GENERAL PUBLIC LICENSE)
            <a className="grey-text text-lighten-4 right" href="mailto:Ashar.Dweedar@gmail.com">More Ashar.Dweedar@gmail.com</a>
            </div>
        </div>
    </footer>

)

export default Footer