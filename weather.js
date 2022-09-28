const form = document.querySelector("section.top-banner form");
const input = document.querySelector(".container input");
const msg = document.querySelector("span.msg");
const list = document.querySelector(".ajax-section .cities");

localStorage.setItem(
  "tokenkey",
  "ZXaqXBz5mOOXEyTuqjldnTwDQXH8YKzqhgUxv7tmSkvzyjz2e4AB8FeUbj1fEesG"
);
// localStorage.setItem(
//   "tokenKeyEncrypted",
//   EncryptStringAES("09f64283148ea6369c6273dbf953a101")
// );
form.addEventListener("submit", (e) => {
  e.preventDefault();
  getWeatherDateFormApi();
});

//* Get api Func.(http method == Verbs)

const getWeatherDateFormApi = () => {
  alert("http request is gone!");
  const tokenKey = DecryptStringAES(
    "ZXaqXBz5mOOXEyTuqjldnTwDQXH8YKzqhgUxv7tmSkvzyjz2e4AB8FeUbj1fEesG"
  );
  alert(tokenKey);
  const inputValue = input.value;
  const url 
};
