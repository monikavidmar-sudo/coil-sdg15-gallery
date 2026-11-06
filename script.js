
'use strict';

// THREE PAGES
const pages = document.querySelectorAll('.page');
const navButtons = document.querySelectorAll('[data-page]');

function showPage(id) {
  pages.forEach(page => {
    page.classList.toggle('active', page.id === id);
  });

  navButtons.forEach(button => {
    const active = button.dataset.page === id;
    button.classList.toggle('active', active);
    button.setAttribute('aria-current', active ? 'page' : 'false');
  });

  window.scrollTo({ top: 0, behavior: 'instant' });
}

navButtons.forEach(button => {
  button.addEventListener('click', () => showPage(button.dataset.page));
});

document.querySelectorAll('[data-go]').forEach(button => {
  button.addEventListener('click', () => showPage(button.dataset.go));
});

document.querySelector('#year').textContent = new Date().getFullYear();

// PHOTO GALLERY
const images = Array.from({ length: 12 }, (_, i) => ({
  src: `slike/slika${i + 1}.jpg`,
  title: `Photo ${i + 1}`
}));

const gallery = document.querySelector('#gallery');
const viewer = document.querySelector('#viewer');
const large = document.querySelector('#large');
const caption = document.querySelector('#caption');

images.forEach(({ src, title }, i) => {
  const card = document.createElement('article');
  card.className = 'photo-card';

  const button = document.createElement('button');
  button.setAttribute('aria-label', `Enlarge ${title}`);

  const img = document.createElement('img');
  img.src = src;
  img.alt = title;
  img.loading = i < 4 ? 'eager' : 'lazy';

  img.addEventListener('error', () => {
    document.querySelector('#gallery-note').textContent =
      'Some photos could not be loaded. Check the slike folder and filenames slika1.jpg to slika12.jpg.';
  });

  const label = document.createElement('span');
  label.textContent = title;

  button.append(img, label);

  button.addEventListener('click', () => {
    large.src = src;
    large.alt = title;
    caption.textContent = title;
    viewer.showModal();
  });

  card.append(button);
  gallery.append(card);
});

document.querySelector('#close').addEventListener('click', () => {
  viewer.close();
});

viewer.addEventListener('click', e => {
  if (e.target === viewer) viewer.close();
});

// INTERACTIVE QUIZ
function createQuiz(config) {
  let index = 0;
  let score = 0;
  let answered = false;

  const question = document.querySelector(config.question);
  const progress = document.querySelector(config.progress);
  const feedback = document.querySelector(config.feedback);
  const next = document.querySelector(config.next);
  const answers = document.querySelector(config.answers);

  function render() {
    answered = false;
    next.hidden = true;
    feedback.textContent = '';
    answers.innerHTML = '';

    if (index >= config.items.length) {
      progress.textContent = 'Activity completed!';
      question.textContent =
        `You scored ${score} out of ${config.items.length}!`;
      feedback.textContent =
        'Every question is an opportunity to learn more about nature.';
      next.textContent = '↻ Try again';
      next.hidden = false;
      return;
    }

    const item = config.items[index];

    progress.textContent =
      `Question ${index + 1} of ${config.items.length} · Score: ${score}`;
    question.textContent = item.question;

    item.answers.forEach((answer, answerIndex) => {
      const button = document.createElement('button');
      button.textContent = answer;

      button.addEventListener('click', () => {
        if (answered) return;
        answered = true;

        const correct = answerIndex === item.correct;
        if (correct) score++;

        Array.from(answers.children).forEach((choice, i) => {
          choice.disabled = true;
          if (i === item.correct) {
            choice.classList.add('correct');
          } else if (i === answerIndex) {
            choice.classList.add('incorrect');
          }
        });

        feedback.textContent =
          `${correct ? 'Correct! 🌿' : 'Not quite!'} ${item.explanation}`;

        progress.textContent =
          `Question ${index + 1} of ${config.items.length} · Score: ${score}`;

        next.textContent =
          index === config.items.length - 1
            ? 'See results →'
            : 'Next question →';

        next.hidden = false;
      });

      answers.append(button);
    });
  }

  next.addEventListener('click', () => {
    if (index >= config.items.length) {
      index = 0;
      score = 0;
    } else {
      index++;
    }
    render();
  });

  render();
}

createQuiz({
  question: '#decision-question',
  progress: '#decision-progress',
  feedback: '#decision-feedback',
  next: '#decision-next',
  answers: '#decision-answers',

  items: [
    {
      question: 'You see litter on a forest trail. What is the best choice?',
      answers: [
        'Leave it there',
        'Pick it up safely and dispose of it properly',
        'Push it into the bushes'
      ],
      correct: 1,
      explanation: 'Removing litter safely helps protect wildlife and habitats.'
    },
    {
      question: 'Which garden choice can help local pollinators?',
      answers: [
        'Plant suitable native flowers',
        'Remove all flowering plants',
        'Use more pesticides'
      ],
      correct: 0,
      explanation: 'Native flowering plants can provide food and habitat for local pollinators.'
    },
    {
      question: 'How can we reduce pressure on forests?',
      answers: [
        'Waste more paper',
        'Buy unnecessary products',
        'Reuse paper and choose responsibly sourced products'
      ],
      correct: 2,
      explanation: 'Using resources thoughtfully can reduce waste and environmental pressure.'
    },
    {
      question: 'You spot a wild animal. What should you do?',
      answers: [
        'Observe quietly from a safe distance',
        'Chase it for a photo',
        'Feed it human snacks'
      ],
      correct: 0,
      explanation: 'Respecting wildlife helps keep animals and people safe.'
    },
    {
      question: 'What is a good approach to restoring a damaged habitat?',
      answers: [
        'Plant any species anywhere',
        'Use appropriate native species and plan long-term care',
        'Ignore the causes of damage'
      ],
      correct: 1,
      explanation: 'Restoration works best when it matches the local ecosystem and includes ongoing care.'
    },
    {
      question: 'How can students help protect local nature?',
      answers: [
        'Organize a responsible clean-up or awareness project',
        'Leave waste outdoors',
        'Disturb animal nests'
      ],
      correct: 0,
      explanation: 'Community projects can build awareness and improve local environments.'
    }
  ]
});

// PERSONAL ACTION CHECKLIST
const actions = [
  'Carry a reusable water bottle',
  'Pick up litter when it is safe to do so',
  'Use both sides of paper',
  'Learn about a local plant or animal',
  'Respect wildlife and stay on marked trails',
  'Share one useful fact about biodiversity'
];

const actionOptions = document.querySelector('#action-options');

actions.forEach((action, i) => {
  const label = document.createElement('label');
  const checkbox = document.createElement('input');

  checkbox.type = 'checkbox';
  checkbox.value = action;
  checkbox.id = `action-${i}`;
  checkbox.addEventListener('change', updateActions);

  label.append(checkbox, document.createTextNode(action));
  actionOptions.append(label);
});

function updateActions() {
  const selected = [
    ...actionOptions.querySelectorAll('input:checked')
  ].map(input => input.value);

  document.querySelector('#action-count').textContent =
    `${selected.length} of ${actions.length} actions selected`;

  document.querySelector('#action-summary').textContent =
    selected.length
      ? `Your nature action plan: ${selected.join(' · ')}`
      : 'Choose an action to start your plan.';
}

document.querySelector('#action-reset').addEventListener('click', () => {
  actionOptions.querySelectorAll('input').forEach(input => {
    input.checked = false;
  });
  updateActions();
});

updateActions();

// TRUE OR FALSE
const trueFalseItems = [
  {
    question: 'All forests are home to exactly the same species.',
    correct: false,
    explanation: 'Different forests have different climates, habitats and species.'
  },
  {
    question: 'Healthy soil contains living organisms.',
    correct: true,
    explanation: 'Soil supports bacteria, fungi and many small animals.'
  },
  {
    question: 'Protecting habitats can help prevent biodiversity loss.',
    correct: true,
    explanation: 'Habitats provide food, shelter and space for species to survive.'
  },
  {
    question: 'Plastic litter can harm wildlife.',
    correct: true,
    explanation: 'Wildlife may become entangled in waste or mistake it for food.'
  },
  {
    question: 'Planting any tree species anywhere is always good for nature.',
    correct: false,
    explanation: 'Restoration should consider native species and the needs of local ecosystems.'
  },
  {
    question: 'People depend on healthy ecosystems.',
    correct: true,
    explanation: 'Ecosystems support food, water, soil health and many other benefits.'
  }
];

let tfIndex = 0;
let tfScore = 0;
let tfAnswered = false;

const tfQuestion = document.querySelector('#tf-question');
const tfProgress = document.querySelector('#tf-progress');
const tfFeedback = document.querySelector('#tf-feedback');
const tfNext = document.querySelector('#tf-next');

const tfButtons = [
  document.querySelector('#tf-true'),
  document.querySelector('#tf-false')
];

function renderTrueFalse() {
  tfAnswered = false;
  tfNext.hidden = true;
  tfFeedback.textContent = '';

  tfButtons.forEach(button => {
    button.disabled = false;
    button.className = '';
  });

  if (tfIndex === trueFalseItems.length) {
    tfQuestion.textContent =
      `Finished! Your score: ${tfScore} / ${trueFalseItems.length}`;

    tfProgress.textContent = 'Activity completed!';
    tfFeedback.textContent =
      'Thank you for exploring the natural world!';

    tfButtons.forEach(button => {
      button.disabled = true;
    });

    tfNext.textContent = '↻ Try again';
    tfNext.hidden = false;
    return;
  }

  tfProgress.textContent =
    `Statement ${tfIndex + 1} of ${trueFalseItems.length} · Score: ${tfScore}`;

  tfQuestion.textContent = trueFalseItems[tfIndex].question;
}

function answerTrueFalse(value) {
  if (tfAnswered || tfIndex >= trueFalseItems.length) return;

  tfAnswered = true;
  const item = trueFalseItems[tfIndex];
  const correct = value === item.correct;

  if (correct) tfScore++;

  tfButtons.forEach((button, i) => {
    button.disabled = true;
    const buttonValue = i === 0;

    if (buttonValue === item.correct) {
      button.classList.add('correct');
    } else if (buttonValue === value) {
      button.classList.add('incorrect');
    }
  });

  tfFeedback.textContent =
    `${correct ? 'Correct! 🌿' : 'Not quite!'} ${item.explanation}`;

  tfProgress.textContent =
    `Statement ${tfIndex + 1} of ${trueFalseItems.length} · Score: ${tfScore}`;

  tfNext.textContent =
    tfIndex === trueFalseItems.length - 1
      ? 'See results →'
      : 'Next statement →';

  tfNext.hidden = false;
}

tfButtons[0].addEventListener('click', () => answerTrueFalse(true));
tfButtons[1].addEventListener('click', () => answerTrueFalse(false));

tfNext.addEventListener('click', () => {
  if (tfIndex === trueFalseItems.length) {
    tfIndex = 0;
    tfScore = 0;
  } else {
    tfIndex++;
  }
  renderTrueFalse();
});

renderTrueFalse();

// MEMORY GAME
const board = document.querySelector('#memory');
const movesEl = document.querySelector('#moves');
const pairsEl = document.querySelector('#pairs');
const message = document.querySelector('#game-message');

let deck = [];
let flipped = [];
let matched = 0;
let moves = 0;
let locked = false;
let round = 0;

function shuffle(items) {
  const a = [...items];

  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }

  return a;
}

function startGame() {
  round++;
  board.replaceChildren();
  flipped = [];
  matched = 0;
  moves = 0;
  locked = false;

  movesEl.textContent = '0';
  pairsEl.textContent = '0 / 6';
  message.textContent =
    'Choose two cards and find a matching pair! ✨';

  const chosen = shuffle(images).slice(0, 6);

  deck = shuffle(
    [...chosen, ...chosen].map((photo, i) => ({
      ...photo,
      uid: i
    }))
  );

  deck.forEach((photo, i) => {
    const button = document.createElement('button');
    button.className = 'memory-card';
    button.textContent = '?';
    button.setAttribute('aria-label', `Flip card ${i + 1}`);

    button.addEventListener('click', () => flip(i));
    board.append(button);
  });
}

function showCard(i) {
  const button = board.children[i];
  const img = document.createElement('img');

  img.src = deck[i].src;
  img.alt = deck[i].title;

  button.replaceChildren(img);
  button.setAttribute('aria-label', deck[i].title);
}

function hideCard(i) {
  const button = board.children[i];
  button.textContent = '?';
  button.setAttribute('aria-label', `Flip card ${i + 1}`);
}

function flip(i) {
  if (
    locked ||
    flipped.includes(i) ||
    board.children[i].disabled
  ) return;

  showCard(i);
  flipped.push(i);

  if (flipped.length < 2) return;

  moves++;
  movesEl.textContent = moves;

  const [a, b] = flipped;

  if (deck[a].src === deck[b].src) {
    [a, b].forEach(index => {
      board.children[index].disabled = true;
      board.children[index].classList.add('matched');
    });

    matched++;
    pairsEl.textContent = `${matched} / 6`;
    flipped = [];

    message.textContent = matched === 6
      ? `Congratulations! 🎉 You found all 6 pairs in ${moves} attempts!`
      : 'Great job! You found a matching pair!';
  } else {
    locked = true;
    message.textContent = 'Try again!';

    const currentRound = round;

    setTimeout(() => {
      if (currentRound !== round) return;

      hideCard(a);
      hideCard(b);
      flipped = [];
      locked = false;
    }, 900);
  }
}

document.querySelector('#restart').addEventListener('click', startGame);

startGame();

