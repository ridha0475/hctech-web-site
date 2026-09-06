/**
 * Entry point: boot the renderer, hand it the scroll, keep the chrome honest.
 */

import { createStage } from './scene/stage.js';
import { createScroll } from './site/scroll.js';
import { STATES } from './scene/palette.js';

const boot = document.getElementById( 'boot' );
const bootNote = document.querySelector( '[data-boot-note]' );
const fallback = document.getElementById( 'fallback' );
const canvas = document.getElementById( 'stage' );

const progressBar = document.querySelector( '[data-progress]' );
const railItems = Array.from( document.querySelectorAll( '[data-rail]' ) );
const hudFps = document.querySelector( '[data-hud="fps"]' );
const hudCount = document.querySelector( '[data-hud="count"]' );
const hudState = document.querySelector( '[data-hud="state"]' );
const countText = Array.from( document.querySelectorAll( '[data-count-text]' ) );

const reducedMotion = window.matchMedia( '(prefers-reduced-motion: reduce)' ).matches;

function fail( reason ) {
	// No WebGPU: dismiss the boot screen and show the site statically —
	// the content matters more than the background scene.
	boot.classList.add( 'is-done' );
	document.body.classList.add( 'is-live', 'no-webgpu' );
	console.error( '[field]', reason );
}

async function start() {

	/* Le contenu ne dépend plus de la scène. On met en place le défilement et
	   on lance la chorégraphie du texte tout de suite : sinon, le voile levé
	   par le script en tête de page montrerait un hero déjà lisible que
	   `gsap.from()` masquerait ensuite pour le réanimer — un clignotement.
	   Mesuré le 2026-09-06 sur Safari iOS : jusqu'à 3,9 s d'écran noir avant. */
	const scroll = createScroll( { reducedMotion } );
	const drive = scroll.drive;
	scroll.begin();

	if ( ! navigator.gpu ) {
		fail( 'navigator.gpu is undefined' );
		return;
	}

	let stage;
	try {
		bootNote.textContent = window.__i18nGet?.('boot.request') || 'requesting adapter';
		stage = await createStage( canvas, { reducedMotion } );
	} catch ( error ) {
		fail( error && error.message ? error.message : error );
		return;
	}

	/* first frame: this is where the pipelines actually get built --------- */
	bootNote.textContent = window.__i18nGet?.('boot.compile') || 'compiling pipelines';
	await new Promise( ( r ) => requestAnimationFrame( r ) );
	stage.frame( 1 / 60, drive );
	await new Promise( ( r ) => requestAnimationFrame( r ) );
	stage.frame( 1 / 60, drive );

	/* `is-scene` dit au script en tête de page que la scène est arrivée ; on
	   retire `no-webgpu` qu'un délai de sécurité expiré aurait pu poser, sinon
	   le canvas resterait masqué alors que le rendu fonctionne. */
	document.body.classList.add( 'is-live', 'is-scene' );
	document.body.classList.remove( 'no-webgpu' );
	boot.classList.add( 'is-done' );

	/* --- chrome ---------------------------------------------------------- */

	let shownCount = - 1;
	let activeState = - 1;
	let fps = 60;

	function chrome( dt ) {
		fps += ( 1 / Math.max( dt, 0.0001 ) - fps ) * 0.06;

		if ( progressBar ) progressBar.style.width = ( drive.travel * 100 ).toFixed( 2 ) + '%';

		const near = stage.palette.index;
		if ( near !== activeState ) {
			activeState = near;
			railItems.forEach( ( li, i ) => li.classList.toggle( 'is-active', i === near ) );
			document.documentElement.style.setProperty( '--accent', STATES[ near ].accent );
			if ( hudState ) hudState.textContent = STATES[ near ].name;
		}

		if ( stage.instanceCount !== shownCount ) {
			shownCount = stage.instanceCount;
			const pretty = shownCount.toLocaleString( 'en-US' );
			countText.forEach( ( el ) => { el.textContent = pretty; } );
			if ( hudCount ) hudCount.textContent = pretty;
		}

		if ( hudFps ) hudFps.textContent = Math.round( fps ) + ' fps';
	}

	/* --- loop ------------------------------------------------------------ */

	let last = performance.now();
	window.gsap.ticker.add( () => {
		const now = performance.now();
		const dt = Math.min( ( now - last ) / 1000, 0.1 );
		last = now;

		stage.frame( dt, drive );
		chrome( dt );
	} );

	/* --- input ----------------------------------------------------------- */

	window.addEventListener( 'pointermove', ( e ) => {
		if ( e.pointerType === 'touch' ) return;
		stage.setPointer(
			( e.clientX / window.innerWidth ) * 2 - 1,
			( e.clientY / window.innerHeight ) * 2 - 1
		);
	}, { passive: true } );

	// handle for the console and for the screenshot harness
	window.FIELD = { stage, scroll, drive };

	let resizeTimer = 0;
	window.addEventListener( 'resize', () => {
		stage.resize();
		clearTimeout( resizeTimer );
		resizeTimer = setTimeout( () => scroll.refresh(), 180 );
	} );
}

if ( document.readyState === 'loading' ) {
	window.addEventListener( 'DOMContentLoaded', start, { once: true } );
} else {
	start();
}
