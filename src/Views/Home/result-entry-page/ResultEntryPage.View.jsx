import React, { useState } from 'react';
import { GlobalHistory } from 'Helpers';
import { ButtonBase } from '@mui/material';
import { Inputs, SelectComponent } from 'Components';
import './ResultEntryPage.scss';

const ResultEntryPageView = () => {
  const [state, setState] = useState({
    qid: '',
    testName: '',
    result: '',
  });

  return (
    <div className='results-wrapper view-wrapper'>
      <div className='page-header-wrapper'>
        <div className='page-title'>Results Entry</div>
      </div>

      <div className='page-content'>
        <div className='w-50 mb-4'>
          <Inputs
            autoFocus
            value={state.qid}
            labelValue='QID'
            onInputChanged={(event) => {
              const { value } = event.target;
              setState((items) => ({ ...items, qid: value }));
            }}
          />
        </div>
        <div className='w-50 mb-4'>
          <div className='field-title'>Test Name</div>
          <SelectComponent
            data={[
              { key: 'Theory Test', value: 'Theory Test' },
              { key: 'L-P Test', value: 'L-P Test' },
              { key: 'Road Test', value: 'Road Test' },
            ]}
            value={state.testName || -1}
            valueInput='key'
            textInput='value'
            defaultValue={-1}
            onSelectChanged={(newValue) => {
              setState((items) => ({ ...items, testName: newValue }));
            }}
          />
        </div>
        <div className='w-50 mb-4'>
          <Inputs
            autoFocus
            value={state.result}
            labelValue='Result'
            onInputChanged={(event) => {
              const { value } = event.target;
              setState((items) => ({ ...items, result: value }));
            }}
          />
        </div>
        <ButtonBase
          className='btns theme-primary c-white bg-secondary'
          onClick={() => GlobalHistory.push('/home/students-page')}>
          <span className='mdi mdi-check pr-1' />
          Save
        </ButtonBase>
      </div>
    </div>
  );
};

export default ResultEntryPageView;
