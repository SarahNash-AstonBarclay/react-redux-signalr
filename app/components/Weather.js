import React from 'react';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import * as Actions from '../api/actions';

export class Weather extends React.Component {
  static subscription (isSubscribe) {
    return {
      subscribe: isSubscribe,
      route: 'api/temps',
      updateMethod: 'getTemps'
    };
  }

  componentDidMount () {
    this.context.changeSubscription({
      ...Weather.subscription(true)
    });
  }

  componentWillUnmount () {
    this.context.changeSubscription({
      ...Weather.subscription(false)
    });
  }
  render () {
    return (
            <div>
                <ul>
                    {this.props.temps.map((temp) =>
                        <li key={temp.id}>
                            {temp.name} {temp.temp}
                        </li>
                    )}
                </ul>
            </div>
        );
  }
}

function mapStateToProps (state) {
  return {
    temps: state.temps
  };
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Weather);
