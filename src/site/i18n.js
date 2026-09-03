/**
 * HCTECH — trilingual UI (fr / en / ar).
 * Every translatable element carries data-i18n="key"; switching language
 * rewrites textContent, swaps <html lang/dir> and renames the field states.
 */

import { STATES } from '../scene/palette.js';

const STR = {
	fr: {
		'nav.problem': 'Le problème',
		'nav.solution': 'GLRV II',
		'nav.benefits': 'Avantages',
		'nav.about': 'HCTECH',
		'nav.contact': 'Contact',
		'rail.0': 'Vapeurs', 'rail.1': 'GLRV II', 'rail.2': 'Profits', 'rail.3': 'HCTECH',
		'hero.eyebrow': "Récupération de vapeurs d'essence · Tunisie",
		'hero.title': 'The Green Boost to Your Profits.',
		'hero.lede': "HCTECH distribue en Tunisie la GLRV II de GECO Korea — l'unité de récupération des vapeurs d'essence qui transforme les pertes de vos cuves de stockage en carburant récupéré, et vos émissions en économies.",
		'hero.cta': 'Demander une étude gratuite',
		'hero.scroll': 'Défiler',
		'c0.eyebrow': 'Le problème',
		'c0.title': "Vos cuves respirent. Vos profits s'évaporent.",
		'c0.body': "Dans une station-service, le réservoir souterrain « respire » en permanence : à chaque variation de température et à chaque livraison, des vapeurs d'essence s'échappent par l'évent de la cuve. C'est du carburant que vous avez payé et que vous ne vendrez jamais — et une source d'émissions de COV et de risques d'incendie.",
		'c0.s1t': 'Pertes', 'c0.s1d': 'Évaporation continue, jour et nuit',
		'c0.s2t': 'Émissions', 'c0.s2d': "COV rejetés dans l'atmosphère",
		'c0.s3t': 'Risques', 'c0.s3d': 'Inflammabilité · odeurs · HSE',
		'c1.eyebrow': 'La solution',
		'c1.title': 'GLRV II, la récupératrice de vapeurs.',
		'c1.body': "Installée sur l'évent de la cuve de stockage, la GLRV II capte les vapeurs d'essence avant qu'elles ne s'échappent. Un lit de charbon actif adsorbe les hydrocarbures, puis une pompe à vide les désorbe et les condense : l'essence liquide retourne directement dans votre cuve, prête à être revendue.",
		'c1.s1t': 'Technologie', 'c1.s1d': 'Adsorption charbon actif + régénération sous vide',
		'c1.s2t': 'Produit récupéré', 'c1.s2d': 'Essence liquide, réinjectée en cuve',
		'c1.s3t': 'Installation', 'c1.s3d': "Sur l'évent existant, sans gros travaux",
		'c2.eyebrow': 'Avantages & ROI',
		'c2.title': 'Chaque litre récupéré est un litre revendu.',
		'c2.body': "La GLRV II convertit une perte invisible en revenu mesurable : l'essence récupérée retourne en stock et compense son investissement au fil des litres. En parallèle, vous réduisez vos émissions, améliorez la sécurité du site et anticipez la réglementation environnementale.",
		'c2.s1t': 'Rentabilité', 'c2.s1d': "Essence récupérée = chiffre d'affaires additionnel",
		'c2.s2t': 'Environnement', 'c2.s2d': 'Réduction massive des émissions de COV',
		'c2.s3t': 'Sécurité', 'c2.s3d': 'Moins de vapeurs inflammables autour de la station',
		'c3.eyebrow': 'Qui sommes-nous',
		'c3.title': 'HCTECH, votre partenaire en Tunisie.',
		'c3.body': "HCTECH est le distributeur tunisien de GECO Korea, fabricant de la GLRV II. Nous accompagnons les exploitants de stations-service de bout en bout : étude de rentabilité, installation, mise en service, formation et maintenance.",
		'c3.s1t': 'Fabricant',
		'c3.s2t': 'Distribution', 'c3.s2d': 'HCTECH · Tunisie',
		'c3.s3t': 'Services', 'c3.s3d': 'Étude · installation · SAV',
		'contact.title': 'Parlons de votre station.',
		'contact.lede': "Décrivez-nous votre installation — nombre de cuves, volumes, fréquence des livraisons — et nous vous répondons avec une première estimation du potentiel de récupération.",
		'form.name': 'Nom complet *',
		'form.company': 'Société / Station',
		'form.phone': 'Téléphone',
		'form.email': 'E-mail *',
		'form.message': 'Message *',
		'form.send': 'Envoyer la demande',
		'form.sending': 'Envoi en cours…',
		'form.ok': 'Merci ! Votre demande a bien été envoyée. Nous vous recontactons rapidement.',
		'form.err': "L'envoi a échoué. Réessayez ou contactez-nous directement par téléphone ou e-mail.",
		'form.invalid': 'Veuillez remplir correctement les champs obligatoires.',
		'contact.role': 'Gérant — HCTECH',
		'contact.area': 'Tunisie — stations-service & dépôts',
		'foot.tech': 'Technologie GECO Korea · GLRV II',
		'fallback.title': 'Votre navigateur ne prend pas en charge WebGPU.',
		'fallback.body': "Le contenu du site reste accessible ci-dessous, mais l'animation de fond nécessite Chrome, Edge ou Safari 26+ sur ordinateur.",
		states: ['Vapeurs', 'GLRV II', 'Profits', 'HCTECH'],
	},
	en: {
		'nav.problem': 'The problem',
		'nav.solution': 'GLRV II',
		'nav.benefits': 'Benefits',
		'nav.about': 'HCTECH',
		'nav.contact': 'Contact',
		'rail.0': 'Vapors', 'rail.1': 'GLRV II', 'rail.2': 'Profits', 'rail.3': 'HCTECH',
		'hero.eyebrow': 'Gasoline vapor recovery · Tunisia',
		'hero.title': 'The Green Boost to Your Profits.',
		'hero.lede': 'HCTECH distributes GECO Korea\'s GLRV II in Tunisia — the gasoline vapor recovery unit that turns your storage-tank losses back into fuel, and your emissions into savings.',
		'hero.cta': 'Request a free assessment',
		'hero.scroll': 'Scroll',
		'c0.eyebrow': 'The problem',
		'c0.title': 'Your tanks breathe. Your profits evaporate.',
		'c0.body': 'In a service station, the underground tank "breathes" constantly: with every temperature swing and every fuel delivery, gasoline vapors escape through the tank vent. That is fuel you paid for and will never sell — plus VOC emissions and fire hazards.',
		'c0.s1t': 'Losses', 'c0.s1d': 'Continuous evaporation, day and night',
		'c0.s2t': 'Emissions', 'c0.s2d': 'VOCs released into the atmosphere',
		'c0.s3t': 'Risks', 'c0.s3d': 'Flammability · odors · HSE',
		'c1.eyebrow': 'The solution',
		'c1.title': 'GLRV II, the vapor recovery unit.',
		'c1.body': 'Mounted on the storage-tank vent, the GLRV II captures gasoline vapors before they escape. An activated-carbon bed adsorbs the hydrocarbons, then a vacuum pump desorbs and condenses them: liquid gasoline flows straight back into your tank, ready to be sold again.',
		'c1.s1t': 'Technology', 'c1.s1d': 'Activated-carbon adsorption + vacuum regeneration',
		'c1.s2t': 'Recovered product', 'c1.s2d': 'Liquid gasoline, returned to the tank',
		'c1.s3t': 'Installation', 'c1.s3d': 'On the existing vent — no major works',
		'c2.eyebrow': 'Benefits & ROI',
		'c2.title': 'Every liter recovered is a liter resold.',
		'c2.body': 'The GLRV II turns an invisible loss into a measurable revenue stream: recovered gasoline goes back into stock and pays the investment back, liter after liter. At the same time you cut emissions, improve site safety and stay ahead of environmental regulation.',
		'c2.s1t': 'Profitability', 'c2.s1d': 'Recovered gasoline = additional revenue',
		'c2.s2t': 'Environment', 'c2.s2d': 'Massive reduction of VOC emissions',
		'c2.s3t': 'Safety', 'c2.s3d': 'Fewer flammable vapors around the station',
		'c3.eyebrow': 'Who we are',
		'c3.title': 'HCTECH, your partner in Tunisia.',
		'c3.body': 'HCTECH is the Tunisian distributor of GECO Korea, manufacturer of the GLRV II. We support service-station operators end to end: profitability assessment, installation, commissioning, training and maintenance.',
		'c3.s1t': 'Manufacturer',
		'c3.s2t': 'Distribution', 'c3.s2d': 'HCTECH · Tunisia',
		'c3.s3t': 'Services', 'c3.s3d': 'Assessment · installation · after-sales',
		'contact.title': "Let's talk about your station.",
		'contact.lede': 'Tell us about your setup — number of tanks, volumes, delivery frequency — and we will come back with a first estimate of your recovery potential.',
		'form.name': 'Full name *',
		'form.company': 'Company / Station',
		'form.phone': 'Phone',
		'form.email': 'E-mail *',
		'form.message': 'Message *',
		'form.send': 'Send the request',
		'form.sending': 'Sending…',
		'form.ok': 'Thank you! Your request has been sent. We will get back to you shortly.',
		'form.err': 'Sending failed. Please retry, or contact us directly by phone or e-mail.',
		'form.invalid': 'Please fill in the required fields correctly.',
		'contact.role': 'Managing Director — HCTECH',
		'contact.area': 'Tunisia — service stations & depots',
		'foot.tech': 'GECO Korea technology · GLRV II',
		'fallback.title': 'Your browser does not support WebGPU.',
		'fallback.body': 'The site content remains accessible below, but the background animation requires Chrome, Edge or Safari 26+ on desktop.',
		states: ['Vapors', 'GLRV II', 'Profits', 'HCTECH'],
	},
	ar: {
		'nav.problem': 'المشكلة',
		'nav.solution': 'GLRV II',
		'nav.benefits': 'المزايا',
		'nav.about': 'HCTECH',
		'nav.contact': 'اتصل بنا',
		'rail.0': 'الأبخرة', 'rail.1': 'GLRV II', 'rail.2': 'الأرباح', 'rail.3': 'HCTECH',
		'hero.eyebrow': 'استرجاع أبخرة البنزين · تونس',
		'hero.title': 'The Green Boost to Your Profits.',
		'hero.lede': 'HCTECH توزّع في تونس آلة GLRV II من GECO Korea — وحدة استرجاع أبخرة البنزين التي تحوّل خسائر خزاناتكم إلى وقود مُسترجَع، وانبعاثاتكم إلى مداخيل.',
		'hero.cta': 'اطلب دراسة مجانية',
		'hero.scroll': 'مرّر',
		'c0.eyebrow': 'المشكلة',
		'c0.title': 'خزاناتكم تتنفس… وأرباحكم تتبخر.',
		'c0.body': 'في كل محطة وقود، «يتنفس» الخزان تحت الأرض باستمرار: مع كل تغيّر في درجة الحرارة ومع كل عملية تزويد، تتسرب أبخرة البنزين عبر فتحة تهوية الخزان. إنه وقود دفعتم ثمنه ولن تبيعوه أبداً — فضلاً عن انبعاثات المركبات العضوية المتطايرة ومخاطر الحرائق.',
		'c0.s1t': 'الخسائر', 'c0.s1d': 'تبخّر مستمر ليلاً ونهاراً',
		'c0.s2t': 'الانبعاثات', 'c0.s2d': 'مركبات عضوية متطايرة في الجو',
		'c0.s3t': 'المخاطر', 'c0.s3d': 'قابلية الاشتعال · روائح · السلامة',
		'c1.eyebrow': 'الحل',
		'c1.title': 'GLRV II، وحدة استرجاع الأبخرة.',
		'c1.body': 'تُركَّب GLRV II على فتحة تهوية خزان التخزين فتلتقط أبخرة البنزين قبل تسرّبها. يمتصّ الفحم النشط الهيدروكربونات، ثم تستخلصها مضخة تفريغ وتكثّفها: يعود البنزين السائل مباشرة إلى خزانكم، جاهزاً لإعادة بيعه.',
		'c1.s1t': 'التقنية', 'c1.s1d': 'امتزاز بالفحم النشط + تجديد بالتفريغ',
		'c1.s2t': 'المنتج المسترجَع', 'c1.s2d': 'بنزين سائل يُعاد ضخّه في الخزان',
		'c1.s3t': 'التركيب', 'c1.s3d': 'على فتحة التهوية الموجودة دون أشغال كبرى',
		'c2.eyebrow': 'المزايا والعائد',
		'c2.title': 'كل لتر مُسترجَع هو لتر يُباع من جديد.',
		'c2.body': 'تحوّل GLRV II خسارة غير مرئية إلى مورد قابل للقياس: البنزين المسترجَع يعود إلى المخزون ويسدّد الاستثمار لتراً بعد لتر. وفي الوقت نفسه تخفّضون الانبعاثات وتحسّنون سلامة المحطة وتستبقون التشريعات البيئية.',
		'c2.s1t': 'المردودية', 'c2.s1d': 'البنزين المسترجَع = مداخيل إضافية',
		'c2.s2t': 'البيئة', 'c2.s2d': 'خفض كبير لانبعاثات المركبات المتطايرة',
		'c2.s3t': 'السلامة', 'c2.s3d': 'أبخرة قابلة للاشتعال أقل حول المحطة',
		'c3.eyebrow': 'من نحن',
		'c3.title': 'HCTECH، شريككم في تونس.',
		'c3.body': 'HCTECH هي الموزّع التونسي لشركة GECO Korea، مصنِّعة GLRV II. نرافق مستغلّي محطات الوقود من البداية إلى النهاية: دراسة الجدوى، التركيب، التشغيل، التكوين والصيانة.',
		'c3.s1t': 'المصنِّع',
		'c3.s2t': 'التوزيع', 'c3.s2d': 'HCTECH · تونس',
		'c3.s3t': 'الخدمات', 'c3.s3d': 'دراسة · تركيب · خدمة ما بعد البيع',
		'contact.title': 'لنتحدث عن محطتكم.',
		'contact.lede': 'صفوا لنا منشأتكم — عدد الخزانات، الحجوم، وتيرة التزويد — وسنردّ عليكم بتقدير أولي لإمكانات الاسترجاع.',
		'form.name': 'الاسم الكامل *',
		'form.company': 'الشركة / المحطة',
		'form.phone': 'الهاتف',
		'form.email': 'البريد الإلكتروني *',
		'form.message': 'الرسالة *',
		'form.send': 'أرسل الطلب',
		'form.sending': 'جارٍ الإرسال…',
		'form.ok': 'شكراً! تم إرسال طلبكم بنجاح. سنتواصل معكم قريباً.',
		'form.err': 'فشل الإرسال. أعدوا المحاولة أو اتصلوا بنا مباشرة هاتفياً أو بالبريد.',
		'form.invalid': 'يرجى ملء الحقول الإلزامية بشكل صحيح.',
		'contact.role': 'المدير العام — HCTECH',
		'contact.area': 'تونس — محطات الوقود والمستودعات',
		'foot.tech': 'بتقنية GECO Korea · GLRV II',
		'fallback.title': 'متصفحكم لا يدعم WebGPU.',
		'fallback.body': 'يبقى محتوى الموقع متاحاً أدناه، لكن الرسوم المتحركة تتطلب Chrome أو Edge أو Safari 26+ على الحاسوب.',
		states: ['الأبخرة', 'GLRV II', 'الأرباح', 'HCTECH'],
	},
};

let currentLang = 'fr';
window.__i18nGet = (key) => (STR[currentLang] && STR[currentLang][key]) || STR.fr[key] || key;

function setLang(lang) {
	currentLang = lang;
	const dict = STR[lang] || STR.fr;
	document.documentElement.lang = lang;
	document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

	document.querySelectorAll('[data-i18n]').forEach((el) => {
		const key = el.getAttribute('data-i18n');
		if (dict[key] != null) el.textContent = dict[key];
	});

	// Rename the four field states (HUD + scene labels read these).
	dict.states.forEach((name, i) => { if (STATES[i]) STATES[i].name = name; });

	document.querySelectorAll('.nav__lang button').forEach((b) => {
		b.classList.toggle('is-active', b.dataset.lang === lang);
	});
	try { localStorage.setItem('hctech-lang', lang); } catch {}
	window.dispatchEvent(new CustomEvent('hctech:lang', { detail: { lang } }));
}

document.querySelectorAll('.nav__lang button').forEach((b) => {
	b.addEventListener('click', () => setLang(b.dataset.lang));
});

let initial = 'fr';
try { initial = localStorage.getItem('hctech-lang') || 'fr'; } catch {}
setLang(initial);
