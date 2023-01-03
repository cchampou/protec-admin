import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { Block } from 'baseui/block';
import { KIND, Notification } from 'baseui/notification';
import { KindType } from 'baseui/toast';

type NotificationContextType = {
  notify: (message: string, kind?: KindType) => void;
};

export const notificationContext = createContext<NotificationContextType>({
  notify: () => {},
});

export const NotificationProvider = ({ children }: any) => {
  const timeout = useRef<number>();
  const [message, setMessage] = useState<string>('');
  const [kind, setKind] = useState<KindType>(KIND.info);

  useEffect(() => {
    if (message.length > 0) {
      timeout.current = window.setTimeout(() => setMessage(''), 5000);
    }
    return () => {
      if (timeout.current) clearTimeout(timeout.current);
    };
  }, [message]);

  const notify = (message: string, kind: KindType) => {
    setMessage(message);
    setKind(kind);
  };

  return (
    <notificationContext.Provider value={{ notify }}>
      {children}
      {message && (
        <Block position="fixed" top="scale800" right="scale800">
          <Notification kind={kind}>{message}</Notification>
        </Block>
      )}
    </notificationContext.Provider>
  );
};

const useNotification = () => {
  const { notify } = useContext(notificationContext);

  return notify;
};

export default useNotification;
