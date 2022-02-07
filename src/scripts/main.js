import './component/search-bar.js';

function main() {
  const baseUrl = "https://covid19.mathdro.id/api";
  let countriesName = [];

  const getWorld = () => {
    fetch(`${baseUrl}`)
      .then(response => {
        return response.json();
      })
      .then(output => {
        if (output.error) {
          alert("Gagal mengambil data seluruh dunia");
        } else {
          renderWorld(output);
        }
      })
  }

  const getCountries = () => {
    fetch(`${baseUrl}/countries`)
      .then(response => {
        return response.json();
      })
      .then(output => {
        if (output.error) {
          alert("Gagal mengambil data seluruh negara");
        } else {
          saveListCountries(output);
        }
      })
  }

  const getCountry = (data) => {
    if (data.length == 1) {
      fetch(`${baseUrl}/countries/${data}`)
        .then(response => {
          return response.json();
        })
        .then(output => {
          renderCountry(output, data);
        })
    } else {
      for (let i = 0; i < data.length; i++) {
        fetch(`${baseUrl}/countries/${data[i]}`)
          .then(response => {
            return response.json();
          })
          .then(output => {
            renderCountry(output, data[i]);
          })
      }
    }
  }

  const saveListCountries = (data) => {
    const { countries } = data;
    for (let i = 0; i < countries.length; i++) {
      countriesName.push(countries[i].name);
    }
  }

  const getListCountry = (search) => {
    return new Promise((resolve, reject) => {
      const filteredCountrie = countriesName.filter(countrie => countrie.toLowerCase().includes(search.toLowerCase())).slice(0, 9).sort();
      if (filteredCountrie.length) {
        resolve(filteredCountrie);
      } else {
        reject(`${search}`);
      }
    })
  }

  const renderWorld = (data) => {
    const { confirmed, recovered, deaths } = data;
    const list = document.getElementById("fetch");

    list.innerHTML += `
      <div class="card mb-3 shadow p-2 card-world">
        <div class="card-body">
          <h6 class="card-title">TERKONFIRMASI</h6>
          <p class="card-text">
            ${thousands_separators(confirmed.value)} orang
          </p>
          <i class="fas fa-lungs-virus"></i>
        </div>
      </div>
      <div class="card mb-3 shadow p-2 card-world">
        <div class="card-body">
          <h6 class="card-title">SEMBUH</h6>
          <p class="card-text">
            ${thousands_separators(recovered.value)} orang
          </p>
          <i class="fas fa-shield-alt"></i>
        </div>
      </div>
      <div class="card mb-3 shadow p-2 card-world">
        <div class="card-body">
          <h6 class="card-title">MENINGGAL</h6>
          <p class="card-text">
            ${thousands_separators(deaths.value)} orang
          </p>
          <i class="fas fa-skull"></i>
        </div>
      </div>
    `;
  }

  const renderCountry = (data, countrie) => {
    const { confirmed, recovered, deaths } = data;
    const result = document.getElementById("result");

    result.innerHTML += `
      <div class="result-card shadow">
        <h5 class="card-title">${countrie}</h5>
        <span>
          <i class="fas fa-lungs-virus"></i>
          <h3>${thousands_separators(confirmed.value)} orang</h3>
        </span>
        <span>
          <i class="fas fa-shield-alt"></i>
          <h3>${thousands_separators(recovered.value)} orang</h3>
        </span>
        <span>
          <i class="fas fa-skull"></i>
          <h3>${thousands_separators(deaths.value)} orang</h3>
        </span>
      </div>
    `;
  }

  const thousands_separators = (num) => {
    var num_parts = num.toString().split(".");
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return num_parts.join(".");
  }

  document.addEventListener("DOMContentLoaded", async () => {
    const search = document.querySelector("search-bar"),
      result = document.getElementById("result");

    const onButtonSearchClicked = async (e) => {
      e.preventDefault();
      result.innerHTML = "";
      try {
        const result = await getListCountry(search.value);
        getCountry(result);
      } catch (message) {
        result.innerHTML = `
          <h5><span style="color: red">${message}</span> tidak ada dalam daftar negara</h5>
        `;
      }
    };

    search.clickEvent = onButtonSearchClicked;

    getWorld();
    getCountries();
  })
}

export default main;