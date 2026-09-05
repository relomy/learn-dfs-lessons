/* Reusable guided-to-blind decision practice for architecture lessons. */
(function () {
  function makeRunner(element, cases, title, labels) {
    var position = 0;
    var streak = 0;
    var blind = false;
    var locked = false;
    var transitionTimer;
    labels = labels || { pass: 'Pass', hold: 'Hold', drop: 'Drop' };

    function current() { return cases[position % cases.length]; }

    function render() {
      var item = current();
      element.innerHTML =
        '<h3>' + (title || 'Candidate assembly trainer') + '</h3>' +
        '<p class="runner-prompt">' + item.prompt + '</p>' +
        '<div class="record-grid">' + item.records.map(function (record) {
          return '<section class="record"><h4>' + record.title + '</h4><p>' + record.data + '</p><p class="state">' + record.state + '</p></section>';
        }).join('') + '</div>' +
        '<div class="runner-choices"><button data-choice="pass">' + labels.pass + '</button><button data-choice="hold">' + labels.hold + '</button><button data-choice="drop">' + labels.drop + '</button></div>' +
        '<p class="runner-feedback" aria-live="polite"></p>' +
        '<p class="runner-status">Streak: <strong>' + streak + '</strong> · ' + (blind ? 'Blind mode' : 'Guided mode') + '</p>' +
        '<div class="runner-controls"><button class="runner-mode">' + (blind ? 'Use guided mode' : 'Use blind mode') + '</button></div>';
      element.querySelector('.runner-choices').addEventListener('click', answer);
      element.querySelector('.runner-mode').addEventListener('click', toggleMode);
    }

    function answer(event) {
      var button = event.target.closest('button[data-choice]');
      if (!button || locked) return;
      var item = current();
      var feedback = element.querySelector('.runner-feedback');
      locked = true;
      if (button.dataset.choice === item.answer) {
        streak += 1;
        button.classList.add('good');
        feedback.className = 'runner-feedback good';
        feedback.textContent = blind ? item.short : item.explanation;
        position += 1;
        offerNext('Next case');
      } else {
        streak = 0;
        button.classList.add('bad');
        feedback.className = 'runner-feedback bad';
        feedback.textContent = blind ? 'Try again. Decide whether the input can proceed, needs a person, or cannot form a valid candidate.' : item.hint;
        offerNext('Try again');
      }
    }

    function offerNext(label) {
      var skip = document.createElement('div');
      skip.className = 'runner-skip';
      skip.innerHTML = '<button class="runner-next">' + label + '</button>';
      element.querySelector('.runner-feedback').after(skip);
      skip.querySelector('button').addEventListener('click', advance);
      transitionTimer = window.setTimeout(advance, 5000);
    }

    function advance() {
      if (!locked) return;
      window.clearTimeout(transitionTimer);
      locked = false;
      render();
    }

    function toggleMode() { blind = !blind; streak = 0; render(); }
    render();
  }

  window.CaseRunner = { make: makeRunner };
})();
