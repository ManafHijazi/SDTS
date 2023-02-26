import React, {useState, useCallback, useEffect} from 'react';
import {TablesComponent} from 'Components';
import {ButtonBase, Tooltip} from '@mui/material';
import {showError} from 'Helpers';
import './StudentsPage.scss';

const StudentsPageView = () => {
  const [activeButton, setActiveButton] = useState('list');
  const [isLoading, setisLoading] = useState(false);
  const [students, setStudents] = useState({
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

  const getAllStudents = useCallback(async () => {
    setisLoading(true);

    const response = {};

    if (response && response.data && response.status === 200) {
      const {data} = response;

      setStudents(data);
    } else {
      showError(
        (response && response.data && response.data.error) ||
        (response && response.data && response.data[0]) ||
        'Failed To Get Students'
      );
    }

    setisLoading(false);
  }, [filter]);

  useEffect(() => {
    getAllStudents();
  }, [getAllStudents]);

  return (
    <div className='students-wrapper view-wrapper'>
      <div className='page-header-wrapper'>
        <div className='page-title'>Students</div>
        <div className='page-actions'>
          <ButtonBase
            className={`btns-icon btns-split-left c-secondary ${activeButton === 'list' ? 'bg-secondary c-white' : ''
              }`}
            onClick={() => setActiveButton('list')}>
            <span className='mdi mdi-format-list-bulleted' />
          </ButtonBase>
          <ButtonBase
            className={`btns-icon btns-split-right c-secondary mr-3 ${activeButton === 'card' ? 'bg-secondary c-white' : ''
              }`}
            onClick={() => setActiveButton('card')}>
            <span className='mdi mdi-id-card' />
          </ButtonBase>

          <ButtonBase className='btns theme-primary c-white bg-secondary pr-3' onClick={() => { }}>
            <span className='mdi mdi-plus pr-1' />
            Register New Student
          </ButtonBase>
        </div>
      </div>

      {activeButton === 'list' ? (
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
          ageIndex={filter.page - 1 || 0}
          pageSize={filter.page_limit || 0}
          onPageIndexChanged={onPageIndexChanged}
          data={(students && students.results) || []}
          totalItems={(students && students.total_count) || 25}
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
      ) : (
        <div className='cards-wrapper'>
          {students &&
            students.results.length > 0 &&
            students.results.map((item, index) => (
              <div key={`${index + 1}-card-item`} className='card-item'>
                <div className='card-title'>{item.full_name}</div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default StudentsPageView;
