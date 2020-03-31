import React from 'react';
import { addField } from 'react-admin';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';

const Error = styled.p`
  color: #ff0000;
  margin: 5px 0 0 0;
`;

const DateSelect = styled(DatePicker)`
  width: 100%;
`;

class DateSelectField extends React.Component {
  state = {
    startDate: null,
  };

  componentDidMount() {
    const { input, initialDate } = this.props;
    if (initialDate) {
      this.setState({ startDate: initialDate });
      input.onChange(initialDate);
      input.onBlur();
    }
  }

  handleChange = date => {
    this.setState({
      startDate: date,
    });
  };

  onChange(date) {
    const { input } = this.props;
    input.onChange(date);
    input.onBlur();
    this.setState({
      startDate: date,
    });
  }

  render() {
    const { startDate } = this.state;
    const { placeholder, meta } = this.props;

    const day = 60 * 60 * 24 * 1000;
    const start = new Date();
    const minDate = new Date(start.getTime() + day);
    return (
      <>
        <DateSelect
          onChange={date => this.onChange(date)}
          selected={startDate}
          minDate={minDate}
          placeholderText={placeholder}
          dateFormat="MMMM d, yyyy"
        />
        {meta.error && meta.touched ? <Error>{meta.error}</Error> : null}
      </>
    );
  }
}

export default addField(DateSelectField);
