import { Card } from 'baseui/card';
import { Table } from 'baseui/table';

const ListUsers = () => {
  return (
    <Card>
      <h1>List Users</h1>
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
