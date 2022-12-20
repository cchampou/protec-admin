import { Card } from 'baseui/card';
import { HeadingSmall, HeadingXLarge, HeadingXSmall } from 'baseui/typography';
import { Button } from 'baseui/button';
import { Block } from 'baseui/block';
import { FlexGrid } from 'baseui/flex-grid';
import { ButtonGroup } from 'baseui/button-group';

const DisplayEvent = () => {
  return (
    <Card>
      <HeadingSmall>Titre</HeadingSmall>
      <Block>Lieu</Block>
      <Block>Lien eProtec</Block>
      <Block>Date de début</Block>
      <Block>Heure de début</Block>
      <Block>Date de fin</Block>
      <Block>Heure de fin</Block>
      <Block>Commentaire</Block>
      <Block height="scale800" />
      <ButtonGroup>
        <Button type="button" onClick={() => null}>
          Déclechement push
        </Button>
        <Button type="button" onClick={() => null}>
          Déclechement SMS
        </Button>
        <Button type="button" onClick={() => null}>
          Déclechement téléphonique
        </Button>
      </ButtonGroup>
    </Card>
  );
};

export default DisplayEvent;
