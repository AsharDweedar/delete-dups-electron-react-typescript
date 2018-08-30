import * as React from 'react';
import NavBar from './components/nav_bar';
import Footer from './components/footer';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as extActions from '../actions/extActions';
import PropTypes from 'prop-types'; //?????

// export class App extends React.Component<any, any> {
class App extends React.Component<undefined, undefined> {
  render() {
    return (
      <div>
        <header>
          <div className="container">
            <h3>Welcome to Delete Dups App!</h3>
          </div>
        </header>
        <main>
          <NavBar />
        </main>
        <Footer />
      </div>
    );
  }
}

App.propTypes = {
  extActions: PropTypes.object,
  ext: PropTypes.array
}
function mapStateToProps(state: {ext: [any]}) {
  return {
    ext: state.ext
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    extActions: bindActionCreators(extActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

