import React, { useState, useCallback, useEffect } from 'react';
import { ButtonBase, Tooltip } from '@mui/material';
import { TablesComponent } from 'Components';
import '../StudentsPage.scss';

const PendingTrainingPermit = () => {
  const [isLoading, setisLoading] = useState(false);
  const [students, setStudents] = useState({
    total_count: 4,
    results: [
      {
        id: 1,
        name: 'Zaid Ghazal',
        qid: '3425364758',
        phone: '+974775343534',
        registryDate: new Date(),
        barcode: '',
      },
      {
        id: 2,
        name: 'Manaf Hijazi',
        qid: '98765754732',
        phone: '+97232130534',
        registryDate: new Date(),
        barcode: '',
      },
      {
        id: 3,
        name: 'Ali Bustami',
        qid: '75674876',
        phone: '+97123432534',
        registryDate: new Date(),
        barcode: '',
      },
      {
        id: 4,
        name: 'Tala Ibrahim',
        qid: '646543523',
        phone: '+97423423223',
        registryDate: new Date(),
        barcode: '',
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
        <div className='page-title'>Pending Training Permit</div>
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
            label: 'Registry Date',
            input: 'registryDate',
            isDate: true,
          },
          {
            id: 5,
            label: 'Barcode',
            input: 'barcode',
            component: () => (
              <img
                width='120'
                height='40'
                src='https://static.vecteezy.com/system/resources/previews/001/199/360/original/barcode-png.png'
                alt='barcode'
              />
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

export default PendingTrainingPermit;
