import { Grid2 as Grid } from '@mui/material'
import { GridProps } from '@mui/material/Grid'

export default function GridItem(props: GridProps) {
  return (
    <Grid
      item
      {...props}
    >
      {props.children}
    </Grid>
  )
}
