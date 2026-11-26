/**
 * Single entry point for the view layer.
 * Screens are written as htm tagged templates on top of Preact, so there is no JSX build step.
 */
export { html, render } from 'htm/preact';
export { useState, useEffect, useRef, useLayoutEffect } from 'preact/hooks';
