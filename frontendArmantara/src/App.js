// import necessary libraries and components
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUser, faShoppingCart } from "@fortawesome/free-solid-svg-icons";

// Initialize Font Awesome icons library
library.add(faUser, faShoppingCart);

// Render your application components
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
