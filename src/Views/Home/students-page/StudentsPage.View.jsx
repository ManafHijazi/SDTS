import React, {useState, useCallback, useEffect} from 'react';
import {DialogComponent, Inputs, TablesComponent, SelectComponent} from 'Components';
import {ButtonBase, Tooltip} from '@mui/material';
import {showError} from 'Helpers';
import './StudentsPage.scss';

const StudentsPageView = () => {
  const [activeButton, setActiveButton] = useState('list');
  const [isLoading, setisLoading] = useState(false);
  const [isCreateDialogOpen, setiIsCreateDialogOpen] = useState(false);
  const [isRegisterDialogOpen, setIsRegisterDialogOpen] = useState(false);
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
  const [state, setState] = useState({
    qid: '',
    course: ''
  });
  const [registerState, setRegisterState] = useState({
    firstname: '',
    lastname: '',
    phone: ''
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
      // showError(
      //   (response && response.data && response.data.error) ||
      //   (response && response.data && response.data[0]) ||
      //   'Failed To Get Students'
      // );
    }

    setisLoading(false);
  }, [filter]);

  const isOpenCreateChanged = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setState({
      qid: '',
      course: ''
    });
    setiIsCreateDialogOpen(false)
  };

  const isOpenRegisterChanged = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setRegisterState({
      firstname: '',
      lastname: '',
      phone: ''
    });
    setIsRegisterDialogOpen(false);
  }

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

          <ButtonBase className='btns theme-primary c-white bg-secondary pr-3' onClick={() => setiIsCreateDialogOpen(true)}>
            <span className='mdi mdi-plus pr-1' />
            Create New Student
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

                      setIsRegisterDialogOpen(true);
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

      <DialogComponent
        maxWidth="sm"
        saveIdRef="studentSaveDialogBtnId"
        cancelIdRef="studentCancelDialogBtnId"
        wrapperClasses="student-dilaog-wrapper"
        dialogTitle='Create New Student'
        dialogContent={
          <div className="dialog-content">
            <div className="dialog-filed">
              <Inputs
                autoFocus
                value={state.qid}
                idRef="studentQidInputId"
                inputPlaceholder="QID"
                onInputChanged={(event) => {
                  const {value} = event.target;
                  setState(items => ({...items, qid: value}));
                }}
              />
            </div>
            <div className="dialog-filed">
              <SelectComponent
                data={[{key: 'Course 1', value: 'Course 1'}, {key: 'Course 2', value: 'Course 2'}, {key: 'Course 3', value: 'Course 3'}, {key: 3, value: 'Course 4'}, {key: 4, value: 'Course 5'}]}
                value={state.course || -1}
                valueInput="key"
                textInput="value"
                defaultValue={-1}
                onSelectChanged={(newValue) => {
                  setState(items => ({...items, course: newValue}));
                }}
                emptyItem={{value: -1, text: "Select Course", isHiddenOnOpen: true}}
              />
            </div>
          </div>
        }
        saveText='Save'
        isOpen={isCreateDialogOpen}
        cancelClasses="btns theme-outline"
        onSaveClicked={isOpenCreateChanged}
        saveClasses="btns theme-solid bg-primary"
        onCloseClicked={() => {
          setiIsCreateDialogOpen(false);
          setState({
            qid: '',
            course: ''
          });
        }}
        onCancelClicked={() => {
          setiIsCreateDialogOpen(false);
          setState({
            qid: '',
            course: ''
          });
        }}
      />

      <DialogComponent
        maxWidth="md"
        saveIdRef="studentSaveDialogBtnId"
        cancelIdRef="studentCancelDialogBtnId"
        wrapperClasses="student-dilaog-wrapper"
        dialogTitle='Register New Student'
        dialogContent={
          <div className="dialog-content">
            <div className="dialog-filed">
              <Inputs
                autoFocus
                value={state.firstname}
                inputPlaceholder="First Name"
                onInputChanged={(event) => {
                  const {value} = event.target;
                  setRegisterState(items => ({...items, firstname: value}));
                }}
              />
            </div>
            <div className="dialog-filed">
              <Inputs
                value={state.lastname}
                inputPlaceholder="Last Name"
                onInputChanged={(event) => {
                  const {value} = event.target;
                  setRegisterState(items => ({...items, lastname: value}));
                }}
              />
            </div>
            <div className="dialog-filed">
              <Inputs
                type="number"
                value={state.phone}
                inputPlaceholder="Phone Number"
                onInputChanged={(event) => {
                  const {value} = event.target;
                  setRegisterState(items => ({...items, phone: value}));
                }}
              />
            </div>
          </div>
        }
        saveText='Register'
        isOpen={isRegisterDialogOpen}
        cancelClasses="btns theme-outline"
        onSaveClicked={isOpenRegisterChanged}
        saveClasses="btns theme-solid bg-primary"
        onCloseClicked={() => {
          setIsRegisterDialogOpen(false);
          setRegisterState({
            firstname: '',
            lastname: '',
            phone: ''
          });
        }}
        onCancelClicked={() => {
          setIsRegisterDialogOpen(false);
          setRegisterState({
            firstname: '',
            lastname: '',
            phone: ''
          });
        }}
      />
    </div>
  );
};

export default StudentsPageView;
