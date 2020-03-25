import Search from "./models/Search";
import * as searchView from "./views/searchView";
import { elements } from "./views/base";

//global state of app
// search obj
// curent recipe object
// shopping list object
// liked recipes

const state = {
  //
};

const controlSearch = async () => {
  // 1) get query from view
  const query = searchView.getInput(); //TODO

  if (query) {
    // 2) new search obj and add to state
    state.search = new Search(query);

    // 3) prepare UI for results

    // 4) seach for recipes
    await state.search.getResults();

    // 5) render results on UI
    searchView.renderResults(state.search.result);
  }
};

elements.searchForm.addEventListener("submit", e => {
  e.preventDefault();
  controlSearch();
});
