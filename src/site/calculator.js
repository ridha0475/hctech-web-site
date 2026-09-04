/** Live estimate of recovered fuel value, from the two range sliders on the Avantages page. */

const RECOVERY_RATE = 0.005; // 5 ‰ — internal median hypothesis, not field-validated
const PRICE_PER_LITER = 2.525; // DT, official pump price, essence sans plomb
const CLIENT_SHARE = 0.4; // per the 60/40 HCTech/exploitant model

const volumeInput = document.getElementById('calc-volume');
const tankInput = document.getElementById('calc-tank');

if (volumeInput && tankInput) {
	const volumeOut = document.getElementById('calc-volume-out');
	const tankOut = document.getElementById('calc-tank-out');
	const recoveredOut = document.getElementById('calc-recovered');
	const monthlyOut = document.getElementById('calc-monthly');
	const yearlyOut = document.getElementById('calc-yearly');
	const cta = document.getElementById('calc-cta');

	const fmt = (n) => Math.round(n).toLocaleString('fr-FR');
	const t = (key) => (window.__i18nGet ? window.__i18nGet(key) : key);

	function update() {
		const volume = Number(volumeInput.value);
		const tank = Number(tankInput.value);

		const recoveredPerDay = volume * RECOVERY_RATE;
		const clientPerDay = recoveredPerDay * PRICE_PER_LITER * CLIENT_SHARE;

		const literDay = t('calc.unit.literDay');
		const liter = t('calc.unit.liter');
		const currency = t('calc.unit.currency');

		volumeOut.textContent = `${fmt(volume)} ${literDay}`;
		tankOut.textContent = `${fmt(tank)} ${liter}`;
		recoveredOut.textContent = `${fmt(recoveredPerDay)} ${literDay}`;
		monthlyOut.textContent = `${fmt(clientPerDay * 30)} ${currency}`;
		yearlyOut.textContent = `${fmt(clientPerDay * 365)} ${currency}`;

		if (cta) {
			try {
				localStorage.setItem('hctech-calc', JSON.stringify({ volume, tank }));
			} catch {
				/* localStorage unavailable (private mode, etc.) — the estimate still displays fine */
			}
		}
	}

	volumeInput.addEventListener('input', update);
	tankInput.addEventListener('input', update);
	window.addEventListener('hctech:lang', update);
	update();
}
