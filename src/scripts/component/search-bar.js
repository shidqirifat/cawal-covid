class SearchBar extends HTMLElement {
  constructor() {
    super();
    this.shadowDOM = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  set clickEvent(event) {
    this._clickEvent = event;
    this.render();
  }

  get value() {
    let searchValue = this.shadowDOM.getElementById("countrie").value;
    this.shadowDOM.getElementById("countrie").value = ""
    return searchValue;
  }

  render() {
    this.shadowDOM.innerHTML = `
      <style>
        form label {
          font-size: 1.1rem;
        }
        form input {
          margin-top: .5rem;
          border-radius: 4px;
          outline: none;
          border: 1px solid #9c772b;
          width: 200px;
          padding: 0.2rem 0.5rem;
          margin-right: 0.5rem;
          font-size: 0.9rem;
        }
        form button {
          padding: 0.2rem;
          border-radius: 4px;
          border: 1px solid #9c772b;
          width: 70px;
          background: white;
          font-size: 0.9rem;
        }
      </style>

      <form>
        <label for="name">Cari negara</label>
        <div class="data-form">
          <input
            id="countrie"
            type="search"
            name="name"
            for="name"
            autocomplete="off"
            autofocus
          />
          <button type="submit" id="search">Cari</button>
        </div>
      </form>
      `;

    this.shadowDOM.getElementById("search").addEventListener("click", this._clickEvent);
  }
}

customElements.define("search-bar", SearchBar);