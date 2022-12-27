import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Api from '../../services/Api';
import { Block } from 'baseui/block';
import { HeadingSmall } from 'baseui/typography';
import { Card } from 'baseui/card';
import { Button } from 'baseui/button';
import { ButtonGroup } from 'baseui/button-group';
import { Option, Select } from 'baseui/select';
import Saving, { SavingState } from '../../components/Saving';
import { Input } from 'baseui/input';
import BackButton from '../../components/BackButton';
import { FlexGrid, FlexGridItem } from 'baseui/flex-grid';

const DisplayUser = () => {
  const { id: userId } = useParams();
  const [user, setUser] = useState<any>(null);
  const [role, setRole] = useState<readonly Option[]>([]);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [savingState, setSavingState] = useState(SavingState.SAVED);

  const fetchUser = async () => {
    if (!userId) return;
    const user = await Api.getUser(userId);
    setUser(user);
    setEmail(user.email);
    setPhone(user.phone);
    setRole([{ id: user.role }]);
    setSavingState(SavingState.SAVED);
  };

  useEffect(() => {
    if (!user) return;
    if (user.email !== email) setSavingState(SavingState.NOT_SAVED);
    if (user.phone !== phone) setSavingState(SavingState.NOT_SAVED);
    if (role.length > 0 && user.role !== role[0].id)
      setSavingState(SavingState.NOT_SAVED);
  }, [role, email, phone]);

  const saveUser = () => {
    Api.patchUser(user._id, {
      role: role[0].id,
      email,
      phone,
    })
      .then((user) => {
        setUser(user);
        setSavingState(SavingState.SAVED);
      })
      .catch(() => {
        console.error('Fail to update user');
        setSavingState(SavingState.SAVED);
      });
  };

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
      <Saving state={savingState} />
      <HeadingSmall>
        {user?.firstName} {user?.lastName}
      </HeadingSmall>
      <BackButton />
      <Block>
        <label>
          <strong>Email</strong>
          <Input value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
      </Block>
      <Block marginTop="scale800">
        <label>
          <strong>Téléphone</strong>
          <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
        </label>
      </Block>
      <Block marginTop="scale800">
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
      <FlexGrid
        flexGridColumnCount={2}
        marginTop="scale800"
        justifyContent="space-between"
      >
        <FlexGridItem>
          <ButtonGroup>
            <Button type="button" onClick={inviteUser}>
              Inviter
            </Button>
            <Button type="button" disabled onClick={() => {}}>
              Supprimer
            </Button>
          </ButtonGroup>
        </FlexGridItem>
        <FlexGridItem>
          <Button
            type="button"
            isLoading={savingState === SavingState.SAVING}
            onClick={saveUser}
          >
            Enregistrer
          </Button>
        </FlexGridItem>
      </FlexGrid>
    </Card>
  );
};

export default DisplayUser;
