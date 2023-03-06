import React, { useState, useCallback, useEffect } from 'react';
import dayjs from 'dayjs';
import { TablesComponent } from 'Components';
import { ButtonBase, Tooltip } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, MobileDateTimePicker } from '@mui/x-date-pickers';
import '../StudentsPage.scss';

const PendingTheoryTest = () => {
  const [isLoading, setisLoading] = useState(false);
  const [students, setStudents] = useState({
    total_count: 2,
    results: [
      {
        id: 1,
        name: 'Zaid Ghazal',
        qid: '3425364758',
        phone: '+974775343534',
        subjectCompletionDate: new Date(),
        testDateTime: new Date(),
        confirmationStatus: 'Confirmed',
      },
      {
        id: 2,
        name: 'Manaf Hiazji',
        qid: '97865546434',
        phone: '+974745343534',
        subjectCompletionDate: new Date(),
        testDateTime: new Date(),
        confirmationStatus: 'Pending',
      },
    ],
  });
  const [filter, setFilter] = useState({
    query: '',
    sort_order: '',
    page: 1,
    page_limit: 5,
  });

  const onPageIndexChanged = (newIndex) => {
    setFilter((items) => ({ ...items, page: newIndex }));
  };

  const getAllStudents = useCallback(async () => {
    setisLoading(true);

    const response = {};

    if (response && response.data && response.status === 200) {
      const { data } = response;

      setStudents(data);
    } else {
      // showError(
      //   (response && response.data && response.data.error) ||
      //   (response && response.data && response.data[0]) ||
      //   'Failed To Get Students'
      // );
    }

    setisLoading(false);
  }, [filter]);

  useEffect(() => {
    getAllStudents();
  }, [getAllStudents]);

  return (
    <div className='students-wrapper view-wrapper'>
      <div className='page-header-wrapper'>
        <div className='page-title'>Pending Theory Test</div>
        <div className='page-actions'>
          <ButtonBase className='btns theme-primary c-white bg-secondary pr-3' onClick={() => {}}>
            <span className='mdi mdi-printer-outline pr-1' />
            Print
          </ButtonBase>
        </div>
      </div>

      <TablesComponent
        headerData={[
          {
            id: 1,
            label: 'Name',
            input: 'name',
          },
          {
            id: 2,
            label: 'QID',
            input: 'qid',
          },
          {
            id: 3,
            label: 'Phone',
            input: 'phone',
          },
          {
            id: 4,
            label: 'Subject Completion Date',
            input: 'subjectCompletionDate',
            isDate: true,
          },
          {
            id: 6,
            label: 'Confirmation Status',
            input: 'confirmationStatus',
          },
          {
            id: 5,
            label: 'Test DateTime',
            input: 'testDateTime',
            component: () => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MobileDateTimePicker defaultValue={dayjs('2022-04-17T15:30')} />
              </LocalizationProvider>
            ),
          },
        ]}
        isWithTableActions
        ageIndex={filter.page - 1 || 0}
        pageSize={filter.page_limit || 0}
        onPageIndexChanged={onPageIndexChanged}
        data={(students && students.results) || []}
        totalItems={(students && students.total_count) || 25}
        tableActionsOptions={{
          component: (row) => (
            <>
              <Tooltip title='Confirm'>
                <ButtonBase
                  className='btns-icon theme-primary mr-3 c-success'
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                  }}>
                  <span className='mdi mdi-check-circle-outline' />
                </ButtonBase>
              </Tooltip>

              <Tooltip title='Delete'>
                <ButtonBase
                  className='btns-icon theme-primary mr-3 c-danger'
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                  }}>
                  <span className='mdi mdi-delete-forever' />
                </ButtonBase>
              </Tooltip>
            </>
          ),
        }}
      />
    </div>
  );
};

export default PendingTheoryTest;
