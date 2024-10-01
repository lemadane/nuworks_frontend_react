import { Grid2 as Grid } from '@mui/material'
import { GridProps } from '@mui/material/Grid'

export default function GridContainer(props: GridProps) {
  return (
    <Grid
      container
      {...props}
    >
      {props.children}
    </Grid>
  )
}
