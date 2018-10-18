import * as React from 'react';
import {Footer} from 'react-materialize'
export namespace LocalFooter {
  export interface Props {
  }
}

export class LocalFooter extends React.Component<LocalFooter.Props> {
  render() {
    <Footer copyrights="&copy 2015 Copyright Text"
      moreLinks={
        <a className="grey-text text-lighten-4 right" href="#!">More Links</a>
      }
      links={
        <ul>
          <li><a className="grey-text text-lighten-3" href="#!">Link 1</a></li>
          <li><a className="grey-text text-lighten-3" href="#!">Link 2</a></li>
          <li><a className="grey-text text-lighten-3" href="#!">Link 3</a></li>
          <li><a className="grey-text text-lighten-3" href="#!">Link 4</a></li>
        </ul>
      }
      className='example'
    >
      <h5 className="white-text">Footer Content</h5>
      <p className="grey-text text-lighten-4">You can use rows and columns here to organize your footer content.</p>
    </Footer>
    
    return (
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
    );
  }
}
