import React from "react";

const Paginacion = () => {
  return (
    <>
      <nav
        class="pagination is-centered"
        role="navigation"
        aria-label="pagination"
      >
        <a class="pagination-previous">Previous</a>
        <a class="pagination-next">Next page</a>
        <ul class="pagination-list">
          <li>
            <a class="pagination-link" aria-label="Goto page 1">
              1
            </a>
          </li>
          <li>
            <span class="pagination-ellipsis">&hellip;</span>
          </li>

          <li>
            <a
              class="pagination-link is-current"
              aria-label="Page 46"
              aria-current="page"
            >
              {asdasdasdas}
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Paginacion;
