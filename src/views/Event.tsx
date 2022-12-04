import { Button } from 'baseui/button';
import Api from '../services/Api';
import { DisplayXSmall, HeadingSmall } from 'baseui/typography';
import { Input } from 'baseui/input';
import { Card } from 'baseui/card';
import { useStyletron } from 'baseui';
import { Block } from 'baseui/block';
import { Textarea } from 'baseui/textarea';
import { DatePicker, TimePicker } from 'baseui/datepicker';

const cardOverrides = {
  Root: {
    style: {
      width: '500px',
      margin: 'auto',
    },
  },
};

const Event = () => {
  const [css, theme] = useStyletron();
  const sendNotification = () => {
    void Api.sendNotification();
  };

  return (
    <Card overrides={cardOverrides}>
      <HeadingSmall>Nouveau déclenchement</HeadingSmall>
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
        Déclencher
      </Button>
    </Card>
  );
};

export default Event;
