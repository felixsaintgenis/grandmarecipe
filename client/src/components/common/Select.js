import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const styles = theme => ({
  button: {
    display: "block"
  },
  formControl: {
    minWidth: 300
  }
});

class ControlledOpenSelect extends React.Component {
  state = {
    tags: "",
    open: false
  };

  handleChange = event => {
    switch (event.target.value) {
      case 10:
        event.target.value = "jus";
        break;
      case 20:
        event.target.value = "thé";
        break;
      case 30:
        event.target.value = "detox";
        break;
      case 40:
        event.target.value = "energy";
        break;
      case 50:
        event.target.value = "antioxydant";
        break;
      default:
        event.target.value;
    }

    this.setState({ tags: event.target.value });
    this.props.handleTagChange(event.target.value);
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  render() {
    const { classes } = this.props;

    return (
      <form autoComplete="off">
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="controlled-open-select">Tags</InputLabel>
          <Select
            open={this.state.open}
            onClose={this.handleClose}
            onOpen={this.handleOpen}
            value={this.state.tags}
            onChange={this.handleChange}
            inputProps={{
              name: "tags",
              id: "controlled-open-select"
            }}
          >
            <MenuItem value={10}>Juice</MenuItem>
            <MenuItem value={20}>Tea</MenuItem>
            <MenuItem value={30}>Detox</MenuItem>
            <MenuItem value={40}>Energy</MenuItem>
            <MenuItem value={50}>Antioxidant</MenuItem>
          </Select>
        </FormControl>
      </form>
    );
  }
}

ControlledOpenSelect.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ControlledOpenSelect);
