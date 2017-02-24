import React from 'react';

export default class Search extends React.Component {
    constructor() {
        super();
        this.state = {
            text: ''
        };
        window.addEventListener("keydown", (event) => {
            if (event.keyCode === 8) {
                return this.setState({
                    text: this.state.text.slice(0, -1)
                })
            }
            const text = this.state.text + event.key;
            this.setState({
                text: text
            });
            this.props.search(text)
        });
    }

    render() {
        console.info(this.state);

        return null
    }
}