const createElements = (arr) => {
  const htmlElements = arr.map((el) => `<span class = "btn">${el}</span>`);
  return htmlElements.join(" ");
};
// Manage Spinner
const manageSpinner = (status) => {
  if (status == true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("word-container").classList.add("hidden");
  } else {
    document.getElementById("word-container").classList.remove("hidden");
    document.getElementById("spinner").classList.add("hidden");
  }
};

// load Lesson start here
const loadLesson = () => {
  const url = "https://openapi.programming-hero.com/api/levels/all";
  fetch(url)
    .then((res) => res.json())
    .then((json) => displayLesson(json.data));
};

// set up remove active class with function
const removeActive = () => {
  const lessonButtons = document.querySelectorAll(".lesson-btn");
  //use btn.classList.remove('active') to remove the action
  lessonButtons.forEach((btn) => btn.classList.remove("active"));
};

const loadLevelWord = (id) => {
  manageSpinner(true);
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((json) => {
      // remove all active class
      removeActive();

      const clickBtn = document.getElementById(`lesson-btn-${id}`);
      // add active class
      clickBtn.classList.add("active");

      displayLevelWord(json.data);
    });
};
// creating load word detail function
const loadWordDetail = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  const res = await fetch(url);
  const details = await res.json();
  displayWordDetails(details.data);
};
// {
//     "word": "Cautious",
//     "meaning": "সতর্ক",
//     "pronunciation": "কশাস",
//     "level": 2,
//     "sentence": "Be cautious while crossing the road.",
//     "points": 2,
//     "partsOfSpeech": "adjective",
//     "synonyms": [
//         "careful",
//         "alert",
//         "watchful"
//     ],
//     "id": 3
// }
const displayWordDetails = (word) => {
  console.log(word);
  const detailsBox = document.getElementById("details-container");
  detailsBox.innerHTML = `
    <div>
            <h2 class="text-2xl font-bold">
              ${word.word} (<i class="fa-solid fa-microphone-lines"></i>: ${
    word.pronunciation
  })
            </h2>
          </div>
          <div class="">
            <h4 class="font-bold">Meaning</h4>
            <p class="font-bangla">${word.meaning}</p>
          </div>
          <div class="">
            <h4 class="font-bold">Example</h4>
            <p class="font-bangla">${word.sentence}</p>
          </div>
          <div class="">
            <h4 class="font-bold">Synonym</h4>
            <div class="">${createElements(word.synonyms)}</div>
          </div>
  `;
  document.getElementById("word_modal").showModal();
};
const displayLevelWord = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";
  if (words.length === 0) {
    wordContainer.innerHTML = `
      <div
        class="text-center col-span-full rounded py-5 space-y-5 font-bangla"
      >
       <img class="mx-auto" src="./assets/alert-error.png" alt="">
        <p class="text-xl font-medium text-gray-400">
          এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
        </p>
        <h2 class="font-bold text-4xl">নেক্সট Lesson এ যান</h2>
      </div>
    `;
    manageSpinner(false);
    return;
  }

  words.forEach((element) => {
    const card = document.createElement("div");
    card.innerHTML = `
        <div
        class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4"
      >
        <h2 class="font-bold">${
          element.word ? element.word : "Word  not found"
        }</h2>
        <p class="font-semibold">Meaning /Pronounciation</p>
        <div class="font-medium font-bangla text-2xl">${
          element.meaning ? element.meaning : "meaning not found"
        } / ${
      element.pronunciation ? element.pronunciation : "pronunciation not found"
    }</div>
        <div class="flex justify-between items-center">
          <button onclick="loadWordDetail(${
            element.id
          })" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]">
            <i class="fa-solid fa-circle-info"></i>
          </button>
          <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]">
            <i class="fa-solid fa-volume-high"></i>
          </button>
        </div>
      </div>
    `;
    wordContainer.append(card);
  });
};

const displayLesson = (lessons) => {
  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";
  lessons.forEach((element) => {
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
        <button id="lesson-btn-${element.level_no}" onclick ="loadLevelWord(${element.level_no})" class="btn btn-outline btn-primary lesson-btn">
            <i class="fa-solid fa-book-open"></i> Lesson - ${element.level_no}
        </button>
    `;
    levelContainer.append(btnDiv);
  });
  manageSpinner(false);
};

loadLesson();
