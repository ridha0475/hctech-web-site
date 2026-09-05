/** GitHub Pages has no backend: each page's form opens a pre-filled email. */

const t = (key) => (window.__i18nGet ? window.__i18nGet(key) : key);
const EMAIL_INVALID = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

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
		`Volume de la cuve de stockage : ${d.tankVolume} L`,
		`Fréquence des livraisons : ${d.delivery}`,
		`Récupération des vapeurs à la livraison (Stage I) : ${d.stage1}`,
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

// Coming from the calculator: prefill the étude form's volume fields only — never the message.
try {
	const calc = JSON.parse(localStorage.getItem('hctech-calc') || 'null');
	const etudeForm = document.getElementById('form-etude');
	if (calc && etudeForm) {
		const volumeInput = etudeForm.querySelector('[name="dailyVolume"]');
		if (volumeInput && !volumeInput.value) volumeInput.value = calc.volume;
		const tankInput = etudeForm.querySelector('[name="tankVolume"]');
		if (tankInput && !tankInput.value) tankInput.value = calc.tank;
	}
} catch {
	/* no stored estimate, or localStorage unavailable — leave the form blank */
}
