const wordsBeginner = new Map([
    ["English", new Map([
      [1, "sun"],
      [2, "weather"],
      [3, "rain"],
      [4, "hail"],
      [5, "rainfall"],
      [6, "flood"],
      [7, "snowfall"],
      [8, "snow"],
      [9, "rainbow"],
      [10, "moon"]
    ])],
    ["Ukrainian", new Map([
      [1, "сонце"],
      [2, "погода"],
      [3, "дощ"],
      [4, "град"],
      [5, "ливень"],
      [6, "повінь"],
      [7, "снігопад"],
      [8, "сніг"],
      [9, "веселка"],
      [10, "місяць"]
    ])]
  ]);
  
  const wordsMiddle = new Map([
    ["English", new Map([
      [1, "noisy"],
      [2, "quick"],
      [3, "sharp"],
      [4, "shiny"],
      [5, "poor"],
      [6, "rich"],
      [7, "quiet"],
      [8, "painful"],
      [9, "young"],
      [10, "old"]
    ])],
    ["Ukrainian", new Map([
      [1, "гучний"],
      [2, "швидкий"],
      [3, "гострий"],
      [4, "блискучий"],
      [5, "бідний"],
      [6, "багатий"],
      [7, "тихий"],
      [8, "болючий"],
      [9, "молодий"],
      [10, "старий"]
    ])]
  ]);
  
  const wordsProfi = new Map([
    ["English", new Map([
      [1, "credulous"],
      [2, "abhor"],
      [3, "abrasive"],
      [4, "oblique"],
      [5, "oblivious"],
      [6, "plethora"],
      [7, "affable"],
      [8, "bellicose"],
      [9, "blithe"],
      [10, "cryptic"]
    ])],
    ["Ukrainian", new Map([
      [1, "довірливий"],
      [2, "ненавидіти"],
      [3, "різкий"],
      [4, "похилий"],
      [5, "розсіяний"],
      [6, "достаток"],
      [7, "привітний"],
      [8, "войовничий"],
      [9, "веселий"],
      [10, "загадковий"]
    ])]
  ]);
  
  let wordsEN;
  let wordsUA;
  let keysEN;
  let wordUA;
  let wordEN;
  let wordNum = 1;
  let isFlipped = false;
  let correctAnswr = 0;
  let wrongAnswr = 0;
  
  function flipCard() {
    if (isFlipped) {
      $('.card').css('transform', 'rotateY(0deg)');
    } else {
      $('.card').css('transform', 'rotateY(180deg)');
    }
    isFlipped = !isFlipped;
  }
  function CheckButton() {
    // Кнопка заблокована, якщо слово не введено або картка перевернута
    const wordText = $('#word').val().trim();
    $('#checkBtn').prop('disabled', isFlipped || wordText === '');
  }
  
  function Choose() {
    $('.card-front').removeClass('correct incorrect');
  
    // Якщо слова закінчилися
    if (keysEN.length === 0) {
      alert('Слова закінчилися! Натисніть стрілку, щоб перейти далі.');
      return;
    }
  
    // Вибір випадкового слова
    const randomKey = keysEN[Math.floor(Math.random() * keysEN.length)];
    wordEN = wordsEN.get(randomKey);
    wordUA = wordsUA.get(randomKey);
    $('#wordEN').text(wordEN);
    $('#wordUA').text('');
    keysEN = keysEN.filter(key => key !== randomKey); // Видалення ключа з масиву
  }
  
  function Check(wordText) {
    $('.card-front').removeClass('correct incorrect');
    if (wordText === wordUA) {
      $('.card-front').addClass('correct');
      correctAnswr++;
    } else {
      $('.card-front').addClass('incorrect');
      wrongAnswr++;
    }
    $('#trueSum').text(correctAnswr);
    $('#falseSum').text(wrongAnswr);
    $('#wordUA').text(wordUA);
    setTimeout(flipCard, 500);
  }
  
  $(function () {
    $('input[type="radio"]').change(function () {
      const selectedValue = $(this).val();
  
      // Вибираємо правильну карту залежно від вибору
      if (selectedValue === 'beginner') {
        currentMap = wordsBeginner;
      } else if (selectedValue === 'middle') {
        currentMap = wordsMiddle;
      } else if (selectedValue === 'profi') {
        currentMap = wordsProfi;
      }
  
      // Ініціалізуємо змінні для слів
      const lang = Array.from(currentMap.keys());
      wordsEN = currentMap.get(lang[0]);
      wordsUA = currentMap.get(lang[1]);
      keysEN = Array.from(wordsEN.keys());
  
      // Блокуємо вибір
      $('input[type="radio"]').prop('disabled', true);
  
      // Починаємо гру
      wordNum = 1;
      correctAnswr = 0;
      wrongAnswr = 0;
      $('#trueSum').text(correctAnswr);
      $('#falseSum').text(wrongAnswr);
      $('#wordNum').text(`${wordNum}/10`);
      Choose();
      CheckButton();
  
      // Очищення поля вводу
      $('#word').val('').off('input').on('input', CheckButton);
    });
    $('#checkBtn').off('click').click(function () {
        const wordText = $('#word').val().trim();
        if (wordText !== '') {
          Check(wordText);
          $('#word').val('');
          CheckButton();
        } else {
          alert('Введіть слово!');
        }
      });
    
      $('#rightArrow').off('click').click(function () {
        if (isFlipped && wordNum < 10) {
          wordNum++;
          $('#wordNum').text(`${wordNum}/10`);
          flipCard();
          Choose();
          CheckButton();
        } else if (isFlipped && wordNum === 10) {
          alert('Це останнє слово!');
          if (correctAnswr < 2) {
            alert('У вас поганенький рівень англійської..');
          } else if (correctAnswr < 6 && correctAnswr >= 2) {
            alert('У вас середній рівень англійської.');
          } else if (correctAnswr === 10) {
            alert('МОЖНА ЇХАТИ В БРИТАНІЮ!');
          }
          // Блокування кнопки після завершення
          $(this).prop('disabl;ed', true);
        }
      });
    });