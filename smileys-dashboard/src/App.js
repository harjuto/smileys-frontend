import React, { Component } from 'react';
import Dashboard from './components/dashboard';
import Search from './search';
import LoginPage from './login';
import AuthService from './authservice';
import {connect} from 'react-redux';
import {fetchPeople, search} from './actions';

class App extends Component {

  render() {
    return (
     <div className="app">
       {this._renderContent()}
     </div>
    );
  }

  _renderContent() {
    let profile = AuthService.getUserProfile();
    if (profile) {
      let groups = profile.getGroups();
      return (
        <div className="home">
          <header>
            <div className="content">
              {
                groups.map( g => {
                  return (
                    <div className="group-logo-container" key={g}>
                      <span className="logo">
                        {g[0]}
                      </span>
                      <span className="text">{g}</span>
                    </div>
                  )
                })
              }
              <div className="logout-container">
                <span className="button" onClick={AuthService.logout}>
                  Log out
                </span>
              </div>
            </div>
          </header>
          <Dashboard fetch={this.props.fetchPeople} data={this.props.data} />
          <Search search={this.props.search} />
        </div>
      )
    } else {
      return <LoginPage/>
    }
  }
}

function mapStateToProps(state) {
  return {
    data: state.smileyReducer,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPeople: () => dispatch(fetchPeople()),
    search: (name) => dispatch(search(name))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);