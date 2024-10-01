import Stack, { StackProps } from '@mui/material/Stack'

export default function Column(props: StackProps) {
  return (
    <Stack
      flex={1}
      direction='column'
      {...props}
    >
      {props.children}
    </Stack>
  )
}
