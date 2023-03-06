import React, { useState } from 'react';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { CheckboxesComponent, Datepicker, Inputs, SelectComponent } from 'Components';
import { ButtonBase, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { MobileTimePicker, LocalizationProvider, PickersDay } from '@mui/x-date-pickers';
import './SchedulingPage.scss';
import { GlobalHistory } from 'Helpers';

const SchedulingPageView = () => {
  const [state, setState] = useState({
    qid: '4253264643',
    language: '',
    gender: '',
    nationality: '',
    date: '',
  });
  const [highlightedDays, setHighlightedDays] = useState([-1]);
  const [isFilteredApplied, setIsFilterApplied] = useState(false);
  const [checked, setChecked] = useState([]);
  const [left, setLeft] = useState([0, 1, 2, 3, 4, 5, 6]);
  const [right, setRight] = useState([]);

  const not = (a, b) => a.filter((value) => b.indexOf(value) === -1);

  const intersection = (a, b) => a.filter((value) => b.indexOf(value) !== -1);

  const union = (a, b) => [...a, ...not(b, a)];

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const numberOfChecked = (items) => intersection(checked, items).length;

  const handleToggleAll = (items) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const ServerDay = (props) => {
    const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

    const isSelected = !outsideCurrentMonth && highlightedDays.indexOf(props.day.date()) > 0;

    return (
      <div
        key={props.day.toString()}
        className={`date-item-wrapper ${isSelected ? 'is-selected-date' : ''}`}>
        <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
      </div>
    );
  };

  ServerDay.propTypes = {
    /**
     * The date to show.
     */
    day: PropTypes.object.isRequired,
    highlightedDays: PropTypes.arrayOf(PropTypes.number),
    /**
     * If `true`, day is outside of month and will be hidden.
     */
    outsideCurrentMonth: PropTypes.bool.isRequired,
  };

  const customList = (title, items) => (
    <div className='list-item-wrapper'>
      <div className='card-header'>
        <div className='header-info'>
          <CheckboxesComponent
            onSelectedCheckboxClicked={handleToggleAll(items)}
            singleChecked={numberOfChecked(items) === items.length && items.length !== 0}
            singleIndeterminate={
              numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0
            }
            isDisabled={items.length === 0}
            inputProps={{
              'aria-label': 'all items selected',
            }}
          />
          <div className='header-title'>{title}</div>
        </div>
        <div className='header-subtitle'>{`${numberOfChecked(items)}/${
          items.length
        } Selected`}</div>
      </div>
      <List dense component='div' role='list'>
        {items.map((value) => {
          const labelId = `transfer-list-all-item-${value}-label`;

          return (
            <ListItem key={value} role='listitem' button onClick={handleToggle(value)}>
              <ListItemIcon>
                <CheckboxesComponent
                  singleChecked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    'aria-labelledby': labelId,
                  }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`Trainer ${value + 1}`} />
            </ListItem>
          );
        })}
      </List>
    </div>
  );

  return (
    <div className='scheduling-wrapper view-wrapper'>
      <div className='page-header-wrapper'>
        <div className='page-title'>Scheduling</div>
        <div className='page-actions'>
          {isFilteredApplied && (
            <ButtonBase
              className='btns theme-primary c-white bg-secondary pr-3'
              onClick={() => GlobalHistory.push('/home/students-page')}>
              <span className='mdi mdi-check pr-1' />
              Save
            </ButtonBase>
          )}
        </div>
      </div>

      <div className='page-content'>
        <div className='field-items'>
          <Inputs
            isDisabled
            value={`QID: ( ${state.qid} )`}
            wrapperClasses='mb-4'
            inputPlaceholder='QID'
            onInputChanged={(event) => {
              const { value } = event.target;
              setState((items) => ({ ...items, qid: value }));
            }}
          />
          <SelectComponent
            data={[
              { key: 'Arabic', value: 'Arabic' },
              { key: 'English', value: 'English' },
              { key: 'Indian', value: 'Indian' },
              { key: 'French', value: 'French' },
              { key: 'Spanish', value: 'Spanish' },
              { key: 'Italian', value: 'Italian' },
            ]}
            value={state.language || -1}
            valueInput='key'
            wrapperClasses='mb-4'
            textInput='value'
            defaultValue={-1}
            onSelectChanged={(newValue) => {
              setState((items) => ({ ...items, language: newValue }));
            }}
            emptyItem={{ value: -1, text: 'Select Language', isHiddenOnOpen: true }}
          />
          <SelectComponent
            data={[
              { key: 'Male', value: 'Male' },
              { key: 'Female', value: 'Female' },
            ]}
            value={state.gender || -1}
            valueInput='key'
            wrapperClasses='mb-4'
            textInput='value'
            defaultValue={-1}
            onSelectChanged={(newValue) => {
              setState((items) => ({ ...items, gender: newValue }));
            }}
            emptyItem={{ value: -1, text: 'Trainer Gender', isHiddenOnOpen: true }}
          />
          <SelectComponent
            data={[
              { key: 'Algeria', value: 'Algeria' },
              { key: 'Bahrain', value: 'Bahrain' },
              { key: 'Djibouti', value: 'Djibouti' },
              { key: 'Egypt', value: 'Egypt' },
              { key: 'Iraq', value: 'Iraq' },
              { key: 'Jordan', value: 'Jordan' },
              { key: 'Kuwait', value: 'Kuwait' },
              { key: 'Lebanon', value: 'Lebanon' },
              { key: 'Libya', value: 'Libya' },
              { key: 'Morocco', value: 'Morocco' },
              { key: 'Mauritania', value: 'Mauritania' },
              { key: 'Oman', value: 'Oman' },
              { key: 'Palestine', value: 'Palestine' },
              { key: 'Qatar', value: 'Qatar' },
              { key: 'Saudi Arabia', value: 'Saudi Arabia' },
              { key: 'Somalia', value: 'Somalia' },
              { key: 'Sudan', value: 'Sudan' },
              { key: 'Syria', value: 'Syria' },
              { key: 'Tunisia', value: 'Tunisia' },
              { key: 'United Arab Emirates', value: 'United Arab Emirates' },
              { key: 'Yemen', value: 'Yemen' },
            ]}
            value={state.nationality || -1}
            valueInput='key'
            wrapperClasses='mb-4'
            textInput='value'
            defaultValue={-1}
            onSelectChanged={(newValue) => {
              setState((items) => ({ ...items, nationality: newValue }));
            }}
            emptyItem={{ value: -1, text: 'Trainer Nationality', isHiddenOnOpen: true }}
          />

          <div className='time-picker-wrapper mb-4 w-100'>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <MobileTimePicker label='Select Requiered Time' />
            </LocalizationProvider>
          </div>

          <div className='date-picker-wrapper mb-3 w-100'>
            <Datepicker
              isMobile
              onMonthChange={() => setHighlightedDays([-1])}
              maxDate={dayjs('2100-01-1')}
              label='Select Requiered Date'
              value={state.date}
              onChange={(value) => {
                setState((items) => ({ ...items, date: value }));

                setHighlightedDays((items) => {
                  const localValue = +dayjs(value).format('D');
                  const localIndex = items.findIndex((el) => el === localValue);

                  if (localIndex === -1) items.push(localValue);
                  else items.splice(localIndex, 1);

                  return [...items];
                });
              }}
              slots={{
                day: ServerDay,
              }}
              slotProps={{
                day: {
                  highlightedDays,
                },
              }}
            />
          </div>

          <div className='mt-2'>
            <ButtonBase
              className='btns theme-primary c-white bg-primary pr-3'
              onClick={() => setIsFilterApplied(true)}>
              <span className='mdi mdi-filter-multiple-outline pr-1' />
              Apply Filter
            </ButtonBase>
          </div>
        </div>

        {isFilteredApplied && (
          <div className='list-wrapper'>
            {customList('Available Trainers', left)}
            <div className='btns-wrapper'>
              <ButtonBase
                className='btns btns-icon theme-outline mb-2 c-primary'
                onClick={handleCheckedRight}
                disabled={leftChecked.length === 0}>
                <span className='mdi mdi-arrow-right' />
              </ButtonBase>
              <ButtonBase
                className='btns btns-icon theme-outline c-primary'
                onClick={handleCheckedLeft}
                disabled={rightChecked.length === 0}>
                <span className='mdi mdi-arrow-left' />
              </ButtonBase>
            </div>
            {customList('Chosen Trainers', right)}
          </div>
        )}
      </div>
    </div>
  );
};

export default SchedulingPageView;
