import { Card } from 'baseui/card';
import { Table } from 'baseui/table';
import { Button } from 'baseui/button';
import { Block } from 'baseui/block';
import { ButtonGroup } from 'baseui/button-group';
import { HeadingSmall, HeadingXSmall } from 'baseui/typography';
import { useNavigate } from 'react-router-dom';

const ListUsers = () => {
  const navigate = useNavigate();

  return (
    <Card>
      <HeadingSmall>Utilisateurs</HeadingSmall>
      <ButtonGroup>
        <Button type="button" onClick={() => navigate('/user/new')}>
          Créer
        </Button>
        <Button type="button">Importer</Button>
      </ButtonGroup>
      <Block height="scale400" />
      <Table
        columns={['Nom', 'Prénom', 'Email', 'Téléphone']}
        data={[
          [
            'Champouillon',
            'Clément',
            'clement@champouillon.com',
            '06 98 39 34 84',
          ],
        ]}
      />
    </Card>
  );
};

export default ListUsers;
