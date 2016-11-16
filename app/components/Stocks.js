import React from 'react';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import * as Actions from '../api/actions';

export class Stocks extends React.Component {

  static subscription (isSubscribe) {
    return {
      subscribe: isSubscribe,
      route: 'api/stocks',
      updateMethod: this.actions.getStocks
    };
  }

  componentDidMount () {
    this.actions.getStocks();
    this.context.changeSubscription({
      ...Stocks.subscription(true)
    });
  }

  componentWillUnmount () {
    this.context.changeSubscription({
      ...Stocks.subscription(false)
    });
  }
  render () {
    return (
            <div>
                <ul>
                    {this.props.stocks.map((stock) =>
                        <li key={stock.id}>
                            {stock.name} {stock.price}
                        </li>
                    )}
                </ul>
            </div>
        );
  }
}

function mapStateToProps (state) {
  return {
    stocks: state.stocks
  };
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Stocks);
