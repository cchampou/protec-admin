import { Card } from 'baseui/card';
import { Input } from 'baseui/input';
import { Button } from 'baseui/button';
import { HeadingSmall } from 'baseui/typography';

const NewUser = () => {
  return (
    <Card>
      <HeadingSmall>Nouvel utilisateur</HeadingSmall>
      <Input placeholder="Nom" />
      <Input placeholder="Prénom" />
      <Input placeholder="Email" />
      <Button type="button">Créer</Button>
    </Card>
  );
};
export default NewUser;
