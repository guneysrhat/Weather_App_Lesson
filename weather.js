const form = document.querySelector("section.top-banner form");
const input = document.querySelector(".container input");
const msg = document.querySelector("span.msg");
const list = document.querySelector(".ajax-section .cities");

localStorage.setItem(
  "tokenKey",
  "ZXaqXBz5mOOXEyTuqjldnTwDQXH8YKzqhgUxv7tmSkvzyjz2e4AB8FeUbj1fEesG"
);
// localStorage.setItem(
//   "tokenKeyEncrypted",
//   EncryptStringAES("09f64283148ea6369c6273dbf953a101")
// );
form.addEventListener("submit", (event) => {
  event.preventDefault();
  getWeatherDataFromApi();
});

//* Get api Func.(http method == Verbs)
const getWeatherDataFromApi = async () => {
  //alert("http request is gone!");
  const tokenKey = DecryptStringAES(localStorage.getItem("tokenKey"));
  alert(tokenKey);
  const inputValue = input.value;
  const units = "metric";
  const lang = "tr";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${tokenKey}&units=${units}&lang=${lang}`;

  const response = await fetch(url).then((response) => response.json());
  console.log(response);

  const { main, sys, weather, name } = response;

  const iconUrlAWS = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0].icon}.svg`;

  const createdLi = document.createElement("li");
  createdLi.classList.add("city");
  createdLi.innerHTML = `<h2 class="city-name" data-name="${name}, ${
    sys.country
  }">
                            <span>${name}</span>
                            <sup>${sys.country}</sup>
                        </h2>
                        <div class="city-temp">${Math.round(
                          main.temp
                        )}<sup>°C</sup></div>
                        <figure>
                            <img class="city-icon" src="${iconUrlAWS}">
                            <figcaption>${weather[0].description}
                            </figcaption>
                        </figure>`;
};
