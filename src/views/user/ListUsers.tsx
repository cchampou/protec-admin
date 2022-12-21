import { Card } from 'baseui/card';
import { Table } from 'baseui/table';
import { Button } from 'baseui/button';
import { Block } from 'baseui/block';
import { ButtonGroup } from 'baseui/button-group';
import { HeadingSmall, HeadingXSmall } from 'baseui/typography';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Api from '../../services/Api';
import UploadUsers from './UploadUsers';

const ListUsers = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [isOpenUploadUsers, setIsOpenUploadUsers] = useState(false);

  useEffect(() => {
    Api.getUsers().then((users) => {
      setUsers(
        users.map((user: any) => [
          user.lastName,
          user.firstName,
          user.email,
          user.phone,
        ]),
      );
    });
  }, [isOpenUploadUsers]);

  return (
    <Card>
      <HeadingSmall>Utilisateurs</HeadingSmall>
      <UploadUsers
        isOpen={isOpenUploadUsers}
        onClose={() => setIsOpenUploadUsers(false)}
      />
      <ButtonGroup>
        <Button type="button" disabled onClick={() => navigate('/user/new')}>
          Créer
        </Button>
        <Button type="button" onClick={() => setIsOpenUploadUsers(true)}>
          Importer
        </Button>
      </ButtonGroup>
      <Block height="scale400" />
      <Table columns={['Nom', 'Prénom', 'Email', 'Téléphone']} data={users} />
    </Card>
  );
};

export default ListUsers;
