/* StudyHub: recover or change your own password through an authenticated Supabase session. */
(function () {
  "use strict";
  const db = window.studyHubSupabase;
  const form = document.getElementById("resetPasswordForm");
  if (!form) return;
  const message = document.getElementById("resetPasswordMessage");
  const save = document.getElementById("resetPasswordSave");
  const password = document.getElementById("resetPassword");
  const confirm = document.getElementById("resetPasswordConfirm");

  function say(text, error) {
    message.textContent = text;
    message.dataset.error = error ? "true" : "false";
  }

  async function verify() {
    if (!db) {
      save.disabled = true;
      say("Databáza nie je dostupná.", true);
      return;
    }
    const session = await db.auth.getSession();
    if (session.error || !session.data?.session) {
      save.disabled = true;
      say("Odkaz na obnovenie hesla už nie je platný alebo sa nepodarilo overiť. Požiadaj o nový odkaz na prihlasovacej stránke.", true);
    }
  }

  form.addEventListener("submit", async event => {
    event.preventDefault();
    if (!db) return;
    if (password.value.length < 8 || password.value !== confirm.value) {
      say("Heslo musí mať aspoň 8 znakov a obe heslá sa musia zhodovať.", true);
      return;
    }
    save.disabled = true;
    say("Ukladám heslo…");
    const result = await db.auth.updateUser({ password: password.value });
    save.disabled = false;
    if (result.error) {
      say("Heslo sa nepodarilo zmeniť. Požiadaj o nový odkaz a skús to znova.", true);
      return;
    }
    password.value = "";
    confirm.value = "";
    say("Heslo bolo aktualizované. Môžeš sa vrátiť na prihlásenie.", false);
  });

  verify();
})();
