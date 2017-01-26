import React, { PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import momentPropTypes from 'react-moment-proptypes';
import moment from 'moment';

const propTypes = {
  day: momentPropTypes.momentObj,
  isFocused: PropTypes.bool,
  onDayClick: PropTypes.func,
  onDayMouseEnter: PropTypes.func,
  onDayMouseLeave: PropTypes.func,
};

const defaultProps = {
  day: moment(),
  isFocused: false,
  onDayClick() {},
  onDayMouseEnter() {},
  onDayMouseLeave() {},
};

export default class CalendarDay extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  componentDidUpdate() {
    const { isFocused } = this.props;
    if (isFocused) {
      this.buttonRef.focus();
    }
  }

  onDayClick(day, e) {
    const { onDayClick } = this.props;
    onDayClick(day, e);
  }

  onDayMouseEnter(day, e) {
    const { onDayMouseEnter } = this.props;
    onDayMouseEnter(day, e);
  }

  onDayMouseLeave(day, e) {
    const { onDayMouseLeave } = this.props;
    onDayMouseLeave(day, e);
  }

  render() {
    const { day } = this.props;

    return (
      <button
        ref={(ref) => { this.buttonRef = ref; }}
        type="button"
        className="CalendarDay"
        aria-label={day.format('LL')}
        onMouseEnter={e => this.onDayMouseEnter(day, e)}
        onMouseLeave={e => this.onDayMouseLeave(day, e)}
        onClick={e => this.onDayClick(day, e)}
      >
        <span className="CalendarDay__day">{day.format('D')}</span>
      </button>
    );
  }
}

CalendarDay.propTypes = propTypes;
CalendarDay.defaultProps = defaultProps;
