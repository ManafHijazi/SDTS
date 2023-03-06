import React, { useState, useCallback, useEffect } from 'react';
import dayjs from 'dayjs';
import { Avatar, ButtonBase, Tooltip } from '@mui/material';
import { DialogComponent, Inputs, TablesComponent, SelectComponent, Datepicker } from 'Components';
import './StudentsPage.scss';

const StudentsPageView = () => {
  const [activeButton, setActiveButton] = useState('list');
  const [isLoading, setisLoading] = useState(false);
  const [isCreateDialogOpen, setiIsCreateDialogOpen] = useState(false);
  const [isRegisterDialogOpen, setIsRegisterDialogOpen] = useState(false);
  const [students, setStudents] = useState({
    total_count: 5,
    results: [
      {
        id: 1,
        name: 'Zaid Ghazal',
        qid: '3425364758',
        phone: '+974775343534',
        gender: 'Male',
        dob: '27/3/1999',
        nationality: 'Jordanian',
        language: 'Arabic',
        qidDate: '25/2/2030',
        email: 'zaid@sdts.com',
        sponser: 'Individual',
        jobTitle: 'Data Scientest',
      },
      {
        id: 2,
        name: 'Manaf Hijazi',
        qid: '3425364758',
        phone: '+974775386334',
        gender: 'Male',
        dob: '29/1/1999',
        nationality: 'Jordanian',
        language: 'Arabic',
        qidDate: '25/2/2024',
        email: 'manaf@sdts.com',
        sponser: 'Individual',
        jobTitle: 'Software Engineer',
      },
      {
        id: 3,
        name: 'Ahmad Ali',
        qid: '5435654758',
        phone: '+97476786331',
        gender: 'Male',
        dob: '6/8/2001',
        nationality: 'Qatari',
        language: 'Arabic',
        qidDate: '11/4/2034',
        email: 'ahmad@sdts.com',
        sponser: 'Company',
        jobTitle: 'Employee',
      },
      {
        id: 4,
        name: 'Farah Mustafa',
        qid: '75654758',
        phone: '+9747677831',
        gender: 'Female',
        dob: '26/5/2003',
        nationality: 'Qatari',
        language: 'English',
        qidDate: '3/7/2038',
        email: 'farah@sdts.com',
        sponser: 'Company',
        jobTitle: 'Engineer',
      },
      {
        id: 4,
        name: 'Tala Ibrahim',
        qid: '345678321',
        phone: '+9787986831',
        gender: 'Female',
        dob: '1/3/1998',
        nationality: 'Jordanian',
        language: 'Arabic',
        qidDate: '30/1/2027',
        email: 'tala@sdts.com',
        sponser: 'Individual',
        jobTitle: 'Doctor',
      },
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
    course: '',
  });
  const [registerState, setRegisterState] = useState({
    name: '',
    qid: '',
    qidDate: dayjs(),
    email: '',
    phone: '',
    gender: '',
    dob: dayjs(),
    sponser: '',
    nationality: '',
    jobTitle: '',
    language: '',
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

  const isOpenCreateChanged = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setState({
      qid: '',
      course: '',
    });
    setiIsCreateDialogOpen(false);
  };

  const isOpenRegisterChanged = (event) => {
    event.preventDefault();
    event.stopPropagation();

    // setStudents((items) => ({ ...items, results: [...items.results, registerState] }));

    setRegisterState({
      name: '',
      qid: '',
      qidDate: dayjs(),
      email: '',
      phone: '',
      gender: '',
      dob: dayjs(),
      sponser: '',
      nationality: '',
      jobTitle: '',
      language: '',
    });
    setIsRegisterDialogOpen(false);
  };

  useEffect(() => {
    getAllStudents();
  }, [getAllStudents]);

  return (
    <div className='students-wrapper view-wrapper'>
      <div className='page-header-wrapper'>
        <div className='page-title'>Students</div>
        <div className='page-actions'>
          <ButtonBase
            className={`btns-icon btns-split-left c-secondary ${
              activeButton === 'list' ? 'bg-secondary c-white' : ''
            }`}
            onClick={() => setActiveButton('list')}>
            <span className='mdi mdi-format-list-bulleted' />
          </ButtonBase>
          <ButtonBase
            className={`btns-icon btns-split-right c-secondary mr-3 ${
              activeButton === 'card' ? 'bg-secondary c-white' : ''
            }`}
            onClick={() => setActiveButton('card')}>
            <span className='mdi mdi-id-card' />
          </ButtonBase>

          <ButtonBase
            className='btns theme-primary c-white bg-secondary pr-3'
            onClick={() => setiIsCreateDialogOpen(true)}>
            <span className='mdi mdi-plus pr-1' />
            Create New Student
          </ButtonBase>
        </div>
      </div>

      {activeButton === 'list' ? (
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
              label: 'Gender',
              input: 'gender',
            },
            {
              id: 5,
              label: 'Nationality',
              input: 'nationality',
            },
            {
              id: 6,
              label: 'Language',
              input: 'language',
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
                    className='btns-icon theme-primary mr-3 c-primary'
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();

                      // setRegisterState(row);
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
                <div className='avatar-wrapper'>
                  <Avatar alt={item.name} src='' />
                </div>
                <div className='card-body'>
                  <div className='card-title'>
                    Name: {item.name} <span>{`( ${item.qid} )`}</span>
                  </div>
                  <div className='card-title'>Phone: {item.phone}</div>
                  <div className='card-title'>Gender: {item.gender}</div>
                  <div className='card-title'>Nationality: {item.nationality}</div>
                  <div className='card-title'>Language: {item.language}</div>
                </div>
              </div>
            ))}
        </div>
      )}

      <DialogComponent
        maxWidth='sm'
        saveIdRef='studentSaveDialogBtnId'
        cancelIdRef='studentCancelDialogBtnId'
        wrapperClasses='student-dilaog-wrapper'
        dialogTitle='Create New Student'
        dialogContent={
          <div className='dialog-content'>
            <div className='dialog-filed'>
              <Inputs
                autoFocus
                value={state.qid}
                idRef='studentQidInputId'
                inputPlaceholder='QID'
                onInputChanged={(event) => {
                  const { value } = event.target;
                  setState((items) => ({ ...items, qid: value }));
                }}
              />
            </div>
            <div className='dialog-filed'>
              <SelectComponent
                data={[
                  { key: 'Course 1', value: 'Course 1' },
                  { key: 'Course 2', value: 'Course 2' },
                  { key: 'Course 3', value: 'Course 3' },
                  { key: 3, value: 'Course 4' },
                  { key: 4, value: 'Course 5' },
                ]}
                value={state.course || -1}
                valueInput='key'
                textInput='value'
                defaultValue={-1}
                onSelectChanged={(newValue) => {
                  setState((items) => ({ ...items, course: newValue }));
                }}
                emptyItem={{ value: -1, text: 'Select Course', isHiddenOnOpen: true }}
              />
            </div>
          </div>
        }
        saveText='Save'
        isOpen={isCreateDialogOpen}
        cancelClasses='btns theme-outline'
        onSaveClicked={isOpenCreateChanged}
        saveClasses='btns theme-solid bg-primary'
        onCloseClicked={() => {
          setiIsCreateDialogOpen(false);
          setState({
            qid: '',
            course: '',
          });
        }}
        onCancelClicked={() => {
          setiIsCreateDialogOpen(false);
          setState({
            qid: '',
            course: '',
          });
        }}
      />

      <DialogComponent
        maxWidth='md'
        saveIdRef='studentSaveDialogBtnId'
        cancelIdRef='studentCancelDialogBtnId'
        wrapperClasses='student-dilaog-wrapper'
        dialogTitle='Register New Student'
        dialogContent={
          <div className='dialog-content'>
            <div className='dialog-filed'>
              <Inputs
                autoFocus
                value={registerState.name}
                inputPlaceholder='Name'
                onInputChanged={(event) => {
                  const { value } = event.target;
                  setRegisterState((items) => ({ ...items, name: value }));
                }}
              />
            </div>
            <div className='dialog-filed'>
              <Inputs
                value={registerState.qid}
                inputPlaceholder='QID'
                onInputChanged={(event) => {
                  const { value } = event.target;
                  setRegisterState((items) => ({ ...items, qid: value }));
                }}
              />
            </div>
            <div className='dialog-filed'>
              <Datepicker
                maxDate={dayjs('2100-01-1')}
                label='QID Expiry Date'
                value={registerState.qidDate}
                onChange={(value) => {
                  if (value) setRegisterState((items) => ({ ...items, qidDate: value }));
                }}
              />
            </div>
            <div className='dialog-filed'>
              <Inputs
                value={registerState.email}
                inputPlaceholder='Email'
                onInputChanged={(event) => {
                  const { value } = event.target;
                  setRegisterState((items) => ({ ...items, email: value }));
                }}
              />
            </div>
            <div className='dialog-filed'>
              <Inputs
                type='number'
                value={+registerState.phone || ''}
                inputPlaceholder='Phone Number'
                onInputChanged={(event) => {
                  const { value } = event.target;
                  setRegisterState((items) => ({ ...items, phone: +value }));
                }}
              />
            </div>
            <div className='dialog-filed'>
              <SelectComponent
                data={[
                  { key: 'Male', value: 'Male' },
                  { key: 'Female', value: 'Female' },
                ]}
                value={registerState.gender || -1}
                valueInput='key'
                textInput='value'
                defaultValue={-1}
                onSelectChanged={(newValue) => {
                  setRegisterState((items) => ({ ...items, gender: newValue }));
                }}
                emptyItem={{ value: -1, text: 'Gender', isHiddenOnOpen: true }}
              />
            </div>
            <div className='dialog-filed'>
              <Datepicker
                label='Birth Date'
                value={registerState.dob}
                maxDate={dayjs('2023-03-6')}
                onChange={(value) => {
                  if (value) setRegisterState((items) => ({ ...items, dob: value }));
                }}
              />
            </div>
            <div className='dialog-filed'>
              <SelectComponent
                data={[
                  { key: 'Individual', value: 'Individual' },
                  { key: 'Company', value: 'Company' },
                  { key: 'Government', value: 'Government' },
                  { key: 'Other', value: 'Other' },
                ]}
                value={registerState.sponser || -1}
                valueInput='key'
                textInput='value'
                defaultValue={-1}
                onSelectChanged={(newValue) => {
                  setRegisterState((items) => ({ ...items, sponser: newValue }));
                }}
                emptyItem={{ value: -1, text: 'Sponser', isHiddenOnOpen: true }}
              />
            </div>
            <div className='dialog-filed'>
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
                value={registerState.nationality || -1}
                valueInput='key'
                textInput='value'
                defaultValue={-1}
                onSelectChanged={(newValue) => {
                  setRegisterState((items) => ({ ...items, nationality: newValue }));
                }}
                emptyItem={{ value: -1, text: 'Nationality', isHiddenOnOpen: true }}
              />
            </div>
            <div className='dialog-filed'>
              <SelectComponent
                data={[
                  { key: 'Employee', value: 'Employee' },
                  { key: 'Engineer', value: 'Engineer' },
                  { key: 'Manager', value: 'Manager' },
                  { key: 'Driver', value: 'Driver' },
                  { key: 'Doctor', value: 'Doctor' },
                ]}
                value={registerState.jobTitle || -1}
                valueInput='key'
                textInput='value'
                defaultValue={-1}
                onSelectChanged={(newValue) => {
                  setRegisterState((items) => ({ ...items, jobTitle: newValue }));
                }}
                emptyItem={{ value: -1, text: 'Job Title', isHiddenOnOpen: true }}
              />
            </div>
            <div className='dialog-filed'>
              <SelectComponent
                data={[
                  { key: 'Arabic', value: 'Arabic' },
                  { key: 'English', value: 'English' },
                  { key: 'Indian', value: 'Indian' },
                  { key: 'French', value: 'French' },
                  { key: 'Spanish', value: 'Spanish' },
                  { key: 'Italian', value: 'Italian' },
                ]}
                value={registerState.language || -1}
                valueInput='key'
                textInput='value'
                defaultValue={-1}
                onSelectChanged={(newValue) => {
                  setRegisterState((items) => ({ ...items, language: newValue }));
                }}
                emptyItem={{ value: -1, text: 'Language', isHiddenOnOpen: true }}
              />
            </div>
          </div>
        }
        saveText='Register'
        isOpen={isRegisterDialogOpen}
        cancelClasses='btns theme-outline'
        onSaveClicked={isOpenRegisterChanged}
        saveClasses='btns theme-solid bg-primary'
        onCloseClicked={() => {
          setIsRegisterDialogOpen(false);
          setRegisterState({
            name: '',
            qid: '',
            qidDate: dayjs(),
            email: '',
            phone: '',
            gender: '',
            dob: dayjs(),
            sponser: '',
            nationality: '',
            jobTitle: '',
            language: '',
          });
        }}
        onCancelClicked={() => {
          setIsRegisterDialogOpen(false);
          setRegisterState({
            name: '',
            qid: '',
            qidDate: dayjs(),
            email: '',
            phone: '',
            gender: '',
            dob: dayjs(),
            sponser: '',
            nationality: '',
            jobTitle: '',
            language: '',
          });
        }}
      />
    </div>
  );
};

export default StudentsPageView;
