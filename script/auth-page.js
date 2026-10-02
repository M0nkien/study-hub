/* StudyHub Auth – one Supabase identity for students and admins.
   Public signup always receives the database default role "student". */
(function () {
  "use strict";

  const db = window.studyHubSupabase;
  const form = document.getElementById("studyhubLoginForm");
  if (!form) return;

  const $ = id => document.getElementById(id);
  const message = $("studentAuthMessage");
  const name = $("studentName");
  const email = $("studentEmail");
  const password = $("studentPassword");
  const confirm = $("studentPasswordConfirm");
  const loginBtn = $("studentSignIn");
  const registerBtn = $("studentSignUp");
  const resetBtn = $("studentResetPassword");
  const logoutBtn = $("studentSignOut");
  const tabs = [...document.querySelectorAll("[data-auth-mode]")];
  const params = new URLSearchParams(location.search);
  let mode = params.get("mode") === "register" ? "register" : "login";
  let busy = false;

  function say(text, error = false) {
    message.textContent = text;
    message.dataset.error = error ? "true" : "false";
    message.hidden = !text;
  }

  function destination() {
    const requested = params.get("redirect");
    if (!requested) return null;
    try {
      const url = new URL(requested, location.href);
      if (url.origin !== location.origin || !/^https?:$/.test(url.protocol)) return null;
      return url.pathname + url.search + url.hash;
    } catch (_) { return null; }
  }

  function showMode(next) {
    mode = next === "register" ? "register" : "login";
    form.dataset.mode = mode;
    name.parentElement.hidden = mode !== "register";
    confirm.parentElement.hidden = mode !== "register";
    password.autocomplete = mode === "register" ? "new-password" : "current-password";
    name.required = mode === "register";
    confirm.required = mode === "register";
    loginBtn.hidden = mode !== "login";
    registerBtn.hidden = mode !== "register";
    resetBtn.hidden = mode !== "login";
    tabs.forEach(tab => {
      const selected = tab.dataset.authMode === mode;
      tab.classList.toggle("is-active", selected);
      tab.setAttribute("aria-selected", String(selected));
    });
    const url = new URL(location.href);
    if (mode === "register") url.searchParams.set("mode", "register");
    else url.searchParams.delete("mode");
    history.replaceState(null, "", url.pathname + url.search + url.hash);
    say("");
  }

  function lock(state) {
    busy = state;
    loginBtn.disabled = state || !db;
    registerBtn.disabled = state || !db;
    resetBtn.disabled = state || !db;
    logoutBtn.disabled = state || !db;
  }

  function credentials() {
    const address = email.value.trim();
    const pass = password.value;
    if (!address || !email.checkValidity()) {
      say("Zadaj platnú e-mailovú adresu.", true);
      return null;
    }
    if (pass.length < 8) {
      say("Heslo musí mať aspoň 8 znakov.", true);
      return null;
    }
    return { email: address, password: pass };
  }

  async function afterLogin(user) {
    const result = await db.from("profiles")
      .select("role,display_name").eq("id", user.id).maybeSingle();
    if (result.error || !result.data) {
      say("Prihlásenie prebehlo, ale profil sa nepodarilo načítať. Obnov stránku.", true);
      return;
    }
    const target = destination() || (result.data.role === "admin" ? "admin.html" : "results.html");
    location.assign(target);
  }

  async function login() {
    if (busy || !db) return;
    const values = credentials();
    if (!values) return;
    lock(true);
    say("Prihlasujem ťa…");
    try {
      const result = await db.auth.signInWithPassword(values);
      if (result.error) throw result.error;
      password.value = "";
      await afterLogin(result.data.user);
    } catch (error) {
      say("Prihlásenie sa nepodarilo. Skontroluj e-mail, heslo a potvrdenie účtu.", true);
      console.warn("StudyHub login:", error.message);
    } finally { lock(false); }
  }

  async function register() {
    if (busy || !db) return;
    const values = credentials();
    if (!values) return;
    const displayName = name.value.trim();
    if (displayName.length < 2 || displayName.length > 60) {
      say("Zadaj meno alebo prezývku (2 až 60 znakov).", true);
      return;
    }
    if (values.password !== confirm.value) {
      say("Heslá sa nezhodujú.", true);
      return;
    }
    lock(true);
    say("Vytváram účet…");
    try {
      const callback = new URL("login.html", location.href);
      callback.searchParams.delete("mode");
      callback.searchParams.delete("redirect");
      const result = await db.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: { display_name: displayName },
          emailRedirectTo: callback.href
        }
      });
      if (result.error) throw result.error;
      password.value = "";
      confirm.value = "";
      if (result.data.session?.user) {
        await afterLogin(result.data.user);
      } else {
        showMode("login");
        say("Ak je e-mail možné zaregistrovať, príde naň potvrdzovací odkaz. Po potvrdení sa prihlás.");
      }
    } catch (error) {
      say("Účet sa nepodarilo vytvoriť. Skontroluj údaje a skús to znovu.", true);
      console.warn("StudyHub registration:", error.message);
    } finally { lock(false); }
  }

  async function resetPassword() {
    if (busy || !db) return;
    if (!email.checkValidity() || !email.value.trim()) {
      say("Najprv zadaj platný e-mail.", true);
      return;
    }
    lock(true);
    try {
      const result = await db.auth.resetPasswordForEmail(email.value.trim(), {
        redirectTo: new URL("reset-password.html", location.href).href
      });
      if (result.error) throw result.error;
      say("Ak je k e-mailu priradený účet, príde ti odkaz na obnovenie hesla.");
    } catch (error) {
      say("Žiadosť sa nepodarilo odoslať. Skús to znova.", true);
      console.warn("Password recovery:", error.message);
    } finally { lock(false); }
  }

  async function refresh() {
    if (!db) { lock(true); say("Databáza nie je dostupná. Skús to neskôr.", true); return; }
    const session = await db.auth.getSession();
    const user = session.data?.session?.user;
    logoutBtn.hidden = !user;
    const current = $("studentCurrentAccount");
    current.hidden = !user;
    if (user) current.textContent = "Aktuálne prihlásený: " + user.email;
  }

  tabs.forEach(tab => tab.addEventListener("click", () => showMode(tab.dataset.authMode)));
  form.addEventListener("submit", event => {
    event.preventDefault();
    if (mode === "register") register();
    else login();
  });
  resetBtn.addEventListener("click", resetPassword);
  logoutBtn.addEventListener("click", async () => {
    if (!db || busy) return;
    lock(true);
    const result = await db.auth.signOut();
    lock(false);
    if (result.error) say("Nepodarilo sa odhlásiť.", true);
    else { say("Úspešne odhlásené."); await refresh(); }
  });
  showMode(mode);
  refresh();
})();
