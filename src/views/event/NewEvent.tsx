import { Button } from 'baseui/button';
import Api from '../../services/Api';
import { HeadingSmall } from 'baseui/typography';
import { Input } from 'baseui/input';
import { Card } from 'baseui/card';
import { useStyletron } from 'baseui';
import { Block } from 'baseui/block';
import { Textarea } from 'baseui/textarea';
import { DatePicker, TimePicker } from 'baseui/datepicker';
import useNewEvent from '../../hooks/useNewEvent';
import { KIND, Notification } from 'baseui/notification';

const NewEvent = () => {
  const [, theme] = useStyletron();
  const {
    handleChange,
    handleSubmit,
    newEvent,
    errorMessage,
    setStartDate,
    setStartTime,
    setEndDate,
    setEndTime,
  } = useNewEvent();

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <HeadingSmall>Nouvel événement</HeadingSmall>
        <Block marginBottom={theme.sizing.scale400}>
          <Input
            placeholder="Titre"
            name="title"
            onChange={handleChange}
            value={newEvent.title}
          />
        </Block>
        <Block marginBottom={theme.sizing.scale400}>
          <Input
            placeholder="Lieu"
            name="location"
            onChange={handleChange}
            value={newEvent.eProtecLink}
          />
        </Block>
        <Block marginBottom={theme.sizing.scale400}>
          <Input
            placeholder="Lien eProtec"
            name="eProtecLink"
            onChange={handleChange}
            value={newEvent.eProtecLink}
          />
        </Block>
        <Block marginBottom={theme.sizing.scale400}>
          <DatePicker
            placeholder="Date de début"
            value={newEvent.start}
            onChange={setStartDate}
          />
        </Block>
        <Block marginBottom={theme.sizing.scale400}>
          <TimePicker
            placeholder="Heure de début"
            format="24"
            onChange={setStartTime}
          />
        </Block>
        <Block marginBottom={theme.sizing.scale400}>
          <DatePicker
            placeholder="Date de fin"
            value={newEvent.end}
            onChange={setEndDate}
          />
        </Block>
        <Block marginBottom={theme.sizing.scale400}>
          <TimePicker
            placeholder="Heure de fin"
            format="24"
            onChange={setEndTime}
          />
        </Block>
        <Block marginBottom={theme.sizing.scale400}>
          <Textarea
            placeholder="Commentaire"
            name="comment"
            onChange={handleChange}
            value={newEvent.comment}
          />
        </Block>
        {errorMessage && (
          <Block position="fixed" top="scale800" right="scale800">
            <Notification kind={KIND.negative}>{errorMessage}</Notification>
          </Block>
        )}
        <Button type="submit">Créer</Button>
      </form>
    </Card>
  );
};

export default NewEvent;
