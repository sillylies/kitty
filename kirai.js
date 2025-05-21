document.addEventListener('DOMContentLoaded', () => {
  const boxContain = document.querySelector('.box-contain');
  if (!boxContain) {
    console.error("Box element not found!");
    return;
  }

  document.addEventListener('mousemove', (event) => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    let offsetX = (mouseX / window.innerWidth - 0.5) * 30;
    let offsetY = (mouseY / window.innerHeight - 0.5) * -30;
    offsetX = Math.min(Math.max(offsetX, -15), 15);
    offsetY = Math.min(Math.max(offsetY, -15), 15);
    boxContain.style.transform = `perspective(1500px) rotateX(${offsetY}deg) rotateY(${offsetX}deg)`;
  });

  const line1Text = "they say only at the threshold of death";
  const line2Text = "we can see our lives clearly";

  const line1El = document.getElementById("line1");
  const line2El = document.getElementById("line2");

  const typingSpeed = 50;
  const deletingSpeed = 40;
  const pauseAfterTyping = 2000;
  const pauseBetweenLines = 300;

let blinkInterval;

function setTextWithCaret(el, text, active) {
  el.innerHTML = text;
  if (active) {
    // Create caret span if not exists
    if (!el.querySelector('.caret')) {
      const caretSpan = document.createElement('span');
      caretSpan.className = 'caret';
      caretSpan.textContent = '|';
      caretSpan.style.color = '#ff0000'; // red color
      el.appendChild(caretSpan);

      // Start blinking
      blinkInterval = setInterval(() => {
        caretSpan.style.visibility = (caretSpan.style.visibility === 'visible' || caretSpan.style.visibility === '') ? 'hidden' : 'visible';
      }, 500);
    }
  } else {
    // Remove caret and stop blinking
    clearInterval(blinkInterval);
    const caret = el.querySelector('.caret');
    if (caret) caret.remove();
  }
}

  function typeText(text, el, speed, callback) {
    let i = 0;
    function type() {
      if (i <= text.length) {
        setTextWithCaret(el, text.substring(0, i), true);
        i++;
        setTimeout(type, speed);
      } else {
        if (callback) setTimeout(callback, pauseBetweenLines);
      }
    }
    type();
  }

  function deleteText(el, speed, callback) {
    let text = el.textContent;
    function erase() {
      if (text.length > 0) {
        text = text.slice(0, -1);
        setTextWithCaret(el, text, true);
        setTimeout(erase, speed);
      } else {
        el.innerHTML = ""; // clean up after delete
        if (callback) callback();
      }
    }
    erase();
  }

  function animateTextLoop() {
    typeText(line1Text, line1El, typingSpeed, () => {
      setTextWithCaret(line1El, line1Text, false); // Remove caret from line 1
      typeText(line2Text, line2El, typingSpeed, () => {
        setTimeout(() => {
          deleteText(line2El, deletingSpeed, () => {
            deleteText(line1El, deletingSpeed, () => {
              setTimeout(animateTextLoop, pauseBetweenLines);
            });
          });
        }, pauseAfterTyping);
      });
    });
  }

  animateTextLoop();
});
