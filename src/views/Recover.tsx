import { Card } from 'baseui/card';
import { HeadingSmall } from 'baseui/typography';
import { Block } from 'baseui/block';
import { FormControl } from 'baseui/form-control';
import { Input } from 'baseui/input';
import { Button } from 'baseui/button';
import Api from '../services/Api';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Recover = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    void Api.recoverPassword(email);
    navigate('/login');
  };

  return (
    <Card>
      <HeadingSmall>Récupération de mot de passe</HeadingSmall>
      <form onSubmit={handleSubmit}>
        <Block marginBottom="scale400">
          <FormControl label="Email">
            <Input
              placeholder="Email"
              name="email"
              onChange={(event) => setEmail(event.currentTarget.value)}
              value={email}
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

export default Recover;
