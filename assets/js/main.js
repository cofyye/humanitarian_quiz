const URL = window.location.href;

const app = {
  timer: 35,
  currentTimer: 0,
  originalImages: [
    `${URL}/uploads/Avicii.jpg`,
    `${URL}/uploads/BijeloDugme.jpg`,
    `${URL}/uploads/BoraDrljaca.jpg`,
    `${URL}/uploads/BubaCorelli.jpg`,
    `${URL}/uploads/Cola.jpg`,
    `${URL}/uploads/colplay.jpg`,
    `${URL}/uploads/DejanMatic.jpg`,
    `${URL}/uploads/ElenaKitic.jpg`,
    `${URL}/uploads/HankaPaldum.jpg`,
    `${URL}/uploads/HarisDz.jpg`,
    `${URL}/uploads/InVivo.jpg`,
    `${URL}/uploads/JBalvin.jpg`,
    `${URL}/uploads/JohnLennon.jpg`,
    `${URL}/uploads/LanaDelRey.jpg`,
    `${URL}/uploads/maneskin.jpg`,
    `${URL}/uploads/mariahCarey.jpg`,
    `${URL}/uploads/Prince.jpg`,
    `${URL}/uploads/Rammstein.jpg`,
    `${URL}/uploads/Senidah.jpg`,
    `${URL}/uploads/SilvanaArmenulic.jpg`,
    `${URL}/uploads/SlavicaCukteras.jpg`,
    `${URL}/uploads/Topalko.jpg`,
    `${URL}/uploads/Tupac.jpg`,
    `${URL}/uploads/ZeljkoVasic.jpg`,
    `${URL}/uploads/ZoricaBrunclik.jpg`,
  ],
  images: [],
};

let quizStarted = document.getElementById("quizStarted");
let quizNotStarted = document.getElementById("quizNotStarted");
let quizFinished = document.getElementById("quizFinished");
let clock = document.querySelector("#clock");
let span = clock.querySelector("span");
let spinnerImage = document.getElementById("spinner-image");
let spinnerText = document.getElementById("spinner-text");
let image = document.getElementById("image");
let timerInterval;

async function startQuiz() {
  quizNotStarted.classList.add("d-none");
  quizNotStarted.classList.remove("animate__animated");
  quizNotStarted.classList.remove("animate__fadeIn");

  quizStarted.classList.remove("d-none");
  quizStarted.classList.add("animate__animated");
  quizStarted.classList.add("animate__fadeIn");

  quizFinished.classList.add("d-none");
  quizFinished.classList.remove("animate__animated");
  quizFinished.classList.remove("animate__fadeIn");

  app.images = app.originalImages;

  await nextImage();
}

function backToHome() {
  quizFinished.classList.add("d-none");
  quizFinished.classList.remove("animate__animated");
  quizFinished.classList.remove("animate__fadeIn");

  quizStarted.classList.add("d-none");
  quizStarted.classList.remove("animate__animated");
  quizStarted.classList.remove("animate__fadeIn");

  quizNotStarted.classList.remove("d-none");
  quizNotStarted.classList.add("animate__animated");
  quizNotStarted.classList.add("animate__fadeIn");
}

async function nextImage() {
  if (!app.images.length) {
    quizStarted.classList.remove("animate__animated");
    quizStarted.classList.remove("animate__fadeIn");
    quizStarted.classList.add("d-none");

    quizFinished.classList.remove("d-none");
    quizFinished.classList.add("animate__animated");
    quizFinished.classList.add("animate__fadeIn");

    return;
  }

  await new Promise((resolve, _) => {
    spinnerImage.classList.add("animate__animated");
    spinnerImage.classList.add("animate__fadeIn");
    spinnerText.classList.add("animate__animated");
    spinnerText.classList.add("animate__fadeIn");

    image.classList.add("d-none");
    image.classList.remove("d-flex");
    span.classList.add("d-none");
    span.classList.remove("d-block");

    spinnerImage.classList.remove("d-none");
    spinnerImage.classList.add("d-flex");
    spinnerText.classList.remove("d-none");
    spinnerText.classList.add("d-flex");

    setTimeout(() => {
      spinnerImage.classList.remove("animate__animated");
      spinnerImage.classList.remove("animate__fadeIn");
      spinnerText.classList.remove("animate__animated");
      spinnerText.classList.remove("animate__fadeIn");

      spinnerImage.classList.add("d-none");
      spinnerImage.classList.remove("d-flex");
      spinnerText.classList.add("d-none");
      spinnerText.classList.remove("d-flex");

      image.classList.remove("d-none");
      image.classList.add("d-flex");
      span.classList.remove("d-none");
      span.classList.add("d-block");

      resolve(true);
    }, 2000);
  });

  const img = app.images[Math.floor(Math.random() * app.images.length)];

  app.images = app.images.filter((image) => image !== img);

  image.style.backgroundImage = `url('${img}')`;
  image.classList.add("animate__animated");
  image.classList.add("animate__fadeIn");
  span.classList.add("animate__animated");
  span.classList.add("animate__fadeIn");

  app.currentTimer = app.timer;
  span.textContent = app.currentTimer + " s";
  timerInterval = setInterval(async () => {
    app.currentTimer -= 1;
    span.textContent = app.currentTimer + " s";
    if (app.currentTimer == 0) {
      span.textContent = "Kraj";
      image.classList.remove("animate__animated");
      image.classList.remove("animate__fadeIn");
      span.classList.remove("animate__animated");
      span.classList.remove("animate__fadeIn");

      new Audio(`${URL}/assets/audio/bell1.wav`).play();

      clearInterval(timerInterval);

      nextImageAsync();
    }
  }, 1000);
}

function startQuizAsync() {
  startQuiz();
}

function nextImageAsync() {
  nextImage();
}
