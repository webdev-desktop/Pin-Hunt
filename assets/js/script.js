document.addEventListener("DOMContentLoaded", () => {
  const digits = document.querySelectorAll(".digit");
  const submit = document.getElementById("submit");
  const reset = document.getElementById("reset");

  const win = document.querySelector(".win");
  const lose = document.querySelector(".lose");

  const toastBox = document.getElementById("toastBox");

  let winningNumber = generateNumber();
  let isSubmitting = false;

  // 🎯 Generate random 4-digit number
  function generateNumber() {
    return Math.floor(1000 + Math.random() * 9000).toString();
  }

  // 🍞 Toast
  function showToast(msg, type = "success") {
    const t = document.createElement("div");
    t.className = `toast ${type}`;
    t.innerText = msg;
    toastBox.appendChild(t);
    setTimeout(() => t.remove(), 3000);
  }

  // 🎯 Get input value
  function getValue() {
    return [...digits].map((d) => d.value).join("");
  }

  // 🎯 Submit
  function handleSubmit() {
    if (isSubmitting) return; // 🛑 prevent multiple calls

    const value = getValue();

    if (!/^\d{4}$/.test(value)) {
      showToast("Enter all 4 digits", "warning");
      return;
    }

    isSubmitting = true; // 🔒 lock

    win.style.display = "none";
    lose.style.display = "none";

    // Disable inputs during result
    digits.forEach((d) => (d.disabled = true));

    if (value === winningNumber) {
      win.style.display = "block";
      showToast("You Win 🎉", "success");

      startConfetti();

      setTimeout(() => {
        stopConfetti();
        resetGame();
      }, 4000);
    } else {
      lose.style.display = "block";
      showToast(`Wrong Number 😢 | Correct was ${winningNumber}`, "error");

      setTimeout(resetGame, 2000);
    }
  }

  function devConsoleMessage() {
    console.clear();

    console.log(
      "%c👀 Oye Developer! Console me kya dhund raha hai?",
      "color: yellow; font-size:20px; font-weight:bold;"
    );

    console.log(
      "%c😏 Game khel na seedha... cheating kyun kar raha hai?",
      "color: cyan; font-size:14px;"
    );

    console.log(
      `%c🎯 Chal le, winning number ye hai: ${winningNumber}`,
      "color: lime; font-size:16px; font-weight:bold;"
    );

    console.log(
      "%c🤫 Ab kisi ko batana mat... warna game boring ho jayega!",
      "color: pink; font-size:13px;"
    );
  }

  devConsoleMessage();

  // 🔁 Reset
  function resetGame() {
    digits.forEach((d) => {
      d.value = "";
      d.disabled = false;
    });

    win.style.display = "none";
    lose.style.display = "none";

    winningNumber = generateNumber();
    devConsoleMessage();

    isSubmitting = false;

    clearCanvas();

    // 🎯 focus first box
    digits[0].focus();
  }

  // 🔢 Auto move + auto submit
  digits.forEach((input, i) => {
    input.addEventListener("input", () => {
      input.value = input.value.replace(/\D/g, "");

      // Move forward
      if (input.value && digits[i + 1]) {
        digits[i + 1].focus();
      }

      // ✅ Auto submit only when EXACT 4 digits
      if (getValue().length === 4 && !isSubmitting) {
        handleSubmit();
      }
    });

    input.addEventListener("keydown", (e) => {
      if (e.key === "Backspace" && !input.value && digits[i - 1]) {
        digits[i - 1].focus();
      }

      if (e.key === "Enter") {
        handleSubmit();
      }
    });
  });

  submit.addEventListener("click", handleSubmit);
  reset.addEventListener("click", resetGame);

  // 🎉 CONFETTI
  const canvas = document.getElementById("confetti");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  function startConfetti() {
    for (let i = 0; i < 150; i++) {
      ctx.fillStyle = `hsl(${Math.random() * 360},100%,50%)`;
      ctx.fillRect(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        5,
        5
      );
    }
  }

  function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  function stopConfetti() {
    clearCanvas();
  }

  // 🎯 Initial focus
  digits[0].focus();
});
