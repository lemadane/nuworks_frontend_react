import Stack, { StackProps } from '@mui/material/Stack';

const Row = (props: StackProps) => {
  return (
    <Stack
      flex={1}
      direction='row'
      {...props}
    >
      {props.children}
    </Stack>
  );
};

export default Row