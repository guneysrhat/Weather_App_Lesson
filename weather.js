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
  //alert(tokenKey);
  const inputValue = input.value;
  const units = "metric";
  const lang = "tr";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${tokenKey}&units=${units}&lang=${lang}`;
  try {
    // const response = await fetch(url).then((response) => response.json());
    const response = await axios(url);
    console.log(response);
    const { main, sys, weather, name } = response.data;
    const iconUrl = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
    const iconUrlAWS = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0].icon}.svg`;

    const cityNameSpans = list.querySelectorAll(".city span");
    const cityNameSpansArray = Array.from(cityNameSpans);
    if (cityNameSpansArray.length > 0) {
      const filteredArray = cityNameSpansArray.filter(
        (span) => span.innerText == name
      );
      if (filteredArray.length > 0) {
        msg.innerText = `You already know the weather for ${name}, Please search for another city 😉`;
        setTimeout(() => {
          msg.innerText = "";
        }, 5000);
        form.reset();
        return;
      }
    }
    console.log(cityNameSpans);
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
                              <img class="city-icon" src="${iconUrl}">
                              <figcaption>${weather[0].description}
                              </figcaption>
                          </figure>`;
    //* append vs prepend
    list.prepend(createdLi);

    //* Capturing
    // createdLi.addEventListener("click", (e) => {
    //   if (e.target.tagName == "IMG") {
    //     e.target.src = e.target.src == iconUrl ? iconUrlAWS : iconUrl;
    //   }
    // });

    //* Bubling
    // createdLi.addEventListener("click", (e) => {
    //   alert(`${e.target.tagName} element is clicked!!`);
    //   window.location.href = "https://clarusway.com/";
    // });
    // createdLi.querySelector("figure").addEventListener("click", (e) => {
    //   alert(`${e.target.tagName} element is clicked!!`);
    //   // window.location.href = "https://clarusway.com/";
    // });
    // createdLi.querySelector("img").addEventListener("click", (e) => {
    //   alert(`${e.target.tagName} element is clicked!!`);
    //   // window.location.href = "https://clarusway.com/";
    // });

    form.reset();
  } catch (error) {
    msg.innerText = `404 (City Not Found!)`;
    setTimeout(() => {
      msg.innerText = "";
    }, 5000);
    form.reset();
  }

  //window onload
  document.querySelector(".cities").addEventListener("click", (e) => {
    if (e.target.tagName == "IMG") {
      alert("img is clicked!!!");
    }
  });
};
