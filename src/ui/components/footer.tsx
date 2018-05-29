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
                        <li><a className="grey-text text-lighten-3" href="#!">GitHub</a></li>
                        <li><a className="grey-text text-lighten-3" href="#!">LinkedIn</a></li>
                        <li><a className="grey-text text-lighten-3" href="#!">3DWearHouse</a></li>
                        <li><a className="grey-text text-lighten-3" href="#!">FaceBook</a></li>
                    </ul>
                </div>
            </div>
        </div>
        <div className="footer-copyright">
            <div className="container">
                © 2018 Copyright Text
            <a className="grey-text text-lighten-4 right" href="mailto:Ashar.Dweedar@gmail.com">More Ashar.Dweedar@gmail.com</a>
            </div>
        </div>
    </footer>

)

export default Footer