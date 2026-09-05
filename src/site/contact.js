/** GitHub Pages has no backend: each form opens a pre-filled email. */

const t = (key) => (window.__i18nGet ? window.__i18nGet(key) : key);
const EMAIL_INVALID = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

const sujet = new URLSearchParams(location.search).get('sujet') || 'contact';
const FORMS = { etude: 'form-etude', intervention: 'form-intervention', contact: 'form-contact' };
const activeId = FORMS[sujet] || FORMS.contact;

for (const [key, id] of Object.entries(FORMS)) {
	const form = document.getElementById(id);
	if (form) form.hidden = id !== activeId;
}

if (sujet === 'etude' || sujet === 'intervention') {
	const titleEl = document.querySelector('[data-i18n="contact.title"]');
	const ledeEl = document.querySelector('[data-i18n="contact.lede"]');
	if (titleEl && ledeEl) {
		titleEl.dataset.i18n = `contact.${sujet}.title`;
		ledeEl.dataset.i18n = `contact.${sujet}.lede`;
		titleEl.textContent = t(titleEl.dataset.i18n);
		ledeEl.textContent = t(ledeEl.dataset.i18n);
	}
}

/** Wire a form: validate(data) gates submission, subject(data)/lines(data) build the mailto. */
function wireForm(id, { validate, subject, lines }) {
	const form = document.getElementById(id);
	if (!form) return;
	const status = form.querySelector('[data-form-status]');

	form.addEventListener('submit', (event) => {
		event.preventDefault();
		status.className = 'cform__status';

		const data = Object.fromEntries(new FormData(form));
		for (const key of Object.keys(data)) data[key] = String(data[key] || '').trim();

		if (!validate(data)) {
			status.textContent = t('form.invalid');
			status.classList.add('is-error');
			return;
		}

		const body = lines(data).join('\n');
		window.location.href = `mailto:mlbelajouza@gmail.com?subject=${encodeURIComponent(subject(data))}&body=${encodeURIComponent(body)}`;
	});
}

wireForm('form-etude', {
	validate: (d) => d.name.length >= 2 && d.message.length >= 5 && EMAIL_INVALID.test(d.email),
	subject: (d) => `Demande d'étude GEVLR-II — ${d.company || d.name}`,
	lines: (d) => [
		`Nom et prénoms : ${d.name}`,
		`Qualité : ${d.qualite}`,
		`Téléphone : ${d.phone}`,
		`WhatsApp : ${d.whatsapp}`,
		`E-mail : ${d.email}`,
		`Société : ${d.company}`,
		`RNE : ${d.rne}`,
		`Indépendante : ${d.independent}`,
		`Enseigne / marque : ${d.brand}`,
		`Localisation (Google Maps) : ${d.mapsLink}`,
		`Adresse : ${d.street}, ${d.city}, ${d.governorate}`,
		`Sans plomb vendu en moyenne/jour (6 derniers mois) : ${d.dailyVolume} L`,
		`Fréquence des livraisons : ${d.delivery}`,
		'',
		d.message,
	],
});

wireForm('form-intervention', {
	validate: (d) => d.message.length >= 5,
	subject: (d) => `Demande d'intervention — contrat ${d.contractNumber || '?'}`,
	lines: (d) => [
		`N° de contrat : ${d.contractNumber}`,
		`Niveau d'urgence : ${d.urgency}`,
		`Nature de l'intervention : ${d.nature}`,
		'',
		d.message,
	],
});

wireForm('form-contact', {
	validate: (d) => d.name.length >= 2 && d.message.length >= 5 && EMAIL_INVALID.test(d.email),
	subject: (d) => `Contact — ${d.name}`,
	lines: (d) => [
		`Nom et prénoms : ${d.name}`,
		`Téléphone : ${d.phone}`,
		`WhatsApp : ${d.whatsapp}`,
		`E-mail : ${d.email}`,
		'',
		d.message,
	],
});

// Coming from the calculator: prefill the étude form's daily volume + message.
try {
	const calc = JSON.parse(localStorage.getItem('hctech-calc') || 'null');
	const etudeForm = document.getElementById('form-etude');
	if (calc && etudeForm) {
		const volumeInput = etudeForm.querySelector('[name="dailyVolume"]');
		if (volumeInput && !volumeInput.value) volumeInput.value = calc.volume;

		const message = etudeForm.querySelector('[name="message"]');
		if (message && !message.value) {
			const l = t('calc.unit.liters');
			message.value = `${t('calc.tank.label')} : ${calc.tank} ${l}\n${t('calc.price.label')} : ${calc.price} ${t('calc.unit.dt')}\n\n`;
		}
	}
} catch {
	/* no stored estimate, or localStorage unavailable — leave the form blank */
}
