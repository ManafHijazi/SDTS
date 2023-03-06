import React, { useState, useCallback, useEffect } from 'react';
import {
  Datepicker,
  DialogComponent,
  Inputs,
  SelectComponent,
  TablesComponent,
  UploaderComponent,
} from 'Components';
import { ButtonBase, Tooltip } from '@mui/material';
import './TrainersPage.scss';
import dayjs from 'dayjs';
import { UploaderThemesEnum } from 'enums';

const TrainersPageView = () => {
  const [isLoading, setisLoading] = useState(false);
  const [isRegisterDialogOpen, setIsRegisterDialogOpen] = useState(false);
  const [trainers, setTrainers] = useState({
    total_count: 25,
    results: [
      {
        id: 1,
        qid: '4564768i7',
        name: 'Trainer 1',
        phone: '+97042354354',
        nationality: 'Jordanian',
        gender: 'Male',
        languages: 'Arabic, English',
        permit: 'Valid',
        registerationDate: new Date(),
        status: 'Active',
      },
      {
        id: 2,
        qid: '56758697',
        name: 'Trainer 2',
        phone: '+9704236d546',
        nationality: 'Qatari',
        gender: 'Male',
        languages: 'Arabic, English',
        permit: 'Valid',
        registerationDate: new Date(),
        status: 'Deactivated',
      },
      {
        id: 3,
        qid: '098765345',
        name: 'Trainer 3',
        phone: '+97045645354',
        nationality: 'Indian',
        gender: 'Male',
        languages: 'English',
        permit: 'Valid',
        registerationDate: new Date(),
        status: 'Terminated',
      },
    ],
  });
  const [filter, setFilter] = useState({
    query: '',
    sort_order: '',
    page: 1,
    page_limit: 5,
  });
  const [profilePicture, setProfilePicture] = useState([]);
  const [passportPhoto, setPassportPhoto] = useState([]);
  const [qidFront, setQidFront] = useState([]);
  const [qidBack, setQidBack] = useState([]);
  const [trainingFront, setTrainingFront] = useState([]);
  const [trainingBack, setTrainingBack] = useState([]);
  const [registerState, setRegisterState] = useState({
    name: '',
    personalPhoto: '',
    qid: '',
    qidDate: '',
    phone: '',
    gender: '',
    dob: '',
    nationality: '',
    languages: [],
    passportPhoto: '',
    qidFrontSidePhoto: '',
    qidBackSidePhoto: '',
    educational: '',
    trainingFrontPermitPhoto: '',
    trainingBackPermitPhoto: '',
    trainingPermitExpiryDate: '',
    experienceInQatar: '',
    experienceAbroad: '',
    licenseType: [],
    categories: [],
    trainingPermit: [],
  });

  const onPageIndexChanged = (newIndex) => {
    setFilter((items) => ({ ...items, page: newIndex }));
  };

  const getAllTrainers = useCallback(async () => {
    setisLoading(true);

    const response = {};

    if (response && response.data && response.status === 200) {
      const { data } = response;

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

  const isOpenRegisterChanged = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setRegisterState({
      name: '',
      qid: '',
      qidDate: '',
      phone: '',
      gender: '',
      dob: '',
      personalPhoto: '',
      nationality: '',
      languages: [],
      passportPhoto: '',
      qidFrontSidePhoto: '',
      qidBackSidePhoto: '',
      educational: '',
      trainingFrontPermitPhoto: '',
      trainingBackPermitPhoto: '',
      trainingPermitExpiryDate: '',
      experienceInQatar: '',
      experienceAbroad: '',
      licenseType: [],
      categories: [],
      trainingPermit: [],
    });
    setIsRegisterDialogOpen(false);
  };

  useEffect(() => {
    getAllTrainers();
  }, [getAllTrainers]);

  return (
    <div className='trainers-wrapper view-wrapper'>
      <div className='page-header-wrapper'>
        <div className='page-title'>Trainers</div>
        <div className='page-actions'>
          <ButtonBase
            className='btns theme-primary c-white bg-secondary pr-3'
            onClick={() => setIsRegisterDialogOpen(true)}>
            <span className='mdi mdi-plus pr-1' />
            Register New Trainer
          </ButtonBase>
        </div>
      </div>

      <TablesComponent
        headerData={[
          {
            id: 1,
            label: 'QID',
            input: 'qid',
          },
          {
            id: 2,
            label: 'Name',
            input: 'name',
          },
          {
            id: 3,
            label: 'Phone Number',
            input: 'phone',
          },
          {
            id: 4,
            label: 'Nationality',
            input: 'nationality',
          },
          {
            id: 5,
            label: 'Gender',
            input: 'gender',
          },
          {
            id: 6,
            label: 'Languages',
            input: 'languages',
          },
          {
            id: 7,
            label: 'Training Permit',
            input: 'permit',
          },
          {
            id: 8,
            label: 'Registration Date',
            input: 'registerationDate',
            isDate: true,
          },
          {
            id: 9,
            label: 'Status',
            input: 'status',
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

      <DialogComponent
        maxWidth='xl'
        saveIdRef='studentSaveDialogBtnId'
        cancelIdRef='studentCancelDialogBtnId'
        wrapperClasses='student-dilaog-wrapper'
        dialogTitle='Register New Trainer'
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
                type='number'
                value={+registerState.phone || ''}
                inputPlaceholder='Phone'
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
                  { key: 'Arabic', value: 'Arabic' },
                  { key: 'English', value: 'English' },
                  { key: 'Indian', value: 'Indian' },
                  { key: 'French', value: 'French' },
                  { key: 'Spanish', value: 'Spanish' },
                  { key: 'Italian', value: 'Italian' },
                  { key: 'Languages', value: 'Languages', isHiddenOnOpen: true },
                ]}
                multiple
                value={
                  (registerState.languages.length > 0 && registerState.languages) || ['Languages']
                }
                valueInput='key'
                textInput='value'
                getIsChecked={(listItem) =>
                  registerState.languages.findIndex((el) => el === listItem.key) !== -1
                }
                placeholder='Languages'
                onSelectChanged={(newValue) => {
                  setRegisterState((items) => {
                    const localIndex = items.languages.findIndex((el) => el === 'Languages');

                    items.languages.push(...newValue.splice(localIndex, 1));

                    return { ...items };
                  });
                }}
              />
            </div>
            <div className='dialog-filed'>
              <SelectComponent
                data={[
                  { key: 'High School', value: 'High School' },
                  { key: 'College', value: 'College' },
                  { key: 'Bachelor', value: 'Bachelor' },
                  { key: 'Master', value: 'Master' },
                  { key: 'PhD', value: 'PhD' },
                ]}
                value={registerState.educational || -1}
                valueInput='key'
                textInput='value'
                defaultValue={-1}
                onSelectChanged={(newValue) => {
                  setRegisterState((items) => ({ ...items, educational: newValue }));
                }}
                emptyItem={{ value: -1, text: 'Educational Level', isHiddenOnOpen: true }}
              />
            </div>
            <div className='dialog-filed'>
              <Inputs
                type='number'
                value={+registerState.experienceInQatar || ''}
                inputPlaceholder='Experience in Qatar (Years)'
                onInputChanged={(event) => {
                  const { value } = event.target;
                  setRegisterState((items) => ({ ...items, experienceInQatar: +value }));
                }}
              />
            </div>
            <div className='dialog-filed'>
              <Inputs
                type='number'
                value={+registerState.experienceAbroad || ''}
                inputPlaceholder='Experience Abroad (Years)'
                onInputChanged={(event) => {
                  const { value } = event.target;
                  setRegisterState((items) => ({ ...items, experienceAbroad: +value }));
                }}
              />
            </div>
            <div className='dialog-filed'>
              <SelectComponent
                data={[
                  { key: 'Car', value: 'Car' },
                  { key: 'Excavator', value: 'Excavator' },
                  { key: 'MotorCycle', value: 'MotorCycle' },
                  { key: 'Trailer', value: 'Trailer' },
                  { key: 'Med.Truck', value: 'Med.Truck' },
                  { key: 'Crane،', value: 'Crane،' },
                  { key: 'Bus', value: 'Bus' },
                  { key: 'License Type', value: 'License Type', isHiddenOnOpen: true },
                ]}
                multiple
                value={
                  (registerState.licenseType.length > 0 && registerState.licenseType) || [
                    'License Type',
                  ]
                }
                valueInput='key'
                textInput='value'
                getIsChecked={(listItem) =>
                  registerState.licenseType.findIndex((el) => el === listItem.key) !== -1
                }
                placeholder='License Type'
                onSelectChanged={(newValue) => {
                  setRegisterState((items) => {
                    const localIndex = items.licenseType.findIndex((el) => el === 'License Type');

                    items.licenseType.push(...newValue.splice(localIndex, 1));

                    return { ...items };
                  });
                }}
              />
            </div>
            <div className='d-flex align-center w-100 pl-2 mb-4'>
              <div className='dialog-filed mr-3'>
                <SelectComponent
                  data={[
                    {
                      key: 'Regular Light Vehicle Female - Manual',
                      value: 'Regular Light Vehicle Female - Manual',
                    },
                    { key: 'Regular Light Vehicle - Auto', value: 'Regular Light Vehicle - Auto' },
                    { key: 'MotorCycle', value: 'MotorCycle' },
                    { key: 'Trailer', value: 'Trailer' },
                    { key: 'Crane،', value: 'Crane،' },
                    { key: 'Bus', value: 'Bus' },
                    { key: 'Categories', value: 'Categories', isHiddenOnOpen: true },
                  ]}
                  multiple
                  value={
                    (registerState.categories.length > 0 && registerState.categories) || [
                      'Categories',
                    ]
                  }
                  valueInput='key'
                  textInput='value'
                  getIsChecked={(listItem) =>
                    registerState.categories.findIndex((el) => el === listItem.key) !== -1
                  }
                  placeholder='Categories'
                  onSelectChanged={(newValue) => {
                    setRegisterState((items) => {
                      const localIndex = items.categories.findIndex((el) => el === 'Categories');

                      items.categories.push(...newValue.splice(localIndex, 1));

                      return { ...items };
                    });
                  }}
                />
              </div>
              <div className='dialog-filed ml-2'>
                <SelectComponent
                  data={[
                    { key: 'Car', value: 'Car' },
                    { key: 'Excavator', value: 'Excavator' },
                    { key: 'MotorCycle', value: 'MotorCycle' },
                    { key: 'Trailer', value: 'Trailer' },
                    { key: 'Med.Truck', value: 'Med.Truck' },
                    { key: 'Crane،', value: 'Crane،' },
                    { key: 'Bus', value: 'Bus' },
                    { key: 'Training Permit', value: 'Training Permit', isHiddenOnOpen: true },
                  ]}
                  multiple
                  value={
                    (registerState.trainingPermit.length > 0 && registerState.trainingPermit) || [
                      'Training Permit',
                    ]
                  }
                  valueInput='key'
                  textInput='value'
                  getIsChecked={(listItem) =>
                    registerState.trainingPermit.findIndex((el) => el === listItem.key) !== -1
                  }
                  placeholder='Training Permit'
                  onSelectChanged={(newValue) => {
                    setRegisterState((items) => {
                      const localIndex = items.trainingPermit.findIndex(
                        (el) => el === 'Training Permit'
                      );

                      items.trainingPermit.push(...newValue.splice(localIndex, 1));

                      return { ...items };
                    });
                  }}
                />
              </div>
            </div>

            <div className='dialog-filed'>
              <UploaderComponent
                accept='image/*'
                uploadedFiles={profilePicture || null}
                inputPlaceholder='Personal Photo'
                uploadedFileChanged={(newFiles) => setProfilePicture(newFiles)}
              />
            </div>
            <div className='dialog-filed'>
              <UploaderComponent
                accept='image/*'
                uploadedFiles={passportPhoto || null}
                componentTheme={UploaderThemesEnum.File}
                inputPlaceholder='Passport Photo'
                uploadedFileChanged={(newFiles) => setPassportPhoto(newFiles)}
              />
            </div>
            <div className='dialog-filed'>
              <UploaderComponent
                accept='image/*'
                uploadedFiles={qidFront || null}
                componentTheme={UploaderThemesEnum.File}
                inputPlaceholder='QID Front Side Photo'
                uploadedFileChanged={(newFiles) => setQidFront(newFiles)}
              />
            </div>
            <div className='dialog-filed'>
              <UploaderComponent
                accept='image/*'
                uploadedFiles={qidBack || null}
                componentTheme={UploaderThemesEnum.File}
                inputPlaceholder='QID Back Side Photo'
                uploadedFileChanged={(newFiles) => setQidBack(newFiles)}
              />
            </div>
            <div className='dialog-filed'>
              <UploaderComponent
                accept='image/*'
                uploadedFiles={trainingFront || null}
                componentTheme={UploaderThemesEnum.File}
                inputPlaceholder='Training Front Permit Photo'
                uploadedFileChanged={(newFiles) => setTrainingFront(newFiles)}
              />
            </div>
            <div className='dialog-filed'>
              <UploaderComponent
                accept='image/*'
                uploadedFiles={trainingBack || null}
                componentTheme={UploaderThemesEnum.File}
                inputPlaceholder='Training Back Permit Photo'
                uploadedFileChanged={(newFiles) => setTrainingBack(newFiles)}
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
            personalPhoto: '',
            qid: '',
            qidDate: '',
            phone: '',
            gender: '',
            dob: '',
            nationality: '',
            languages: [],
            passportPhoto: '',
            qidFrontSidePhoto: '',
            qidBackSidePhoto: '',
            educational: '',
            trainingFrontPermitPhoto: '',
            trainingBackPermitPhoto: '',
            trainingPermitExpiryDate: '',
            experienceInQatar: '',
            experienceAbroad: '',
            licenseType: [],
            categories: [],
            trainingPermit: [],
          });
        }}
        onCancelClicked={() => {
          setIsRegisterDialogOpen(false);
          setRegisterState({
            name: '',
            personalPhoto: '',
            qid: '',
            qidDate: '',
            phone: '',
            gender: '',
            dob: '',
            nationality: '',
            languages: [],
            passportPhoto: '',
            qidFrontSidePhoto: '',
            qidBackSidePhoto: '',
            educational: '',
            trainingFrontPermitPhoto: '',
            trainingBackPermitPhoto: '',
            trainingPermitExpiryDate: '',
            experienceInQatar: '',
            experienceAbroad: '',
            licenseType: [],
            categories: [],
            trainingPermit: [],
          });
        }}
      />
    </div>
  );
};

export default TrainersPageView;
