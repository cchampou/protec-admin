import { useNavigate, useParams } from 'react-router-dom';
import { FormEvent, useEffect, useState } from 'react';
import Api from '../../services/Api';
import { Block } from 'baseui/block';
import { validate } from 'email-validator';
import { Card } from 'baseui/card';
import { Button } from 'baseui/button';
import { ButtonGroup } from 'baseui/button-group';
import { Option, Select } from 'baseui/select';
import { Input } from 'baseui/input';
import BackButton from '../../components/BackButton';
import { FlexGrid, FlexGridItem } from 'baseui/flex-grid';
import { KIND } from 'baseui/notification';
import { phone as validatePhone } from 'phone';
import useNotification from '../../hooks/useNotification';
import { HeadingSmall } from 'baseui/typography';
import ContentCard from '../../components/ContentCard';

const DisplayUser = () => {
  const { id: userId } = useParams();
  const [user, setUser] = useState<any>(null);
  const [role, setRole] = useState<readonly Option[]>([]);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const notification = useNotification();
  const navigate = useNavigate();

  const fetchUser = async () => {
    if (!userId) return;
    const user = await Api.getUser(userId);
    setUser(user);
    setEmail(user.email);
    setPhone(user.phone);
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setRole([{ id: user.role }]);
  };

  const saveUser = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (firstName.length === 0)
      return notification('Le prénom est obligatoire', KIND.negative);
    if (lastName.length === 0)
      return notification('Le nom est obligatoire', KIND.negative);
    if (role.length === 0)
      return notification('Le rôle est obligatoire', KIND.negative);
    if (email.length === 0)
      return notification("L'email est obligatoire", KIND.negative);
    if (!validate(email))
      return notification("L'email n'est pas valide", KIND.negative);
    if (phone.length === 0)
      return notification('Le téléphone est obligatoire', KIND.negative);
    const { phoneNumber: validatedPhone, isValid: isPhoneValid } =
      validatePhone(phone, {
        country: 'FR',
      });
    if (!isPhoneValid)
      return notification("Le téléphone n'est pas valide", KIND.negative);
    const body = {
      role: role[0].id,
      email,
      phone: validatedPhone,
      firstName,
      lastName,
    };
    if (userId) {
      Api.patchUser(user._id, body)
        .then(() => {
          notification('Utilisateur modifié', KIND.positive);
          void fetchUser();
        })
        .catch((error) => {
          notification(error.message, KIND.negative);
          console.error(error);
        });
    } else {
      Api.postUser(body)
        .then(() => {
          navigate('/dashboard/user/list');
        })
        .catch((error) => {
          notification(error.message, KIND.negative);
          console.error(error);
        });
    }
  };

  const inviteUser = async () => {
    if (!userId) return;
    await Api.inviteUser(userId);
    await fetchUser();
  };

  useEffect(() => {
    void fetchUser();
  }, [userId]);

  return (
    <ContentCard
      title={userId ? 'Editer un utilisateur' : 'Nouvel utilisateur'}
      previousPath="/dashboard/user/list"
    >
      <form onSubmit={saveUser}>
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
          {userId && (
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
          )}
          <FlexGridItem>
            <Button type="submit">Enregistrer</Button>
          </FlexGridItem>
        </FlexGrid>
      </form>
    </ContentCard>
  );
};

export default DisplayUser;
