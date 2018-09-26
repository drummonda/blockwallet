import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { default as initSocket } from '../socket';
import { setBlockchain } from '../store'
import './ConnectForm.css'

class ConnectForm extends Component {
  constructor() {
    super();
    this.state = {
      visible: true,
      network: ''
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  initSocket(network) {
    const socket = new WebSocket(network);
    socket.onopen = () => {
      console.log('connected!');
    };
    socket.onmessage = (msg) => {
      const message = JSON.parse(msg.data);
      const data = JSON.parse(message.data);
      console.log('received a message', data);
      this.props.setBlockchain(data)
    };
  }

  async handleClick(evt) {
    evt.preventDefault();
    const { network } = this.state;
    this.setState({ network: '' });
    this.initSocket(`ws://${network}`);
  }

  handleChange(evt) {
    const { value } = evt.target;
    this.setState({ network: value });
  }

  render() {
    return (
      <div className="connect-form">
        <form onSubmit={this.handleClick}>
          <div className="ui labeled input">
            <div className="ui label">
              ws://
            </div>
            <input
              type="text"
              placeholder="172.16.22.50:6001"
              name="network"
              onChange={this.handleChange}
              value={this.state.network}
            />
          </div>

          <button className="ui primary button connect-button">
            Connect to a network
          </button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  blockchain: state.blockchain,
})

const mapDispatchToProps = dispatch => ({
  setBlockchain: data => dispatch(setBlockchain(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ConnectForm)
