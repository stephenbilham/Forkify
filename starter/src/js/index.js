import Recipe from "./models/Recipe";
import Search from "./models/Search";
import * as searchView from "./views/searchView";
import { elements, renderLoader, clearLoader } from "./views/base";
import { format } from "util";

//global state of app
// search obj
// curent recipe object
// shopping list object
// liked recipes

const state = {
  //
};

/*SEARCH CONTROLLER*/
const controlSearch = async () => {
  // 1) get query from view
  // const query = searchView.getInput();
  const query = "pizza";

  if (query) {
    // 2) new search obj and add to state
    state.search = new Search(query);

    // 3) prepare UI for results
    searchView.clearInput();
    searchView.clearResults();
    renderLoader(elements.searchRes);
    try {
      // 4) seach for recipes
      await state.search.getResults();

      // 5) render results on UI
      clearLoader();
      searchView.renderResults(state.search.result);
    } catch (err) {
      alert("something went wrong with search...");
      clearLoader();
    }
  }
};

elements.searchForm.addEventListener("submit", e => {
  e.preventDefault();
  controlSearch();
});

//for testing
window.addEventListener("load", e => {
  e.preventDefault();
  controlSearch();
});

elements.searchResPages.addEventListener("click", e => {
  var btn = e.target.closest(".btn-inline");
  if (btn) {
    const goToPage = parseInt(btn.dataset.goto, 10);
    searchView.clearResults();
    searchView.renderResults(state.search.result, goToPage);
  }
});

/*RECIPE CONTROLLER*/

const controlRecipe = async () => {
  //get id from url
  const id = window.location.hash.replace("#", "");
  console.log(id);

  if (id) {
    //prepare ui for changes

    // create new recipe obj
    state.recipe = new Recipe(id);

    //TESTING
    window.r = state.recipe;

    try {
      //get recipe data
      await state.recipe.getRecipe();

      //calcservings and time
      state.recipe.calcTime();
      state.recipe.calcServings();
      //render the recipe
      console.log(state.recipe);
    } catch (error) {
      console.log(error);
      alert("error proccessing recipe!");
    }
  }
};
// window.addEventListener("hashchange", controlRecipe);
// window.addEventListener("load", controlRecipe);

// ^ alternative to do both in one below

["hashchange", "load"].forEach(event =>
  window.addEventListener(event, controlRecipe)
);

// const r = new Recipe(47746);

// r.getRecipe();
// console.log(r);
