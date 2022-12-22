import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Api from '../../services/Api';
import { Block } from 'baseui/block';
import { HeadingSmall } from 'baseui/typography';
import { Card } from 'baseui/card';
import { Button } from 'baseui/button';

const DisplayUser = () => {
  const { id: userId } = useParams();
  const [user, setUser] = useState<any>(null);

  const fetchUser = async () => {
    if (!userId) return;
    const user = await Api.getUser(userId);
    setUser(user);
  };

  const inviteUser = async () => {
    if (!userId) return;
    await Api.inviteUser(userId);
    await fetchUser();
  };

  useEffect(() => {
    void fetchUser();
  }, [userId]);

  if (!user) return null;

  return (
    <Card>
      <HeadingSmall>
        {user?.firstName} {user?.lastName}
      </HeadingSmall>
      <Block>
        <strong>Email:</strong> {user?.email}
      </Block>
      <Block>
        <strong>Téléphone:</strong> {user?.phone}
      </Block>
      <Button type="button" onClick={inviteUser}>
        Inviter
      </Button>
    </Card>
  );
};

export default DisplayUser;
