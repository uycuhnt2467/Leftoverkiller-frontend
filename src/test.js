import axios from "axios";

config = require("./development_config")

const recipeData = {
    recipe_id: recipeId,
    rass: "lalala",
};
const url = config.backend_addr + "/favorite";
console.log(recipeData);
axios
    .post(url, recipeData, config)
    .then((response) => {
        console.log(recipeData);
        console.log("inside auth add favorit");
        // console.log(name);
        // console.log(token_id);
        console.log(response.data.result);
        dispatch(addFavorite(recipeId));
    })
    .catch((err) => {
        console.log(err);
    });
