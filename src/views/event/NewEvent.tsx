import { Button } from 'baseui/button';
import Api from '../../services/Api';
import { HeadingSmall } from 'baseui/typography';
import { Input } from 'baseui/input';
import { Card } from 'baseui/card';
import { useStyletron } from 'baseui';
import { Block } from 'baseui/block';
import { Textarea } from 'baseui/textarea';
import { DatePicker, TimePicker } from 'baseui/datepicker';

const NewEvent = () => {
  const [css, theme] = useStyletron();
  const sendNotification = () => {
    void Api.sendNotification();
  };

  return (
    <Card>
      <HeadingSmall>Nouvel événement</HeadingSmall>
      <Block marginBottom={theme.sizing.scale400}>
        <Input placeholder="Titre" />
      </Block>
      <Block marginBottom={theme.sizing.scale400}>
        <Input placeholder="Lieu" />
      </Block>
      <Block marginBottom={theme.sizing.scale400}>
        <Input placeholder="Lien eProtec" />
      </Block>
      <Block marginBottom={theme.sizing.scale400}>
        <DatePicker placeholder="Date de début" />
      </Block>
      <Block marginBottom={theme.sizing.scale400}>
        <TimePicker placeholder="Heure de début" format="24" />
      </Block>
      <Block marginBottom={theme.sizing.scale400}>
        <DatePicker placeholder="Date de fin" />
      </Block>
      <Block marginBottom={theme.sizing.scale400}>
        <TimePicker placeholder="Heure de fin" format="24" />
      </Block>
      <Block marginBottom={theme.sizing.scale400}>
        <Textarea placeholder="Commentaire" />
      </Block>
      <Button type="button" onClick={sendNotification}>
        Créer
      </Button>
    </Card>
  );
};

export default NewEvent;
