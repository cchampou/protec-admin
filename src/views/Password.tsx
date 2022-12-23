// A react view to recover a password with a recovery token input and password confirmation input.

import { Button } from 'baseui/button';
import { Block } from 'baseui/block';
import { Input } from 'baseui/input';
import { FormControl } from 'baseui/form-control';
import { useNavigate } from 'react-router-dom';
import { FormEvent, useState } from 'react';
import Api from '../services/Api';
import { Card } from 'baseui/card';
import { HeadingSmall } from 'baseui/typography';

const Password = () => {
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    void Api.resetPassword(token, password);
    // navigate('/login');
  };

  return (
    <Card>
      <HeadingSmall>Réinitialisation de mot de passe</HeadingSmall>
      <form onSubmit={handleSubmit}>
        <Block marginBottom="scale400">
          <FormControl label="Token">
            <Input
              placeholder="Token"
              name="token"
              onChange={(event) => setToken(event.currentTarget.value)}
              value={token}
            />
          </FormControl>
        </Block>
        <Block marginBottom="scale400">
          <FormControl label="Mot de passe">
            <Input
              placeholder="Mot de passe"
              name="password"
              type="password"
              onChange={(event) => setPassword(event.currentTarget.value)}
              value={password}
            />
          </FormControl>
        </Block>
        <Block marginBottom="scale400">
          <FormControl label="Confirmation du mot de passe">
            <Input
              placeholder="Confirmation du mot de passe"
              name="passwordConfirmation"
              type="password"
              onChange={(event) =>
                setPasswordConfirmation(event.currentTarget.value)
              }
              value={passwordConfirmation}
            />
          </FormControl>
        </Block>
        <Block marginBottom="scale400">
          <Button type="submit" kind="primary">
            Envoyer
          </Button>
        </Block>
      </form>
    </Card>
  );
};

export default Password;
