import { useParams } from 'react-router-dom';
import { FormEvent, useEffect, useState } from 'react';
import Api from '../../services/Api';
import { Block } from 'baseui/block';
import { validate } from 'email-validator';
import { Card } from 'baseui/card';
import { Button } from 'baseui/button';
import { ButtonGroup } from 'baseui/button-group';
import { Option, Select } from 'baseui/select';
import Saving, { SavingState } from '../../components/Saving';
import { Input } from 'baseui/input';
import BackButton from '../../components/BackButton';
import { FlexGrid, FlexGridItem } from 'baseui/flex-grid';
import { KIND, Notification } from 'baseui/notification';
import { phone as validatePhone } from 'phone';

const DisplayUser = () => {
  const { id: userId } = useParams();
  const [user, setUser] = useState<any>(null);
  const [role, setRole] = useState<readonly Option[]>([]);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [message, setMessage] = useState('');
  const [savingState, setSavingState] = useState(SavingState.SAVED);

  const fetchUser = async () => {
    if (!userId) return;
    const user = await Api.getUser(userId);
    setUser(user);
    setEmail(user.email);
    setPhone(user.phone);
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setRole([{ id: user.role }]);
    setSavingState(SavingState.SAVED);
  };

  useEffect(() => {
    if (!user) return;
    if (user.email !== email) setSavingState(SavingState.NOT_SAVED);
    if (user.phone !== phone) setSavingState(SavingState.NOT_SAVED);
    if (role.length > 0 && user.role !== role[0].id)
      setSavingState(SavingState.NOT_SAVED);
    if (user.firstName !== firstName) setSavingState(SavingState.NOT_SAVED);
    if (user.lastName !== lastName) setSavingState(SavingState.NOT_SAVED);
  }, [role, email, phone, firstName, lastName]);

  const saveUser = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (firstName.length === 0) return setMessage('Le prénom est obligatoire');
    if (lastName.length === 0) return setMessage('Le nom est obligatoire');
    if (role.length === 0) return setMessage('Le rôle est obligatoire');
    if (email.length === 0) return setMessage("L'email est obligatoire");
    if (!validate(email)) return setMessage("L'email n'est pas valide");
    if (phone.length === 0) return setMessage('Le téléphone est obligatoire');
    const { phoneNumber: validatedPhone, isValid: isPhoneValid } =
      validatePhone(phone, {
        country: 'FR',
      });
    if (!isPhoneValid) return setMessage("Le téléphone n'est pas valide");
    setMessage('');
    Api.patchUser(user._id, {
      role: role[0].id,
      email,
      phone: validatedPhone,
      firstName,
      lastName,
    })
      .then(() => {
        setSavingState(SavingState.SAVED);
        void fetchUser();
      })
      .catch((error) => {
        console.error('Fail to update user');
        setMessage(error.message);
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
      <form onSubmit={saveUser}>
        <Saving state={savingState} />
        <BackButton />
        <Block>
          <label>
            <strong>Prénom</strong>
            <Input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </label>
        </Block>
        <Block>
          <label>
            <strong>Nom</strong>
            <Input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </label>
        </Block>
        <Block>
          <label>
            <strong>Email</strong>
            <Input
              value={email}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
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
              { label: 'Cadre', id: 'admin' },
              { label: 'Secouriste', id: 'user' },
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
              type="submit"
              isLoading={savingState === SavingState.SAVING}
            >
              Enregistrer
            </Button>
          </FlexGridItem>
        </FlexGrid>
      </form>
      {message && (
        <Block position="fixed" top="scale800" right="scale800">
          <Notification kind={KIND.negative}>{message}</Notification>
        </Block>
      )}
    </Card>
  );
};

export default DisplayUser;
