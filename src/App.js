import React, { Component } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Layout from "./hoc/Layout/Layout";
// import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
// import Checkout from "./containers/Checkout/Checkout";
// import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import SearchByReicipe from "./containers/SearchByRecipe/SearchByRecipe";
import SearchByIngredient from "./containers/SearchByIngredient/SearchByIngredient";
import Recipe from "./containers/Recipe/Recipe";
import Ingredient from "./containers/Ingredient/Ingredient";
import Favorite from "./containers/Favorite/Favorite";
import Pantry from "./containers/Pantry/Pantry";
import Clear from "./containers/Auth/Clear/Clear"
import classes from "./App.module.css";

import * as actions from "./store/actions/index";

class App extends Component {
    componentDidMount() {
        this.props.onTryAutoSignup();
        // this.props.onInitializeFavorite();
    }
    render() {
        let routes = (
            <Switch>
                <Route
                    path="/searchByIngredient"
                    component={SearchByIngredient}
                />
                <Route path="/" exact component={SearchByReicipe} />
                <Route path="/pantry" component={Pantry} />
                <Route path="/recipe/:recipeId" component={Recipe} />
                <Route
                    path="/ingredient/:ingredient_id"
                    component={Ingredient}
                />
                <Route path="/favorite" component={Favorite} />
                <Route path="/clear" component ={Clear}/>
                <Route path="/auth" component={Auth} />
                <Redirect to="/" />
            </Switch>
        );

        if (this.props.isAuthenticated) {
            routes = (
                <Switch>
                    <Route
                        path="/searchByIngredient"
                        component={SearchByIngredient}
                    />
                    <Route path="/" exact component={SearchByReicipe} />
                    <Route path="/pantry" component={Pantry} />
                    <Route path="/recipe/:recipeId" component={Recipe} />
                    <Route
                        path="/ingredient/:ingredient_id"
                        component={Ingredient}
                    />
                    <Route path="/favorite" component={Favorite} />
                    <Route path="/logout" component={Logout} />
                    <Redirect to="/" />
                </Switch>
            );
        }
        return (
            <div>
                <Layout>{routes}</Layout>
                <h5 className={classes.warning}>
                    This project is only for practicing. The recipe data are
                    collected from{" "}
                    <a href="https://www.allrecipes.com/">all recipe</a>. If the
                    data should be removed, please don't hesitate to email to
                    uycuhnt2467@gmail.com.
                </h5>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.authReducer.token !== null,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onTryAutoSignup: () => dispatch(actions.authCheckState()),
        // onInitializeFavorite: () => dispatch(actions.authFavorite())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
// export default withRouter(App);
