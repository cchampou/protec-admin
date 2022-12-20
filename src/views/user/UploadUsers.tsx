import {
  Modal,
  ModalBody,
  ModalButton,
  ModalFooter,
  ModalHeader,
  ModalProps,
  ROLE,
  SIZE,
} from 'baseui/modal';
import { FileUploader } from 'baseui/file-uploader';
import { useRef } from 'react';
import Api from '../../services/Api';

const UploadUsers = (props: Partial<ModalProps>) => {
  const uploadRef = useRef<File>();

  const uploadFile = () => {
    if (uploadRef.current) {
      void Api.importUsers(uploadRef.current);
    }
  };

  return (
    <Modal {...props} animate autoFocus size={SIZE.default} role={ROLE.dialog}>
      <ModalHeader>Upload users</ModalHeader>
      <ModalBody>
        <FileUploader
          onDropAccepted={(accepted) => {
            uploadRef.current = accepted[0];
          }}
        />
      </ModalBody>
      <ModalFooter>
        <ModalButton onClick={uploadFile}>Upload</ModalButton>
      </ModalFooter>
    </Modal>
  );
};

export default UploadUsers;
