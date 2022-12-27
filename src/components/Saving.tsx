import { ParagraphMedium } from 'baseui/typography';
import { Check, Overflow } from 'baseui/icon';
import { Block } from 'baseui/block';

export enum SavingState {
  SAVING = 'SAVING',
  SAVED = 'SAVED',
  NOT_SAVED = 'NOT_SAVED',
}

const Wrapper = ({ children, state }) => {
  return (
    <Block>
      <ParagraphMedium
        color={state === SavingState.SAVED ? 'positive' : 'negative'}
        overrides={{
          Block: {
            style: {
              fontWeight: 'bolder',
              textAlign: 'center',
            },
          },
        }}
      >
        {children}
      </ParagraphMedium>
    </Block>
  );
};

const SavedComponent = ({ state }: Props) => (
  <Wrapper state={state}>
    <Check /> Enregistrement terminé
  </Wrapper>
);

const NotSavedComponent = ({ state }: Props) => (
  <Wrapper state={state}>
    <Overflow /> Certains champs n'ont pas été enregistrés
  </Wrapper>
);

const SavingComponent = ({ state }: Props) => (
  <Wrapper state={state}>
    <Overflow /> Enregistrement en cours ...
  </Wrapper>
);

type Props = {
  state: SavingState;
};

const Saving = ({ state }: Props) => {
  switch (state) {
    case SavingState.SAVING:
      return <SavingComponent state={state} />;
    case SavingState.SAVED:
      return <SavedComponent state={state} />;
    default:
      return <NotSavedComponent state={state} />;
  }
};

export default Saving;
