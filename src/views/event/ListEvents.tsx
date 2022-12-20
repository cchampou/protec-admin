import { Card } from 'baseui/card';
import { HeadingSmall } from 'baseui/typography';
import { Button, KIND } from 'baseui/button';
import { Block } from 'baseui/block';
import { useNavigate } from 'react-router-dom';
import { TableBuilder, TableBuilderColumn } from 'baseui/table-semantic';

const SeeDetailsButton = () => {
  const navigate = useNavigate();

  return (
    <Button
      kind={KIND.secondary}
      size={'compact'}
      onClick={() => navigate('/event/details')}
      type="button"
    >
      Voir les détails
    </Button>
  );
};

const ROW = {
  title: 'Essai',
  location: 'Place Bellecour',
  date: '24/12/2022 18:00',
};

const ListEvents = () => {
  const navigate = useNavigate();

  return (
    <Card>
      <HeadingSmall>Liste des événements</HeadingSmall>
      <Button type="button" onClick={() => navigate('/event/new')}>
        Nouveau
      </Button>
      <Block height="scale400" />
      <TableBuilder data={[ROW]}>
        <TableBuilderColumn<typeof ROW> header="Titre">
          {(row) => row.title}
        </TableBuilderColumn>
        <TableBuilderColumn<typeof ROW> header="Lieu">
          {(row) => row.location}
        </TableBuilderColumn>
        <TableBuilderColumn<typeof ROW> header="Date">
          {(row) => row.date}
        </TableBuilderColumn>
        <TableBuilderColumn header="Actions">
          {() => <SeeDetailsButton />}
        </TableBuilderColumn>
      </TableBuilder>
    </Card>
  );
};

export default ListEvents;
