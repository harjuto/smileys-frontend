import React from 'react';
import Rx from 'rx-dom'
import config from 'config';
import {receiveSmiley} from './actions';
import {connect} from 'react-redux';

class Websocket extends React.Component {

    componentDidMount() {
        var self = this;
        // create a web socket subject
        self.socket = Rx.DOM.fromWebSocket(
            config.api.WEBSOCKET_URL,
            null, // no protocol
            Rx.Observer.create(function(e) {
                self.socket.onNext('dashboard');
                setInterval(function() {self.socket.onNext("ping")}, 1000 * 30);
            }),
            Rx.Observer.create(function() {
                console.log('socket is about to close');
            }));

        this.socket.subscribe(
          this.onMessage.bind(self),
          this.onError.bind(self),
          this.onClose.bind(self)
        );
    }

    onMessage(msg) {
        if (msg.data === 'pong') {
            return;
        }
        this.props.receiveSmiley(JSON.parse(msg.data));
    }

    onError(err) {

    }

    onClose() {

    }

    render() {
        return null;
    }
}


function mapStateToProps(state) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {
        receiveSmiley: (smiley) => dispatch(receiveSmiley(smiley)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Websocket);

