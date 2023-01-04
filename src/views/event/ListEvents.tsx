import { Button, KIND } from 'baseui/button';
import { Block } from 'baseui/block';
import { KIND as NOTIFICATION_KIND } from 'baseui/notification';
import { useNavigate } from 'react-router-dom';
import { TableBuilder, TableBuilderColumn } from 'baseui/table-semantic';
import Api from '../../services/Api';
import { useEffect, useState } from 'react';
import ContentCard from '../../components/ContentCard';
import useNotification from '../../hooks/useNotification';

type SeeDetailsButtonProps = {
  id: string;
};

const SeeDetailsButton = ({ id }: SeeDetailsButtonProps) => {
  const navigate = useNavigate();

  return (
    <Button
      kind={KIND.secondary}
      size={'compact'}
      onClick={() => navigate('/dashboard/event/' + id)}
      type="button"
    >
      Voir les détails
    </Button>
  );
};

const ListEvents = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const notification = useNotification();

  const fetchEvents = async () => {
    try {
      const { payload: eventsFromApi } = await Api.getEvents();
      setEvents(eventsFromApi);
    } catch (error) {
      notification(error.message, NOTIFICATION_KIND.negative);
    }
  };

  useEffect(() => {
    void fetchEvents();
  }, []);

  return (
    <ContentCard title="Liste des événements">
      <Button type="button" onClick={() => navigate('/dashboard/event/new')}>
        Nouveau
      </Button>
      <Block height="scale400" />
      <TableBuilder data={events}>
        <TableBuilderColumn<any> header="Titre">
          {(row) => row.title ?? 'N/A'}
        </TableBuilderColumn>
        <TableBuilderColumn<any> header="Lieu">
          {(row) => row?.location ?? 'N/A'}
        </TableBuilderColumn>
        <TableBuilderColumn<any> header="Date">
          {(row) => row?.start ?? 'N/A'}
        </TableBuilderColumn>
        <TableBuilderColumn<any> header="Actions">
          {(row) => <SeeDetailsButton id={row._id} />}
        </TableBuilderColumn>
      </TableBuilder>
    </ContentCard>
  );
};

export default ListEvents;
