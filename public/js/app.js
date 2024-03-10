const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

//the callback is called every time the form is submitted
weatherForm.addEventListener("submit", (e) => {
  //prevents the default behaviour of the server i.e refresh.
  e.preventDefault();

  const location = search.value;

  messageOne.textContent = "Loading....";
  messageTwo.textContent = "";

  //fetch() - here the callback is inside the 'then' function
  //first fetch from this api and then do the callback
  fetch("http://localhost:3000/weather?address=" + location).then((res) => {
    res.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = data.Data;
      }
    });
  });

  console.log(location);
});
