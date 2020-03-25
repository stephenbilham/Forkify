import Search from "./models/Search";
import * as searchView from "./views/searchView";
import { elements, renderLoader, clearLoader } from "./views/base";

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
    searchView.clearInput();
    searchView.clearResults();
    renderLoader(elements.searchRes);

    // 4) seach for recipes
    await state.search.getResults();

    // 5) render results on UI
    clearLoader();
    searchView.renderResults(state.search.result);
  }
};

elements.searchForm.addEventListener("submit", e => {
  e.preventDefault();
  controlSearch();
});

elements.searchResPages.addEventListener("click", e => {
  var btn = e.target.closest(".btn-inline");
  if (btn) {
    const goToPage = parseInt(btn.dataset.goto, 10);
    searchView.renderResults(state.search.result, goToPage);
  }
});
