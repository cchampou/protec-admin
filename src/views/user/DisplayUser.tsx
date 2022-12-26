import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Api from '../../services/Api';
import { Block } from 'baseui/block';
import { HeadingSmall } from 'baseui/typography';
import { Card } from 'baseui/card';
import { Button } from 'baseui/button';
import { ButtonGroup } from 'baseui/button-group';
import { Option, Select } from 'baseui/select';

const DisplayUser = () => {
  const { id: userId } = useParams();
  const [user, setUser] = useState<any>(null);
  const [role, setRole] = useState<readonly Option[]>([]);

  const fetchUser = async () => {
    if (!userId) return;
    const user = await Api.getUser(userId);
    setUser(user);
    setRole([{ id: user.role }]);
  };

  useEffect(() => {
    if (!user || role.length !== 1 || user.role === role[0].id) return;
    console.log('update role', role);
    Api.patchUser(user._id, { role: role[0].id })
      .then(() => {
        void fetchUser();
      })
      .catch(() => {
        console.error('Fail to update user');
      });
  }, [role, user]);

  const inviteUser = async () => {
    if (!userId) return;
    await Api.inviteUser(userId);
    await fetchUser();
  };

  useEffect(() => {
    void fetchUser();
  }, [userId]);

  if (!user) return null;

  return (
    <Card>
      <HeadingSmall>
        {user?.firstName} {user?.lastName}
      </HeadingSmall>
      <Block>
        <strong>Email:</strong> {user?.email}
      </Block>
      <Block>
        <strong>Téléphone:</strong> {user?.phone}
      </Block>
      <Block>
        <strong>Role</strong>
        <Select
          value={role}
          onChange={({ value }) => setRole(value)}
          options={[
            { label: 'Admin', id: 'admin' },
            { label: 'Utilisateur', id: 'user' },
          ]}
        />
      </Block>
      <Block marginTop="scale400">
        <ButtonGroup>
          <Button type="button" onClick={inviteUser}>
            Inviter
          </Button>
          <Button type="button" disabled onClick={() => {}}>
            Supprimer
          </Button>
        </ButtonGroup>
      </Block>
    </Card>
  );
};

export default DisplayUser;
