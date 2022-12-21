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
import { useRef, useState } from 'react';
import Api from '../../services/Api';

const UploadUsers = (props: Pick<ModalProps, 'onClose' | 'isOpen'>) => {
  const uploadRef = useRef<File>();
  const [error, setError] = useState<string>();

  const uploadFile = async (accepted: File[]) => {
    try {
      await Api.importUsers(accepted[0]);
      props.onClose?.({ closeSource: 'escape' });
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <Modal {...props} animate autoFocus size={SIZE.default} role={ROLE.dialog}>
      <ModalHeader>Upload users</ModalHeader>
      <ModalBody>
        <FileUploader
          onDropAccepted={uploadFile}
          accept={'.csv'}
          errorMessage={error}
          onRetry={() => setError(undefined)}
        />
      </ModalBody>
    </Modal>
  );
};

export default UploadUsers;
