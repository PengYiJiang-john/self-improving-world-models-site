/* Page membership is explicit: supporting research lives on its own page. */
window.RESEARCH_ROUTES = {
  main: {
    file:'index.html', sections:['overview','prediction','perception','manipulation','coordination','rsi','experiments','framework'],
    foundation:['overview','prediction'],
    objects:[{id:'self',section:'perception'},{id:'world',section:'manipulation'},{id:'others',section:'coordination'}],
    crossCutting:['rsi'], supporting:['experiments','framework'],
    parent:null, title:{zh:'研究主线',en:'Research direction'}
  },
  body: {file:'body.html', sections:['body'], parent:'perception', title:{zh:'本体感知',en:'Proprioception'}},
  platonic: {file:'platonic.html', sections:['representation'], parent:'perception', title:{zh:'柏拉图假说与感知融合',en:'Platonic representations and sensory integration'}},
  rsi: {file:'rsi.html', sections:['adaptation','generation','feedback'], parent:'rsi', title:{zh:'RSI：模型选择、更新与扩展',en:'RSI: model selection, learning and expansion'}}
};

// Static hosts may canonicalize body.html to /body or /body/.
window.resolveResearchPage = pathname => {
  const name=pathname.replace(/\/+$/, '').split('/').pop().replace(/\.html$/, '') || 'index';
  return Object.keys(window.RESEARCH_ROUTES).find(key=>window.RESEARCH_ROUTES[key].file.replace(/\.html$/, '')===name) || 'main';
};
