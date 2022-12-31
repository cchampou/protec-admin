import { ArrowLeft } from 'baseui/icon';
import { useNavigate } from 'react-router-dom';
import { Button, KIND, SIZE } from 'baseui/button';
import { Block } from 'baseui/block';

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <Block marginBottom="scale800">
      <Button
        onClick={() => navigate(-1)}
        type="button"
        size={SIZE.compact}
        kind={KIND.secondary}
      >
        <ArrowLeft />
        Back
      </Button>
    </Block>
  );
};

export default BackButton;
