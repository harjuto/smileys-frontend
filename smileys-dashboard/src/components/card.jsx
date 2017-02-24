import React from 'react';
import moment from 'moment';

export default class Card extends React.Component {

    render() {
        return (
          <div className="card">
              <div className="content">
                  <div className="header">
                      <div>{this.props.smiley.get("name").split(" ")[0]}</div>
                  </div>
                  <img src={this.props.smiley.get("image")} alt="img" />
                  <div className="date">
                      <div>{moment(this.props.smiley.get("date")).format('DD.MM.YYYY')}</div>
                  </div>
              </div>
          </div>
        )
    }
}