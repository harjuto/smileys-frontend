import React from 'react';
import SmileyStack from './smiley-stack';

export default class Dashboard extends React.Component {

  componentDidMount() {
    this.props.fetch()
  }

  render() {
    return (
      <div id="dashboard">
        <div className="content">
          {this.renderStacks(this.props.data.get('smileys'))}
        </div>
      </div>
    )
  }

  renderStacks(smileys) {
    return smileys.valueSeq().map( (smileys, idx) => {
      return <SmileyStack key={idx} smileys={smileys} />
    })
  }
}



