import { Button } from 'baseui/button';
import { Block } from 'baseui/block';
import { ButtonGroup } from 'baseui/button-group';
import { useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import Api from '../../services/Api';
import { TableBuilder, TableBuilderColumn } from 'baseui/table-semantic';
import {
  MdAlternateEmail,
  MdCheckCircle,
  MdDangerous,
  MdOutlineAddToHomeScreen,
  MdOutlineSms,
  MdPhonelinkRing,
  MdQueryBuilder,
} from 'react-icons/all';
import { FlexGrid } from 'baseui/flex-grid';
import Stat from '../../components/Stat';
import { KIND } from 'baseui/notification';
import useNotification from '../../hooks/useNotification';
import ContentCard from '../../components/ContentCard';

const DisplayEvent = () => {
  const { id: eventId } = useParams();
  const interval = useRef<number>();
  const [event, setEvent] = useState<any>(null);
  const notification = useNotification();

  const fetchEvent = async () => {
    if (!eventId) return;
    try {
      const { payload: event } = await Api.getEvent(eventId);
      setEvent(event);
    } catch (e) {
      console.error('Fail to fetch event');
    }
  };

  const notify = async (mode: string) => {
    if (!eventId) return;
    try {
      const { message } = await Api.sendNotification(eventId, mode);
      notification(message, KIND.positive);
    } catch (e) {
      notification("Impossible d'envoyer la notification", KIND.negative);
    }
    await fetchEvent();
  };

  useEffect(() => {
    void fetchEvent();
    interval.current = setInterval(() => {
      void fetchEvent();
    }, 10000);

    return () => {
      clearInterval(interval.current);
    };
  }, []);

  if (!event || !eventId) return null;

  const startDate = new Date(event.start).toLocaleDateString('fr-FR');
  const startTime = new Date(event.start).toLocaleTimeString('fr-FR');
  const endDate = new Date(event.end).toLocaleDateString('fr-FR');
  const endTime = new Date(event.end).toLocaleTimeString('fr-FR');

  return (
    <ContentCard previousPath="/dashboard/event/list" title={event.title}>
      <Block>
        <strong>Lieu:</strong> {event.location}
      </Block>
      <Block>
        <strong>Lien eProtect:</strong> {event.eProtecLink}
      </Block>
      <Block>
        <strong>Date de début:</strong> {startDate}
      </Block>
      <Block>
        <strong>Heure de début:</strong> {startTime}
      </Block>
      <Block>
        <strong>Date de fin:</strong> {endDate}
      </Block>
      <Block>
        <strong>Heure de fin:</strong> {endTime}
      </Block>
      <Block>
        <strong>Commentaire:</strong> {event.comment}
      </Block>
      <FlexGrid margin="1rem">
        <Stat number={event.pending} label="En attente" />
        <Stat number={event.accepted} label="Présent" />
        <Stat number={event.refused} label="Absent" />
      </FlexGrid>
      <ButtonGroup>
        <Button
          type="button"
          onClick={() => {
            void notify('email');
          }}
        >
          Alerter par email
        </Button>
        <Button
          type="button"
          onClick={() => {
            void notify('push');
          }}
        >
          Alerter par notification
        </Button>
        <Button
          type="button"
          onClick={() => {
            void notify('sms');
          }}
        >
          Alerter par SMS
        </Button>
        <Button
          type="button"
          onClick={() => {
            void notify('phone');
          }}
        >
          Alerter par appel téléphonique
        </Button>
      </ButtonGroup>
      <TableBuilder data={event.notifications}>
        <TableBuilderColumn<any> header="Nom">
          {(row) => row.user.firstName + ' ' + row.user.lastName}
        </TableBuilderColumn>
        <TableBuilderColumn<any> header="Notifications">
          {(row) => (
            <Block
              overrides={{
                Block: {
                  style: {
                    fontSize: '1.5rem',
                  },
                },
              }}
            >
              <MdAlternateEmail color={row.email ? 'green' : 'silver'} />
              <MdOutlineAddToHomeScreen color={row.push ? 'green' : 'silver'} />
              <MdOutlineSms color={row.sms ? 'green' : 'silver'} />
              <MdPhonelinkRing color={row.phone ? 'green' : 'silver'} />
            </Block>
          )}
        </TableBuilderColumn>
        <TableBuilderColumn<any>
          header="Disponibilité"
          overrides={{
            TableBodyCell: {
              style: {
                fontSize: '1rem',
              },
            },
          }}
        >
          {(row) => {
            switch (row.available) {
              case 'pending':
                return (
                  <>
                    <MdQueryBuilder /> En attente de réponse
                  </>
                );
              case 'accepted':
                return (
                  <>
                    <MdCheckCircle /> Disponible
                  </>
                );
              case 'refused':
                return (
                  <>
                    <MdDangerous /> Non disponible
                  </>
                );
              default:
                return (
                  <>
                    <MdQueryBuilder /> En attente de réponse
                  </>
                );
            }
          }}
        </TableBuilderColumn>
      </TableBuilder>
    </ContentCard>
  );
};

export default DisplayEvent;
