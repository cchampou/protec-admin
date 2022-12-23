import React from 'react';
import { useStyletron } from 'baseui';
import { FormControl } from 'baseui/form-control';
import { Input } from 'baseui/input';
import { Button } from 'baseui/button';
import { Block } from 'baseui/block';
import { HeadingSmall } from 'baseui/typography';
import { Card } from 'baseui/card';
import { KIND, Notification } from 'baseui/notification';
import Api from '../services/Api';
import { NavLink, useNavigate } from 'react-router-dom';
import Auth from '../services/Auth';

const Login = () => {
  const [, theme] = useStyletron();
  const navigate = useNavigate();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      Auth.authenticate(email, password);
      navigate('/dashboard/event/list');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <Card>
      <HeadingSmall>Connexion</HeadingSmall>
      <form onSubmit={handleSubmit}>
        <Block marginBottom={theme.sizing.scale400}>
          <FormControl label="Email">
            <Input
              placeholder="Email"
              name="email"
              onChange={(event) => setEmail(event.currentTarget.value)}
              value={email}
            />
          </FormControl>
        </Block>
        <Block marginBottom={theme.sizing.scale400}>
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
        {/* forgot password link */}
        <Block marginBottom={theme.sizing.scale400}>
          <NavLink to="/reset">Mot de passe oublié ?</NavLink>
        </Block>
        <Block marginBottom={theme.sizing.scale400}>
          <Button type="submit">Se connecter</Button>
        </Block>
        {errorMessage && (
          <Notification kind={KIND.negative}>{errorMessage}</Notification>
        )}
      </form>
    </Card>
  );
};

export default Login;
