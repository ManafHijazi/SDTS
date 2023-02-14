import React, { useEffect, useState } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import './Datepicker.Style.scss';

export const Datepicker = ({
  value,
  label,
  error,
  maxDate,
  minDate,
  onChange,
  isDisabled,
  helperText,
  valueDateFormat,
  inputPlaceholder,
}) => {
  const [localValue, setLocalValue] = useState(null);

  useEffect(() => {
    setLocalValue((value && moment(value, valueDateFormat).toDate()) || value);
  }, [valueDateFormat, value]);

  return (
    <div className='date-picker-wrapper'>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label={label}
          minDate={minDate}
          maxDate={maxDate}
          value={localValue}
          rawValue={localValue}
          disabled={isDisabled}
          helperText={helperText}
          placeholder={inputPlaceholder}
          onChange={(newValue) => {
            setLocalValue(newValue);
            if (onChange) onChange(moment(newValue).format(valueDateFormat));
          }}
          renderInput={(params) => <TextField {...params} fullWidth error={error} />}
        />
      </LocalizationProvider>
    </div>
  );
};

Datepicker.propTypes = {
  error: PropTypes.bool,
  value: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  isDisabled: PropTypes.bool,
  helperText: PropTypes.string,
  valueDateFormat: PropTypes.string,
  inputPlaceholder: PropTypes.string,
  maxDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  minDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
};
Datepicker.defaultProps = {
  value: undefined,
  label: undefined,
  error: undefined,
  maxDate: undefined,
  minDate: new Date(),
  onChange: undefined,
  helperText: undefined,
  isDisabled: undefined,
  inputPlaceholder: undefined,
  valueDateFormat: 'YYYY-MM-DD',
};
export default Datepicker;
