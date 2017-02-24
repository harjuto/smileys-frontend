import React from 'react';
import Card from './card';

export default class SmileyStack extends React.Component {
    render() {
        return (
          <div className="smiley-stack">
            {this.renderCards(this.props.smileys)}
          </div>
        )
    }

    renderCards(smileys) {
        return smileys.map ( (smiley, idx) => {
            return <Card key={idx} smiley={smiley} />
        })
    }
}