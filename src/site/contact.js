/** GitHub Pages has no backend, so prepare a pre-filled email. */

const form = document.getElementById('contact-form');

if (form) {
	const status = form.querySelector('[data-form-status]');
	const t = (key) => (window.__i18nGet ? window.__i18nGet(key) : key);

	try {
		const calc = JSON.parse(localStorage.getItem('hctech-calc'));
		const message = form.querySelector('[name="message"]');
		if (calc && message && !message.value) {
			message.value = `Volume vendu estimé : ${calc.volume} L/jour\nVolume de cuve estimé : ${calc.tank} L\n\n`;
		}
	} catch {
		/* no stored estimate, or localStorage unavailable — leave the form blank */
	}

	form.addEventListener('submit', (event) => {
		event.preventDefault();
		status.className = 'cform__status';

		const data = Object.fromEntries(new FormData(form));
		const name = String(data.name || '').trim();
		const email = String(data.email || '').trim();
		const message = String(data.message || '').trim();

		if (name.length < 2 || message.length < 5 || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
			status.textContent = t('form.invalid');
			status.classList.add('is-error');
			return;
		}

		const subject = `Demande GEVLR-II — ${String(data.company || name).trim()}`;
		const body = [
			`Nom : ${name}`,
			`Société / Station : ${String(data.company || '').trim()}`,
			`Téléphone : ${String(data.phone || '').trim()}`,
			`E-mail : ${email}`,
			'',
			message,
		].join('\n');

		window.location.href = `mailto:mlbelajouza@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
	});
}
