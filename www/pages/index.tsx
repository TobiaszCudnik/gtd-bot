import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import SignupForm from './components/invite-form'

const content = markdown.require('./content/index.md')

const styles = theme => ({
  root: {
    // textAlign: 'center',
    // paddingTop: theme.spacing.unit * 20
  }
})

class Index extends React.Component<{}, {}> {
  state = {
    signup: false
  }

  render() {
    const { classes } = this.props

    // TODO extract the signup form to a separate component
    return (
      <div className={classes.root}>
        <div dangerouslySetInnerHTML={{ __html: content }} />
        <SignupForm />
      </div>
    )
  }
}

export default withStyles(styles)(Index)