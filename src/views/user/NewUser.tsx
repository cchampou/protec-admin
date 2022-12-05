import { Card } from 'baseui/card';
import { Input } from 'baseui/input';
import { Button } from 'baseui/button';

const NewUser = () => {
  return (
    <Card>
      <h1>New User</h1>
      <Input placeholder="Nom" />
      <Input placeholder="Prénom" />
      <Input placeholder="Email" />
      <Button type="button">Créer</Button>
    </Card>
  );
};
export default NewUser;
