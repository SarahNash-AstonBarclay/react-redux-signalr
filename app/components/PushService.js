import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from 'api/actions';
import { bindActionCreators } from 'redux';

const PushService = (Component) => {
  class ComponentConnection extends Component {

    constructor (props) {
      super(props);
      this.state = {
        notificationHub: undefined,
        subscriptions: {}
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
      // payload contains endpoint that client is subscribed to, and needs to be refreshed
      const route = payload.route;
      
      // invoke refresh method associated with the route
      const subscription = this.state.subscriptions[route]
    }

    // receive messages from child components regarding their subscription
    componentSubscriptionCallback (subscription) {
      // send action that posts msg to server
      this.props.actions.modifySubscription(subscription);

      // track subscriptions in local state obj
      const subscriptions = this.state.subscriptions;
      const subscriptionOld = subscriptions[subsription.route];
      if (subscriptionOld ) {
        if (subscription.subscribe) {
            subscriptions[subscription.route] = subscription;
            this.setState({ subscriptions });
        } else {
          subscriptions[subscription.route] = null;
          this.setState({ subscriptions });
        }
      }
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
