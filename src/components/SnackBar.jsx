import React from 'react'
import { Snackbar,SnackbarContent } from '@material-ui/core'

const SnackBar = () => {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
                <SnackbarContent message="Login Successfull" />
            </Snackbar>
  )
}

export default SnackBar