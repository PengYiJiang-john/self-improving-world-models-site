/* KaTeX and fonts are bundled locally; no CDN is needed by the published page. */
(() => {
  'use strict';
  window.RESEARCH_MATH_ERRORS = [];
  window.renderResearchMath = root => {
    window.renderMathInElement(root, {
      delimiters: [
        {left: '\\[', right: '\\]', display: true},
        {left: '\\(', right: '\\)', display: false}
      ],
      ignoredClasses: ['katex'],
      throwOnError: true,
      strict: 'error',
      trust: false,
      output: 'htmlAndMathml',
      errorCallback: (message, error) => {
        window.RESEARCH_MATH_ERRORS.push(message);
        console.error(message, error);
      }
    });
  };
})();
