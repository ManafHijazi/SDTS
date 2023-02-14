import React, { memo, useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ButtonBase, Avatar } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Inputs } from '../../../Inputs/Inputs.Component';
import { DialogComponent } from '../../../Dialog/Dialog.Component';
import './InputTheme.Style.scss';

export const InputThemeComponent = memo(
  ({
    allFiles,
    uploadRef,
    isDragOver,
    parentTranslationPath,
    translationPathShared,
    translationPath,
    inputPlaceholder,
    label,
    dropHereText,
    idRef,
    isDisabled,
    isSubmitted,
    helperText,
    inputThemeClass,
    allFilesDeleteHandler,
    uploaderTheme,
    localProfilePicture,
    setLocalProfilePicture,
    isAlternativeOpen,
    setIsAlternativeOpen,
  }) => {
    const { t } = useTranslation([parentTranslationPath, 'Shared']);
    const endAdornmentRef = useRef(null);
    const [endAdornmentWidth, setEndAdornmentWidth] = useState(120);
    const [isDialogOpened, setIsDialogOpened] = useState(false);
    const [isConfirmOpened, setIsConfirmOpened] = useState(false);
    const [isDoneOpened, setIsDoneOpened] = useState(false);
    const [localPicture, setLocalPicture] = useState(null);

    /**
     * @Description method to rerender on bind end or start adornments to re-calc width
     */
    const onAdornmentsChanged = () => {
      if (endAdornmentWidth !== endAdornmentRef.current?.offsetWidth)
        setEndAdornmentWidth(endAdornmentRef.current?.offsetWidth || 120);
    };

    useEffect(() => {
      if (allFiles && allFiles[0]) setIsDoneOpened(true);
    }, [allFiles]);

    useEffect(() => {
      setIsDialogOpened(isAlternativeOpen);
    }, [isAlternativeOpen]);

    return (
      <div className={`input-theme-component-wrapper${(isDragOver && ' drag-over') || ''}`}>
        {uploaderTheme !== 'menu_upload' && (
          <Inputs
            idRef={`themeInputUploaderRef${idRef}`}
            label={label}
            inputPlaceholder={inputPlaceholder}
            error={helperText && helperText.length > 0}
            helperText={helperText}
            isSubmitted={isSubmitted}
            translationPath={
              translationPath || (translationPath !== '' && translationPathShared) || ''
            }
            value=''
            themeClass={inputThemeClass}
            parentTranslationPath={parentTranslationPath}
            startAdornment={
              <div className='end-adornment-wrapper' ref={endAdornmentRef}>
                <ButtonBase
                  id={`themeInputUploadPhotpBtnRef${idRef}`}
                  className='btns theme-solid pr-3'
                  onClick={() => setIsDialogOpened(true)}
                  disabled={isDisabled}
                >
                  <span className='mdi mdi-camera mx-1' />
                  Upload Photo
                </ButtonBase>
              </div>
            }
            endAdornment={
              uploaderTheme !== 'menu_upload' && (
                <Avatar
                  className='avatars-wrapper theme-upload uploader-avatar-wrapper'
                  src={localPicture || localProfilePicture}
                />
              )
            }
            onAdornmentsChanged={onAdornmentsChanged}
          />
        )}

        <div className='custom-dropzone-wrapper'>
          {(allFiles.length === 0 || isDragOver) && (
            <div
              className={`drop-here${(allFiles.length > 0 && ' as-overlay') || ''}`}
              style={{
                maxWidth: `calc(100% - ${endAdornmentWidth}px)`,
              }}
            >
              {t(`${translationPathShared}${dropHereText}`)}
            </div>
          )}
        </div>

        <DialogComponent
          maxWidth='xs'
          wrapperClasses='uploader-dilaog-wrapper'
          saveIdRef='themeInputUploaderSaveDialogBtnId'
          cancelIdRef='themeInputUploaderCancelDialogBtnId'
          dialogContent={
            <div className='uploader-dialog-content'>
              <Avatar
                className='avatars-wrapper theme-large uploader-avatar-wrapper'
                src={
                  allFiles && allFiles[0]
                    ? URL.createObjectURL(allFiles[0].file)
                    : localProfilePicture
                }
              />
            </div>
          }
          saveClasses='btns theme-solid bg-primary c-white theme-short'
          cancelClasses='btns theme-outline bg-white c-primary theme-short'
          saveText={`${(allFiles && allFiles[0]) || localProfilePicture ? 'Change' : 'Upload'}`}
          confirmText='Confirm'
          cancelText={`${(allFiles && allFiles[0]) || localProfilePicture ? 'Remove' : 'Discard'}`}
          isWithIcon
          isUploaderDialog
          isOpen={isDialogOpened}
          onCancelClicked={() => {
            if ((allFiles && allFiles[0]) || localProfilePicture) setIsConfirmOpened(true);
            else {
              setIsDialogOpened(false);

              if (setIsAlternativeOpen) setIsAlternativeOpen(false);
            }
          }}
          onSaveClicked={(event) => {
            event.preventDefault();
            uploadRef.current.click();
          }}
          onCloseClicked={() => {
            if (!localPicture) allFilesDeleteHandler();
            setIsDialogOpened(false);

            if (setIsAlternativeOpen) setIsAlternativeOpen(false);
          }}
        />

        <DialogComponent
          maxWidth='sm'
          wrapperClasses='uploader-dilaog-wrapper is-remove'
          saveIdRef='themeInputUploaderRemoveSaveDialogBtnId'
          cancelIdRef='themeInputUploaderRemoveCancelDialogBtnId'
          dialogContent={
            <div className='uploader-dialog-content pt-4'>Remove profile picture ?</div>
          }
          saveClasses='btns theme-solid bg-primary c-white'
          cancelClasses='btns theme-outline bg-white c-primary'
          saveText='Remove'
          cancelText='Cancel'
          isUploaderDialog
          isOpen={isConfirmOpened}
          onCancelClicked={() => {
            setIsConfirmOpened(false);
          }}
          onSaveClicked={(event) => {
            event.preventDefault();
            allFilesDeleteHandler();
            setLocalProfilePicture(null);
            setLocalPicture(null);
            setIsDoneOpened(true);
          }}
        />

        <DialogComponent
          maxWidth='xs'
          wrapperClasses='uploader-dilaog-wrapper'
          saveIdRef='themeInputUploaderConfirmeSaveDialogBtnId'
          cancelIdRef='themeInputUploaderConfirmCancelDialogBtnId'
          dialogContent={
            <div className='uploader-dialog-content'>
              <Avatar
                className='avatars-wrapper theme-large uploader-avatar-wrapper mt-3 mb-3'
                src={allFiles && allFiles[0] && URL.createObjectURL(allFiles[0].file)}
              />
              Profile Picture will update soon
            </div>
          }
          saveClasses='btns theme-solid bg-primary c-white theme-short'
          saveText='Ok'
          isUploaderDialog
          isOpen={isDoneOpened}
          onSaveClicked={(event) => {
            event.preventDefault();

            if (allFiles && allFiles[0]) setLocalPicture(URL.createObjectURL(allFiles[0].file));
            else setLocalPicture(null);

            if (setIsAlternativeOpen) setIsAlternativeOpen(false);

            setIsDoneOpened(false);
            setIsConfirmOpened(false);
            setIsDialogOpened(false);
          }}
        />
      </div>
    );
  },
);

InputThemeComponent.propTypes = {
  allFiles: PropTypes.instanceOf(Array),
  isDragOver: PropTypes.bool.isRequired,
  parentTranslationPath: PropTypes.string,
  translationPathShared: PropTypes.string.isRequired,
  idRef: PropTypes.string.isRequired,
  accept: PropTypes.string.isRequired,
  dropHereText: PropTypes.string.isRequired,
  multiple: PropTypes.bool.isRequired,
  allFilesDeleteHandler: PropTypes.func,
  fileItemDeleteDisabledHandler: PropTypes.func,
  helperText: PropTypes.string,
  uploaderBtnText: PropTypes.string,
  fileDeleted: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool,
  isDisabledDelete: PropTypes.bool,
  isAlternativeOpen: PropTypes.bool,
  isSubmitted: PropTypes.bool,
  uploadRef: PropTypes.instanceOf(Object).isRequired,
  translationPath: PropTypes.string,
  inputPlaceholder: PropTypes.string,
  label: PropTypes.string,
  inputThemeClass: PropTypes.string,
  localProfilePicture: PropTypes.string,
  setLocalProfilePicture: PropTypes.func,
};
InputThemeComponent.defaultProps = {
  allFiles: [],
  parentTranslationPath: '',
  localProfilePicture: '',
  setLocalProfilePicture: () => {},
  isDisabled: false,
  isDisabledDelete: false,
  isSubmitted: false,
  isAlternativeOpen: false,
  allFilesDeleteHandler: undefined,
  fileItemDeleteDisabledHandler: undefined,
  helperText: undefined,
  uploaderBtnText: undefined,
  translationPath: undefined,
  inputPlaceholder: undefined,
  label: undefined,
  inputThemeClass: undefined,
};
