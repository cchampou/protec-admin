import { Card } from 'baseui/card';
import { HeadingSmall } from 'baseui/typography';
import { Button } from 'baseui/button';
import { Block } from 'baseui/block';
import { ButtonGroup } from 'baseui/button-group';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Api from '../../services/Api';

const DisplayEvent = () => {
  const { id } = useParams();
  const [event, setEvent] = useState<any>(null);

  useEffect(() => {
    if (!id) return;
    Api.getEvent(id).then((event: any) => {
      setEvent(event);
    });
  }, []);

  if (!event) return null;

  const startDate = new Date(event.start).toLocaleDateString('fr-FR');
  const startTime = new Date(event.start).toLocaleTimeString('fr-FR');
  const endDate = new Date(event.end).toLocaleDateString('fr-FR');
  const endTime = new Date(event.end).toLocaleTimeString('fr-FR');

  return (
    <Card>
      <HeadingSmall>{event.title}</HeadingSmall>
      <Block>
        <strong>Lieu:</strong> {event.location}
      </Block>
      <Block>
        <strong>Lien eProtect:</strong> {event.eProtecLink}
      </Block>
      <Block>
        <strong>Date de début:</strong> {startDate}
      </Block>
      <Block>
        <strong>Heure de début:</strong> {startTime}
      </Block>
      <Block>
        <strong>Date de fin:</strong> {endDate}
      </Block>
      <Block>
        <strong>Heure de fin:</strong> {endTime}
      </Block>
      <Block>
        <strong>Commentaire:</strong> {event.comment}
      </Block>
      <Block height="scale800" />
      <ButtonGroup>
        <Button
          type="button"
          onClick={() => {
            void Api.sendNotification(event.id, 'email');
          }}
        >
          Déclechement email
        </Button>
        <Button type="button" disabled onClick={() => null}>
          Déclechement push
        </Button>
        <Button type="button" disabled onClick={() => null}>
          Déclechement SMS
        </Button>
        <Button type="button" disabled onClick={() => null}>
          Déclechement téléphonique
        </Button>
      </ButtonGroup>
    </Card>
  );
};

export default DisplayEvent;
