import React, {useState, useCallback, useEffect} from 'react';
import {TablesComponent} from 'Components';
import {ButtonBase, Tooltip} from '@mui/material';
import {showError} from 'Helpers';
import './TrainersPage.scss';

const TrainersPageView = () => {
  const [isLoading, setisLoading] = useState(false);
  const [trainers, setTrainers] = useState({
    total_count: 0,
    results: [
      {id: 1, user_name: 'testuser1', full_name: 'Test User 1', created_date: new Date()},
      {id: 2, user_name: 'testuser2', full_name: 'Test User 2', created_date: new Date()},
      {id: 3, user_name: 'testuser3', full_name: 'Test User 3', created_date: new Date()},
      {id: 4, user_name: 'testuser4', full_name: 'Test User 4', created_date: new Date()},
      {id: 5, user_name: 'testuser5', full_name: 'Test User 5', created_date: new Date()},
    ],
  });
  const [filter, setFilter] = useState({
    query: '',
    sort_order: '',
    page: 1,
    page_limit: 5,
  });

  const onPageIndexChanged = (newIndex) => {
    setFilter((items) => ({...items, page: newIndex}));
  };

  const getAllTrainers = useCallback(async () => {
    setisLoading(true);

    const response = {};

    if (response && response.data && response.status === 200) {
      const {data} = response;

      setStudents(data);
    } else {
      // showError(
      //   (response && response.data && response.data.error) ||
      //   (response && response.data && response.data[0]) ||
      //   'Failed To Get Trainer'
      // );
    }

    setisLoading(false);
  }, [filter]);

  useEffect(() => {
    getAllTrainers();
  }, [getAllTrainers]);

  return (
    <div className='trainers-wrapper view-wrapper'>
      <div className='page-header-wrapper'>
        <div className='page-title'>Trainers</div>
        <div className='page-actions'>
          <ButtonBase className='btns theme-primary c-white bg-secondary pr-3' onClick={() => { }}>
            <span className='mdi mdi-plus pr-1' />
            Register New Trainer
          </ButtonBase>
        </div>
      </div>

      <TablesComponent
        headerData={[
          {
            id: 1,
            label: 'Username',
            input: 'user_name',
          },
          {
            id: 2,
            label: 'Full Name',
            input: 'full_name',
          },
          {
            id: 4,
            label: 'Created Date',
            input: 'created_date',
            isDate: true,
          },
        ]}
        isWithTableActions
        pageIndex={filter.page - 1 || 0}
        pageSize={filter.page_limit || 0}
        onPageIndexChanged={onPageIndexChanged}
        data={(trainers && trainers.results) || []}
        totalItems={(trainers && trainers.total_count) || 25}
        tableActionsOptions={{
          component: (row) => (
            <>
              <Tooltip title='Edit'>
                <ButtonBase
                  className='btns-icon theme-primary mr-3 c-info'
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                  }}>
                  <span className='mdi mdi-account-edit' />
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

export default TrainersPageView;
