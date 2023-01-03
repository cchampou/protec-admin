import { Button, SIZE } from 'baseui/button';
import { Block } from 'baseui/block';
import { ButtonGroup } from 'baseui/button-group';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Api from '../../services/Api';
import UploadUsers from './UploadUsers';
import { TableBuilder, TableBuilderColumn } from 'baseui/table-semantic';
import ContentCard from '../../components/ContentCard';

const ListUsers = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [isOpenUploadUsers, setIsOpenUploadUsers] = useState(false);

  useEffect(() => {
    Api.getUsers().then((users) => {
      setUsers(users);
    });
  }, [isOpenUploadUsers]);

  return (
    <ContentCard title="Utilisateurs">
      <UploadUsers
        isOpen={isOpenUploadUsers}
        onClose={() => setIsOpenUploadUsers(false)}
      />
      <ButtonGroup>
        <Button type="button" onClick={() => navigate('/dashboard/user')}>
          Créer
        </Button>
        <Button type="button" onClick={() => setIsOpenUploadUsers(true)}>
          Importer
        </Button>
      </ButtonGroup>
      <Block height="scale400" />
      <TableBuilder data={users}>
        <TableBuilderColumn<any> header="Nom">
          {(row) => row.lastName + ' ' + row.firstName ?? 'N/A'}
        </TableBuilderColumn>
        <TableBuilderColumn<any> header="Email">
          {(row) => row.email ?? 'N/A'}
        </TableBuilderColumn>
        <TableBuilderColumn<any> header="Téléphone">
          {(row) => row.phone ?? 'N/A'}
        </TableBuilderColumn>
        <TableBuilderColumn<any> header="Actions">
          {(row) => (
            <Button
              type="button"
              size={SIZE.mini}
              onClick={() => navigate('/dashboard/user/' + row._id)}
            >
              Voir
            </Button>
          )}
        </TableBuilderColumn>
      </TableBuilder>
    </ContentCard>
  );
};

export default ListUsers;
