import React, { Component } from 'react';

import moment from 'moment';
import { SingleDatePicker } from 'react-dates';

export default class InvoiceForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      description: props.invoice ? props.invoice.description : '',
      note: props.invoice ? props.invoice.note : '',
      amount: props.invoice ? (props.invoice.amount / 100).toString() : '',
      createdAt: props.invoice ? moment(props.invoice.createdAt) : moment(),
      calendarFocused: false,
      error: ''
    }
  }

  onDescriptionChange = (e) => {
    const description = e.target.value;
    this.setState(() => ({
      description
    }));
  }

  onNoteChange = (e) => {
    const note = e.target.value;
    this.setState(() => ({
      note
    }));
  }

  onAmountChange = (e) => {
    const amount = e.target.value;
    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState(() => ({
        amount
      }));
    }
  }

  onDateChange = (createdAt) => {
    if (createdAt) {
      this.setState(() => ({
        createdAt
      }));
    }
  }

  onFocusChange = ({ focused }) => {
    this.setState(() => ({
      calendarFocused: focused
    }));
  }

  onSubmit = (e) => {
    e.preventDefault();

    if (!this.state.description || !this.state.amount) {
      this.setState(() => ({
        error: 'Please provide the values'
      }));
    }
    else {
      this.setState(() => ({
        error: ''
      }));

      this.props.onSubmit({
        description: this.state.description,
        amount: parseFloat(this.state.amount, 10),
        note: this.state.note,
        createdAt: this.state.createdAt.valueOf()
      })
    }
  }
  render() {
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            placeholder="Description"
            autoFocus
            value={this.state.description}
            onChange={this.onDescriptionChange} />
          <input
            type="number"
            placeholder="Amount"
            value={this.state.amount}
            onChange={this.onAmountChange} />
          <SingleDatePicker
            date={this.state.createdAt}
            onDateChange={this.onDateChange}
            focused={this.state.calendarFocused}
            onFocusChange={this.onFocusChange}
            numberOfMonths={1}
            isOutsideRange={(day) => false}
          />
          <textarea
            placeholder="Add a note"
            value={this.state.note}
            onChange={this.onNoteChange}>
          </textarea>
          <button>Add Invoice</button>
        </form>
      </div>
    )
  }
}