import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from 'api/actions';
import { bindActionCreators } from 'redux';

const PushService = (Component) => {
  class ComponentConnection extends Component {

    constructor (props) {
      super(props);
      this.state = {
        notificationHub: undefined
      };
    }

    getChildContext () {
      return {
        changeSubscription: this.componentSubscriptionCallback.bind(this)
      };
    }

    componentDidMount () {
      // code doesnt work, doesnt connect to actual hub
      const hub = $.connection.notificationHub;
      hub.client.pushNotification = this.onNotificationReceived;
      this.setState({
        notificationHub: hub
      });

      $.connection.hub.start().done(function () {
        // const id = $.connection.hub.id;
        // this.setState({
        //   id
        // });
      });
    }

    componentWillUnmount () {
      // unsubscribe, stop signalr subscriptions
      $.connection.hub.stop();
    }

    // handler for receiving push msg from server hub
    onNotificationReceived (payload) {
      // call update method for the particular route
      const strAction = payload.updateMethod;
      this.props.actions[strAction];
    }

    // receive messages from child components regarding their subscription
    componentSubscriptionCallback (subscription) {
      this.props.actions.modifySubscription(subscription);
    }

    render () {
      return <Component {...this.props} {...this.state} />;
    }

  }

  ComponentConnection.displayName = 'PushService';
  ComponentConnection.childContextTypes = {
    changeSubscription: React.PropTypes.func
  };

  function mapStateToProps (state) {
    return state;
  }

  function mapDispatchToProps (dispatch) {
    return {
      actions: bindActionCreators(Actions, dispatch)
    };
  }

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(ComponentConnection);
};

export default PushService;
