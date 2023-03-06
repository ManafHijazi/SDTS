import React, { useState, useCallback, useEffect } from 'react';
import { GlobalHistory } from 'Helpers';
import { TablesComponent } from 'Components';
import { ButtonBase, Tooltip } from '@mui/material';
import './SchedulesPage.scss';

const SchedulesPageView = () => {
  const [isLoading, setisLoading] = useState(false);
  const [vehicles, setVehicles] = useState({
    total_count: 3,
    results: [
      {
        id: 1,
        studentName: 'Zaid Ghazal',
        trainerName: 'Trainer 1',
        lessonDateTime: new Date(),
        status: 'Done',
      },
      {
        id: 2,
        studentName: 'Ali Bustami',
        trainerName: 'Trainer 2',
        lessonDateTime: new Date(),
        status: 'To Be',
      },
      {
        id: 3,
        studentName: 'Manaf Hijazi',
        trainerName: 'Trainer 3',
        lessonDateTime: new Date(),
        status: 'Done',
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

  const getAllVehicles = useCallback(async () => {
    setisLoading(true);

    const response = {};

    if (response && response.data && response.status === 200) {
      const { data } = response;

      setVehicles(data);
    } else {
      // showError(
      //   (response && response.data && response.data.error) ||
      //   (response && response.data && response.data[0]) ||
      //   'Failed To Get Vehicle'
      // );
    }

    setisLoading(false);
  }, [filter]);

  useEffect(() => {
    getAllVehicles();
  }, [getAllVehicles]);

  return (
    <div className='schedules-wrapper view-wrapper'>
      <div className='page-header-wrapper'>
        <div className='page-title'>Scheduled Lessons</div>
      </div>

      <TablesComponent
        headerData={[
          {
            id: 1,
            label: 'Student Name',
            input: 'studentName',
          },
          {
            id: 2,
            label: 'Trainer Name',
            input: 'trainerName',
          },
          {
            id: 3,
            label: 'Lesson DateTime',
            input: 'lessonDateTime',
            isDate: true,
          },
          {
            id: 4,
            label: 'Status',
            input: 'status',
          },
        ]}
        isWithTableActions
        pageIndex={filter.page - 1 || 0}
        pageSize={filter.page_limit || 0}
        onPageIndexChanged={onPageIndexChanged}
        data={(vehicles && vehicles.results) || []}
        totalItems={(vehicles && vehicles.total_count) || 25}
        tableActionsOptions={{
          component: (row) => (
            <>
              <Tooltip title='Edit'>
                <ButtonBase
                  className='btns-icon theme-primary mr-3 c-primary'
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();

                    GlobalHistory.push('/home/scheduling-page');
                  }}>
                  <span className='mdi mdi-pencil' />
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

export default SchedulesPageView;
