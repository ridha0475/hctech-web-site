/** Estimation de la récupération et de la part station, depuis les trois curseurs. */

const RECOVERY_RATE = 0.005; // 5 ‰ — hypothèse interne médiane, non validée terrain
const STATION_SHARE = 0.4; // modèle 60 / 40 HCTECH / exploitant
const VAT_RATE = 0.19; // TVA 19 %, taux retenu dans le BP

export function estimate(litersPerDay, pricePerLiter) {
	const recoveredPerDay = litersPerDay * RECOVERY_RATE;
	const sharePerDay = recoveredPerDay * pricePerLiter * STATION_SHARE;
	return {
		liters: { day: recoveredPerDay, month: recoveredPerDay * 30, year: recoveredPerDay * 365 },
		share: { day: sharePerDay, month: sharePerDay * 30, year: sharePerDay * 365 },
		vat: {
			day: sharePerDay * (VAT_RATE / (1 + VAT_RATE)),
			month: sharePerDay * 30 * (VAT_RATE / (1 + VAT_RATE)),
			year: sharePerDay * 365 * (VAT_RATE / (1 + VAT_RATE)),
		},
	};
}

const priceInput = typeof document !== 'undefined' && document.getElementById('calc-price');

if (priceInput) {
	const volumeInput = document.getElementById('calc-volume');
	const tankInput = document.getElementById('calc-tank');
	const el = (id) => document.getElementById(id);
	const t = (key) => (window.__i18nGet ? window.__i18nGet(key) : key);

	const round = (n) => Math.round(n).toLocaleString('fr-FR');
	const money = (n) => n.toLocaleString('fr-FR', { minimumFractionDigits: 3, maximumFractionDigits: 3 });

	function update() {
		const price = Number(priceInput.value);
		const volume = Number(volumeInput.value);
		const tank = Number(tankInput.value);
		const r = estimate(volume, price);

		const liters = t('calc.unit.liters');
		const dt = t('calc.unit.dt');
		const ttc = t('calc.unit.dtTtc');
		const vatLabel = t('calc.vatLabel');

		el('calc-price-out').textContent = `${money(price)} ${dt}`;
		el('calc-volume-out').textContent = `${round(volume)} ${liters}`;
		el('calc-tank-out').textContent = `${round(tank)} ${liters}`;

		for (const period of ['day', 'month', 'year']) {
			el(`calc-liters-${period}`).textContent = `${round(r.liters[period])} ${liters}`;
			el(`calc-share-${period}`).textContent = `${round(r.share[period])} ${ttc}`;
			el(`calc-vat-${period}`).textContent = `${vatLabel} ${round(r.vat[period])} ${dt}`;
		}

		try {
			localStorage.setItem('hctech-calc', JSON.stringify({ price, volume, tank }));
		} catch {
			/* localStorage indisponible (navigation privée) — l'estimation s'affiche quand même */
		}
	}

	for (const input of [priceInput, volumeInput, tankInput]) input.addEventListener('input', update);
	window.addEventListener('hctech:lang', update);
	update();
}
