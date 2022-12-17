import { Card } from 'baseui/card';
import { HeadingSmall, HeadingXLarge, HeadingXSmall } from 'baseui/typography';
import { Button } from 'baseui/button';
import { Block } from 'baseui/block';
import { FlexGrid } from 'baseui/flex-grid';

const DisplayEvent = () => {
  return (
    <Card>
      <HeadingSmall>Détails de l'événement</HeadingSmall>
      <HeadingXSmall>Titre</HeadingXSmall>
      <Block>Lieu</Block>
      <Block>Lien eProtec</Block>
      <Block>Date de début</Block>
      <Block>Heure de début</Block>
      <Block>Date de fin</Block>
      <Block>Heure de fin</Block>
      <Block>Commentaire</Block>
      <Block height="scale800" />
      <FlexGrid>
        <Button type="button" onClick={() => null}>
          Déclechement push
        </Button>
        <Block marginLeft="scale400">
          <Button type="button" onClick={() => null}>
            Déclechement SMS
          </Button>
        </Block>
      </FlexGrid>
    </Card>
  );
};

export default DisplayEvent;
