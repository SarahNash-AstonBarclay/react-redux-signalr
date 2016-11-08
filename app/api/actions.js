import fetch from 'isomorphic-fetch';

export function modifySubscription (subscription) {
  return dispatch => {
    const url = 'http://myServer.com/api/stocks';
    const body = JSON.stringify(subscription);
    return fetch(url,
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body
      })
    .catch(function (ex) {
      console.warn(ex.message);
    });
  };
}

export function getStocks () {
  return dispatch => {
    const url = 'http://myServer.com/api/stocks';
    return fetch(url, { credentials: 'include' })
      .then(response => response.json())
      .then(json => {
        dispatch(receiveStocks(json));
      });
  };
}

export function getTemps () {
  return dispatch => {
    const url = 'http://myServer.com/api/temps';
    return fetch(url, { credentials: 'include' })
      .then(response => response.json())
      .then(json => {
        dispatch(receiveTemps(json));
      });
  };
}

export function receiveStocks (stocks) {
  return {
    type: 'STOCKS',
    stocks
  };
}

export function receiveTemps (temps) {
  return {
    type: 'TEMPS',
    temps
  };
}
