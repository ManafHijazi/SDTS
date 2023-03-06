import React, { useState, useCallback, useEffect } from 'react';
import { TablesComponent } from 'Components';
import { ButtonBase, Tooltip } from '@mui/material';
import { GlobalHistory } from 'Helpers';
import '../StudentsPage.scss';

const ScheduleRoadLessons = () => {
  const [isLoading, setisLoading] = useState(false);
  const [students, setStudents] = useState({
    total_count: 3,
    results: [
      {
        id: 1,
        qid: '987654432',
        name: 'Zaid Ghazal',
        phone: '+974775343534',
        status: 'Not Scheduled',
      },
      {
        id: 2,
        qid: '2435365447',
        name: 'Manaf Hijazi',
        phone: '+974775343534',
        status: 'Scheduled',
      },
      {
        id: 3,
        qid: '5764323387',
        name: 'Ali Bustami',
        phone: '+974775343534',
        status: 'Append Schedule',
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
        <div className='page-title'>Schedule Road Lessons</div>
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
            id: 2,
            label: 'QID',
            input: 'qid',
          },
          {
            id: 1,
            label: 'Name',
            input: 'name',
          },
          {
            id: 3,
            label: 'Phone',
            input: 'phone',
          },
          {
            id: 4,
            label: 'Status',
            input: 'status',
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
              <Tooltip title='Schedule'>
                <ButtonBase
                  className='btns-icon theme-primary mr-3 c-primary'
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();

                    GlobalHistory.push('/home/scheduling-page');
                  }}>
                  <span className='mdi mdi-calendar-clock' />
                </ButtonBase>
              </Tooltip>
            </>
          ),
        }}
      />
    </div>
  );
};

export default ScheduleRoadLessons;
