import { Card } from 'baseui/card';
import { HeadingSmall } from 'baseui/typography';
import { Button, KIND } from 'baseui/button';
import { Block } from 'baseui/block';
import { useNavigate } from 'react-router-dom';
import { TableBuilder, TableBuilderColumn } from 'baseui/table-semantic';
import Api from '../../services/Api';
import { useEffect, useState } from 'react';

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

  useEffect(() => {
    Api.getEvents().then((events) => {
      setEvents(events);
    });
  }, []);

  return (
    <Card>
      <HeadingSmall>Liste des événements</HeadingSmall>
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
    </Card>
  );
};

export default ListEvents;
