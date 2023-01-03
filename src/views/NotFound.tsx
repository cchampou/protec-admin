import React from 'react';
import { Card } from 'baseui/card';
import { HeadingMedium } from 'baseui/typography';
import { Button } from 'baseui/button';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Card>
      <HeadingMedium>Page non trouvée</HeadingMedium>
      <Button type="button" onClick={() => navigate('/')}>
        Retour à l'accueil
      </Button>
    </Card>
  );
};

export default NotFound;
