import React from 'react';
import { useStyletron } from 'baseui';
import { FormControl } from 'baseui/form-control';
import { Input } from 'baseui/input';
import { Button } from 'baseui/button';
import { Block } from 'baseui/block';
import { KIND } from 'baseui/notification';
import { NavLink, useNavigate } from 'react-router-dom';
import Auth from '../services/Auth';
import useNotification from '../hooks/useNotification';
import ContentCard from '../components/ContentCard';

const Login = () => {
  const [, theme] = useStyletron();
  const navigate = useNavigate();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const notification = useNotification();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await Auth.authenticate(email, password);
      navigate('/dashboard/event/list');
    } catch (error) {
      notification(error.message, KIND.negative);
    }
  };

  return (
    <ContentCard title="Connexion">
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
        <Block marginBottom={theme.sizing.scale400}>
          <NavLink to="/recover">Mot de passe oublié ?</NavLink>
        </Block>
        <Block marginBottom={theme.sizing.scale400}>
          <Button type="submit">Se connecter</Button>
        </Block>
      </form>
    </ContentCard>
  );
};

export default Login;
