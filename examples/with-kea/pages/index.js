import React from 'react'
import PropTypes from 'prop-types'
import { kea } from 'kea'

const logic = kea({
  path: () => ['kea'],
  actions: () => ({
    increment: amount => ({ amount }),
    decrement: amount => ({ amount }),
  }),
  reducers: ({ actions }) => ({
    counter: [
      0,
      PropTypes.number,
      {
        [actions.increment]: (state, payload) => state + payload.amount,
        [actions.decrement]: (state, payload) => state - payload.amount,
      },
    ],
  }),
  selectors: ({ selectors }) => ({
    doubleCounter: [
      () => [selectors.counter],
      counter => counter * 2,
      PropTypes.number,
    ],
  }),
})

@logic
export default class App extends React.Component {
  static getInitialProps({ store }) {
    // Start with counter === 10
    store.dispatch(logic.actions.increment(10))
  }

  render() {
    return (
      <div>
        <p>Double Counter: {this.props.doubleCounter}</p>
        <button type="button" onClick={() => this.actions.increment(1)}>
          Increment
        </button>
        <button type="button" onClick={() => this.actions.decrement(1)}>
          Decrement
        </button>
      </div>
    )
  }
}
