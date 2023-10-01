import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import classes from "./Auth.module.css";
import * as actions from "../../store/actions/index";

const Auth = (props) => {
    const [controls, setControls] = useState({
        username: {
            elementType: "input",
            elementConfig: {
                type: "text",
                placeholder: "Username",
            },
            value: "",
            validation: {
                required: true,
            },
            valid: false,
            touched: false,
        },
        password: {
            elementType: "input",
            elementConfig: {
                type: "password",
                placeholder: "Password",
            },
            value: "",
            validation: {
                required: true,
                minLength: 6,
            },
            valid: false,
            touched: false,
        },
    });

    const [isSignup, setIsSignup] = useState(false);

    const checkValidity = (value, rules) => {
        let isValid = true;
        if (!rules) {
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== "" && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid;
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid;
        }

        return isValid;
    };

    const inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...controls,
            [controlName]: {
                ...controls[controlName],
                value: event.target.value,
                valid: checkValidity(
                    event.target.value,
                    controls[controlName].validation
                ),
                touched: true,
            },
        };
        setControls(updatedControls);
    };

    const submitHandler = (event) => {
        event.preventDefault();
        const { username, password } = controls;
        props.onAuth(username.value, "", password.value, isSignup);
    };

    const switchAuthModeHandler = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
        // Additional logic can be added here if needed
    };

    const formElementsArray = Object.entries(controls).map(([key, value]) => ({
        id: key,
        config: value,
    }));

    let form = formElementsArray.map((formElement) => (
        <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(event) => inputChangedHandler(event, formElement.id)}
        />
    ));

    if (props.loading) {
        form = <Spinner />;
    }

    let errorMessage = null;
    if (props.error) {
        errorMessage = <p>{props.error.message}</p>;
    }

    let authRedirect = null;
    if (props.isAuthenticated) {
        // authRedirect = <Redirect to={props.authRedirectPath} />;
    }

    let errorBackend = null;
    if (props.backendError) {
        errorBackend = (
            <div>
                <p>{props.backendError.status}</p>
                <p>{props.backendError.msg}</p>
            </div>
        );
    }

    return (
        <div className={classes.Auth}>
            {authRedirect}
            {errorMessage}
            {errorBackend}
            <form onSubmit={submitHandler}>
                {form}
                <Button btnType="Success">SUBMIT</Button>
            </form>
            <Button clicked={switchAuthModeHandler} btnType="Danger">
                SWITCH TO {isSignup ? "SIGN IN" : "SIGN UP"}
            </Button>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        loading: state.authReducer.loading,
        error: state.authReducer.error,
        isAuthenticated: state.authReducer.token !== null,
        authRedirectPath: state.authReducer.authRedirectPath,
        backendError: state.authReducer.errorBackend,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (username, email, password, isSignup) =>
            dispatch(actions.auth(username, email, password, isSignup)),
        onAuthStart: () => {
            dispatch(actions.authStart());
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
