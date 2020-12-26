import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import * as actions from "../../../store/actions/index";

class Clear extends Component {
    componentDidMount() {
        this.props.onClear();
    }
    render() {
        return <Redirect to="/"/>;
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onClear: () => dispatch(actions.clearStore()),
    };
};

export default connect(null, mapDispatchToProps)(Clear);
