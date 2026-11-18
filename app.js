(() => {
  'use strict';
  const content = window.RESEARCH_CONTENT;
  const $ = selector => document.querySelector(selector);
  const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const math = (tex, display=false) => esc((display ? '\\[' : '\\(') + tex + (display ? '\\]' : '\\)'));
  const t = (zh,en) => lang === 'zh' ? zh : en;
  const params = new URLSearchParams(location.search);
  const saved = () => { try {return localStorage.getItem('research-language');} catch {return null;} };
  let lang = params.get('lang') || saved() || 'zh';
  if (!['zh','en'].includes(lang)) lang = 'zh';
  const routes = window.RESEARCH_ROUTES;
  const pageKey = window.resolveResearchPage(location.pathname);
  const page = routes[pageKey];
  const sections = () => page.sections.map(id=>content[lang].sections.find(s=>s.id===id));
  const owner = id => Object.keys(routes).find(key=>routes[key].sections.includes(id));
  const alias = {scope:'body'};
  function pageHref(key,id){
    const query=new URLSearchParams({lang});
    if(presenting)query.set('present','1');
    return `${routes[key].file}?${query}#${id || routes[key].sections[0]}`;
  }

  const initialId = location.hash.slice(1);
  let chapter = Math.max(0,page.sections.indexOf(alias[initialId] || initialId));
  let presenting = params.get('present') === '1';
  let stage = 0, observer, printOpen = [], manualSelection = false;
  const initialOwner=owner(alias[initialId]||initialId);
  if(initialOwner && initialOwner!==pageKey){location.replace(pageHref(initialOwner,alias[initialId]||initialId));return;}

  const references = [
    {id:'blindloco',name:'Learning Quadrupedal Locomotion over Challenging Terrain · 2020',url:'https://leggedrobotics.github.io/rl-blindloco/',zh:'从本体感知历史学习复杂地形行走：从身体经验建立行动能力的实例。',en:'Learning locomotion over challenging terrain from proprioceptive history: a concrete body-first example.'},
    {id:'supermimic',name:'SuperMimic',url:'https://supermimic.github.io/',zh:'学习可微动力学并训练全身运动策略：身体预测与控制的研究起点。',en:'Learned differentiable dynamics and whole-body motion policies: a starting point for body prediction and control.'},
    {id:'platonic',name:'The Platonic Representation Hypothesis · ICML 2024',url:'https://proceedings.mlr.press/v235/huh24a.html',zh:'跨模型和模态的表征趋同假设，启发兼容物理表征的研究。',en:'Representation convergence across models and modalities motivates the study of compatible physical representations.'},
    {id:'ijepa',name:'I-JEPA · 2023',url:'https://arxiv.org/abs/2301.08243',zh:'从上下文预测目标图像区域的表征。',en:'Predicting target-region representations from image context.'},
    {id:'vjepa',name:'V-JEPA 2 / V-JEPA 2-AC · 2025',url:'https://arxiv.org/abs/2506.09985',zh:'视频表征学习，以及经机器人交互数据后训练的动作条件预测与规划。',en:'Video representation learning, followed by action-conditioned prediction and planning learned from robot interactions.'},
    {id:'imm',name:'Interacting Multiple Model · 1988',url:'https://doi.org/10.1109/9.1299',zh:'混合状态估计、并行滤波、模式概率更新与融合。',en:'Interaction of state estimates, parallel filtering, mode-probability updates and fusion.'},
    {id:'moe',name:'Adaptive Mixtures of Local Experts · 1991',url:'https://www.cs.toronto.edu/~hinton/absps/jjnh91.pdf',zh:'通过学习门控组织专家分工。',en:'Learning a gate that organizes specialized experts.'},
    {id:'berknash',name:'Berk–Nash Equilibrium · Esponda & Pouzo',url:'https://arxiv.org/abs/1411.1152',zh:'策略诱导的数据、主观模型拟合与最优反应之间的关系。',en:'The relationship between policy-induced data, subjective model fitting and best responses.'},
    {id:'dual',name:'Dual Control · Klenske & Hennig, 2016',url:'https://jmlr.org/beta/papers/v17/15-162.html',zh:'将动作的任务收益与未来信息价值纳入决策。',en:'Accounting for both task reward and the future information value of an action.'},
    {id:'gne',name:'Generalized Nash Equilibrium Problems · 2007',url:'https://www.mathematik.uni-wuerzburg.de/fileadmin/10040700/paper/Facchinei_Kanzow_AORP.pdf',zh:'相互依赖的可行集合、共享约束与变分均衡。',en:'Interdependent feasible sets, shared constraints and variational equilibria.'},
    {id:'cbf',name:'Control Barrier Function Based QPs',url:'https://arxiv.org/abs/1609.06408',zh:'通过实时二次规划连接安全集合约束与控制目标。',en:'Connecting safe-set constraints and control objectives through real-time quadratic programs.'}
  ];
  const sourceMap = {overview:['supermimic','vjepa'],body:['supermimic','blindloco'],representation:['platonic','ijepa','vjepa'],prediction:['supermimic','vjepa'],adaptation:['berknash','imm','moe'],feedback:['berknash','dual'],coordination:['gne','cbf']};
  function sources(id){return sourceMap[id] ? `<div class="source-links"><span>${t('相关方法','Related work')}</span>${sourceMap[id].map(key=>{const r=references.find(x=>x.id===key);return `<a href="${r.url}" target="_blank" rel="noopener noreferrer">${esc(r.name)} ↗</a>`;}).join('')}</div>` : '';}
  const prose = entries => entries.map(item=>`<article><h3>${esc(item.heading || item.title)}</h3><p>${esc(item.text)}</p></article>`).join('');
  const bridge = s => s.bridge ? `<div class="bridge"><span>${t('承接下一节','CONNECTION')}</span><p>${esc(s.bridge)}</p></div>` : '';
  const takeaway = s => s.takeaway ? `<div class="takeaway"><span>${t('本章要点','KEY IDEA')}</span><p>${esc(s.takeaway)}</p></div>` : '';
  function technical(s){return s.details.length ? `<details class="technical"><summary>${t('展开技术细节','Technical details')} · ${s.details.map(x=>esc(x.title)).join(' / ')}</summary><div class="technical-body">${prose(s.details)}</div></details>` : '';}
  function extension(s){return s.extension ? `<details class="technical extension"><summary>${esc(s.extension.title)}</summary><div class="technical-body"><article class="extension-intro"><p>${esc(s.extension.lead)}</p></article>${prose(s.extension.details)}</div>${sources(s.id)}</details>` : '';}
  function overview(s) {
    const title=lang==='zh'?esc(s.title).replace('到自主进化','<br>到自主进化'):esc(s.title);
    return `<section id="overview" class="section hero" aria-labelledby="heading-overview"><div class="section-inner"><p class="eyebrow">${esc(s.kicker)} · ${t('预测支持行动','PREDICTION SUPPORTS ACTION')}</p><h1 id="heading-overview" tabindex="-1">${title}</h1><p class="lead">${esc(s.lead)}</p>${window.ResearchDiagrams.render('control',lang)}<div class="overview-explanation">${prose(s.body)}</div>${takeaway(s)}${technical(s)}${bridge(s)}<div class="hero-actions"><a href="#prediction">${t('继续阅读：用预测选择和学习动作','Continue: choosing and learning actions with a model')} →</a></div></div></section>`;
  }
  function branchCard(key,title,description,id){return `<a class="branch-card" href="${pageHref(key,id)}"><span class="branch-card-kind">${t('支线子页','SUPPORTING PAGE')} ↗</span><h3>${esc(title)}</h3><p>${esc(description)}</p><span class="branch-card-action">${t('展开阅读','Read more')} →</span></a>`;}
  function branchLinks(id){
    if(id==='perception')return `<div class="branch-links" aria-label="${t('感知研究子页','Supporting perception pages')}">${branchCard('body',t('本体感知：从身体经验学习行动','Proprioception: learning to act from body experience'),t('从身体状态与动作反馈出发，研究不依赖外部视觉的行动能力。','Start with body state and action feedback to study action without external vision.'))}${branchCard('platonic',t('柏拉图假说：把不同感官接入身体模型','The Platonic hypothesis: connecting senses to the body model'),t('用同一次接触连接视觉、触觉与本体经验，比较轻量接入对预测和控制的帮助。','Connect vision, touch and body experience through the same contact event, and test lightweight integration in prediction and control.'))}</div>`;
    if(id==='rsi')return `<div class="branch-links branch-links-single">${branchCard('rsi',t('RSI：选择、更新与扩展世界模型','RSI: select, update and expand world models'),t('从 Berk–Nash 的信念与证据关系进入多模型，区分模型选择、各模型的快慢更新，以及表达不了的新情况。','From Berk–Nash beliefs and evidence to multiple models: separate model selection, learning within each model, and situations none can express.'))}</div>`;
    return '';
  }
  function pageContext(){
    if(pageKey==='main')return '';
    const parent=content[lang].sections.find(s=>s.id===page.parent);
    return `<div class="page-context"><nav aria-label="${t('页面层级','Page hierarchy')}"><a href="${pageHref('main',page.parent)}">← ${t('研究主线','Research direction')} / ${esc(parent.nav)}</a><span aria-hidden="true">/</span><span>${esc(page.title[lang])}</span></nav><p>${pageKey==='rsi'?t('RSI 贯穿 Self、World、Others。本页展开模型选择、模型自身更新、表达扩展，以及行动怎样提供检验模型的证据。','RSI spans Self, World and Others. This page develops model selection, learning within models, expanding their capacity, and actions that produce evidence.'):t('本页属于 Self 的感知支线，研究身体经验与新感官怎样支持预测和控制。主线继续讨论身体与外部的关系，以及其他智能体。','This page belongs to the perception branch of Self: how body experience and new senses support prediction and control. The main route extends to body–world relations and other agents.')}</p></div>`;
  }
  function pageNavigation(){
    const item=(id,tag,extra='')=>{
      const i=page.sections.indexOf(id), s=sections()[i];
      return `<a class="${extra}" data-chapter="${i}" href="#${id}"><span>${esc(tag)}</span>${esc(s.nav.replace(/^(Self|World|Others|RSI)\s*[:：·]\s*/i,''))}</a>`;
    };
    if(pageKey!=='main')return `<a class="nav-parent" href="${pageHref('main',page.parent)}"><span>←</span>${t('返回研究主线','Back to research direction')}</a>${page.sections.map((id,i)=>item(id,String(i+1).padStart(2,'0'))).join('')}`;
    const objects=page.objects.map(o=>`${item(o.section,o.id[0].toUpperCase()+o.id.slice(1),'nav-object')}${o.id==='self'?`<a class="nav-child" href="${pageHref('body')}"><span>↳</span>${t('本体感知','Proprioception')}</a><a class="nav-child" href="${pageHref('platonic')}"><span>↳</span>${t('柏拉图与感知融合','Platonic hypothesis & senses')}</a>`:''}${(o.methodSections||[]).map(id=>item(id,'↳','nav-child nav-method')).join('')}`).join('');
    return `<p class="nav-group-label">${t('预测与行动','PREDICTION AND ACTION')}</p>${page.foundation.map((id,i)=>item(id,String(i).padStart(2,'0'))).join('')}<p class="nav-group-label">${t('理解对象的扩展','OBJECTS OF UNDERSTANDING')}</p>${objects}<p class="nav-group-label">${t('贯穿三层的学习','LEARNING ACROSS ALL THREE')}</p>${page.crossCutting.map(id=>item(id,'RSI','nav-learning')).join('')}<a class="nav-child" href="${pageHref('rsi')}"><span>↳</span>${t('多模型、更新与反馈','Models, updates and feedback')}</a><p class="nav-group-label">${t('实验与共同框架','EXPERIMENTS & FRAMEWORK')}</p>${page.supporting.map((id,i)=>item(id,String(i+1).padStart(2,'0'))).join('')}`;
  }
  function sectionIdentity(id,i){
    if(pageKey!=='main')return String(i+1).padStart(2,'0');
    const object=page.objects.find(o=>o.section===id);
    if(object)return object.id[0].toUpperCase()+object.id.slice(1);
    if(id==='prediction')return 'Control';
    if(page.crossCutting.includes(id))return 'RSI';
    return '';
  }
  function learningLink(id){
    if(pageKey!=='main')return '';
    const examples={
      perception:t('身体预测也在持续接受运动反馈的检验。','Body predictions are continually tested by movement feedback.'),
      manipulation:t('换一根杆后，实际接触会检验旧预测；新经验用于调整下一次操作。','A different rod tests earlier predictions; the resulting experience informs the next action.'),
      coordination:t('对方的实际响应持续检验交互模型。','The other agent’s actual response continually tests the interaction model.')
    };
    return examples[id]?`<aside class="learning-link"><span>${examples[id]}</span><a href="#rsi">${t('RSI：从反馈继续学习','RSI: learning from feedback')} ↗</a></aside>`:'';
  }
  function bodyFigure(){return `<figure><div class="body-model"><div><small>${t('当前输入','CURRENT INPUT')}</small><strong>${t('身体状态','Body state')} ${math('s_t')} + ${t('动作','action')} ${math('a_t')}</strong><p>${t('关节、姿态与运动历史','Joints, posture and motion history')}</p></div><div><small>${t('身体动力学','BODY DYNAMICS')}</small><strong class="formula">${math(String.raw`\widehat{s}_{t+1\mid t}=f_{\mathrm{body}}(s_t,a_t)`)}</strong><p>${t('预测动作带来的身体变化','Predicting how an action changes the body')}</p></div><div><small>${t('用于控制','CONTROL USE')}</small><strong>${t('评价动作的运动后果','Evaluate motion outcomes')}</strong><p>${t('训练或改进身体控制策略','Train or improve the motion policy')}</p></div></div><figcaption class="figure-caption">${t('身体状态 '+math('s_t')+' 包括关节、姿态与运动信息；'+math('a_t')+' 是施加的控制动作。模型先回答“动作怎样改变我的身体”，这个局部预测就可以支持姿态调节与运动控制。','Body state '+math('s_t')+' includes joints, posture, and motion; '+math('a_t')+' is the applied control action. Predicting how an action changes the body can already support posture regulation and motion control.')}</figcaption></figure>`;}
  function experiments(s){return `<div class="stage-tabs" role="tablist" aria-label="${t('实验组','Experimental studies')}">${s.stages.map((x,i)=>`<button type="button" id="stage-tab-${i}" role="tab" aria-controls="stage-panel" data-stage="${i}" aria-selected="${i===stage}" tabindex="${i===stage?0:-1}"><span>STUDY 0${i+1}</span>${esc(x.name.replace(/^\d+[\s·.—-]*/,''))}</button>`).join('')}</div><div class="stage-detail" id="stage-panel" role="tabpanel" tabindex="0" aria-labelledby="stage-tab-${stage}"></div><div class="stage-print">${s.stages.map(x=>`<article><h3>${esc(x.name)}</h3><p>${esc(x.question)}</p><p>${esc(x.design)}</p><p>${esc(x.readout)}</p><p>${esc(x.next)}</p></article>`).join('')}</div>`;}
  function framework(s){return `<details class="technical framework-formalism"><summary>${t('展开形式化描述：感知、行动与 RSI','Formal description: sensing, action and RSI')}</summary><div class="equations">${s.equations.map(x=>`<article class="equation"><span>${esc(x.label)}</span><div class="formula">${math(x.formula,true)}</div><p>${esc(x.description)}</p></article>`).join('')}</div>${s.symbols ? `<div class="symbol-key"><h3>${t('符号与时间顺序','Notation and timing')}</h3><dl>${s.symbols.map(x=>`<dt>${math(x.symbol)}</dt><dd>${esc(x.meaning)}</dd>`).join('')}</dl></div>` : ''}</details><ol class="research-questions">${s.questions.map((q,i)=>`<li><b>RQ${i+1}</b><span>${esc(q)}</span></li>`).join('')}</ol>`;}
  function bibliography(){return `<details class="references"><summary>${t('方法来源','Method references')} · ${references.length}</summary><ol class="reference-list">${references.map(r=>`<li><a href="${r.url}" target="_blank" rel="noopener noreferrer">${esc(r.name)} ↗</a><p>${esc(r[lang])}</p></li>`).join('')}</ol></details>`;}
  function renderSection(s,i){
    if(s.id==='overview') return overview(s);
    let visual = window.ResearchDiagrams.render(s.id,lang);
    if(s.id==='body') visual = bodyFigure();
    if(s.id==='prediction') visual = window.ResearchDiagrams.render('overview',lang);
    if(s.id==='experiments') visual = experiments(s);
    if(s.id==='framework') visual = framework(s);
    const heading=pageKey!=='main'&&i===0?'h1':'h2';
    return `<section id="${s.id}" class="section ${s.id==='rsi'?'cross-cutting-section':''}" aria-labelledby="heading-${s.id}"><div class="section-inner"><p class="eyebrow">${esc(s.kicker)}</p><div class="chapter-head"><${heading} id="heading-${s.id}" tabindex="-1">${esc(s.title)}</${heading}><span class="chapter-index ${pageKey==='main'?'domain-index':''}">${sectionIdentity(s.id,i)}</span></div><p class="lead">${esc(s.lead)}</p><button type="button" class="presentation-expand" data-expand="${s.id}" aria-expanded="false">${t('展开讲解','Show explanation')}</button><div class="section-body">${prose(s.body)}</div>${visual}${branchLinks(s.id)}${takeaway(s)}${s.extension?'':sources(s.id)}${technical(s)}${extension(s)}${s.id==='framework'?bibliography():''}${learningLink(s.id)}${bridge(s)}</div></section>`;
  }
  function renderStage(){if(!$('#stage-panel'))return;const s=content[lang].sections.find(x=>x.id==='experiments').stages[stage];$('#stage-panel').innerHTML=`<div><p class="eyebrow">STUDY 0${stage+1}</p><h3>${esc(s.name.replace(/^\d+[\s·.—-]*/,''))}</h3><p class="stage-question">${esc(s.question)}</p></div><dl><dt>${t('怎样开展','DESIGN')}</dt><dd>${esc(s.design)}</dd><dt>${t('从中读出什么','READOUT')}</dt><dd>${esc(s.readout)}</dd><dt>${t('与其他问题的联系','CONNECTION TO OTHER QUESTIONS')}</dt><dd>${esc(s.next)}</dd></dl>`;window.renderResearchMath($('#stage-panel'));$('#stage-panel').setAttribute('aria-labelledby',`stage-tab-${stage}`);document.querySelectorAll('[data-stage]').forEach(b=>{const active=Number(b.dataset.stage)===stage;b.setAttribute('aria-selected',String(active));b.tabIndex=active?0:-1;});}
  function syncPageLinks(){
    document.querySelectorAll('a[href]').forEach(a=>{
      const href=a.getAttribute('href');
      if(href.startsWith('#'))return;
      const target=new URL(href,location.href);
      if(target.origin!==location.origin || !Object.values(routes).some(r=>r.file===target.pathname.split('/').pop()))return;
      target.searchParams.set('lang',lang);
      if(presenting)target.searchParams.set('present','1');else target.searchParams.delete('present');
      a.href=target.href;
    });
  }
  function sync(){syncPageLinks();document.body.classList.toggle('presenting',presenting);$('#presentation-controls').hidden=!presenting;$('#present-button').textContent=presenting?t('退出汇报','Exit presentation'):t('汇报模式','Present');$('#present-button').setAttribute('aria-pressed',String(presenting));document.querySelectorAll('.section').forEach((s,i)=>s.classList.toggle('active',i===chapter));document.querySelectorAll('#chapter-nav a[data-chapter]').forEach(a=>a.setAttribute('aria-current',String(Number(a.dataset.chapter)===chapter)));$('#slide-count').textContent=`${String(chapter+1).padStart(2,'0')} / ${sections().length}`;$('#previous').disabled=chapter===0;$('#next').disabled=chapter===sections().length-1;}
  function updateURL(){const query=new URLSearchParams({lang});if(presenting)query.set('present','1');try{history.replaceState(null,'',`${location.pathname}?${query}#${sections()[chapter].id}`);}catch{}}
  function navigate(index,{focus=false,scroll=true}={}){manualSelection=true;chapter=Math.min(sections().length-1,Math.max(0,index));sync();updateURL();const s=sections()[chapter];if(scroll){if(presenting)window.scrollTo({top:0,behavior:'instant'});else document.getElementById(s.id).scrollIntoView({behavior:'instant',block:'start'});}if(focus||presenting)document.getElementById(`heading-${s.id}`).focus({preventScroll:true});$('#live-status').textContent=s.nav;}
  function render(){observer?.disconnect();document.documentElement.lang=lang==='zh'?'zh-CN':'en';document.title=(pageKey==='main'?content[lang].title:page.title[lang])+' | Self / World / Others';document.body.classList.toggle('branch-page',pageKey!=='main');$('.brand').href=pageHref('main','overview');$('meta[name=description]').content=pageKey==='main'?content[lang].subtitle:sections()[0].lead;$('#brand-subtitle').textContent=t('世界模型 · 持续学习 · 智能控制','WORLD MODELS · CONTINUAL LEARNING · CONTROL');$('#contents-label').textContent=pageKey==='main'?t('研究结构 / CONTENTS','RESEARCH STRUCTURE'):page.title[lang];$('#sidebar-note').textContent=t('用预测选择动作。从身体到工具，再到他者；每一次行动都为后续学习提供经验。','Use predictions to choose actions. From the body to tools and other agents, each action provides experience for further learning.');$('#main').innerHTML=pageContext()+sections().map(renderSection).join('');$('#chapter-nav').innerHTML=pageNavigation();document.querySelectorAll('[data-lang]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.lang===lang)));$('#print-button').textContent=t('打印','Print');$('#previous').textContent=t('← 上一章','← Previous');$('#next').textContent=t('下一章 →','Next →');$('#exit-presentation').textContent=t('退出 Esc','Exit Esc');$('#footer').innerHTML=`<span>${t('研究路线 · 2026 年 11 月','Research program · November 2026')}<br>SELF / WORLD / OTHERS</span><a href="${pageKey==='main'?'#overview':pageHref('main',page.parent)}">${t('回到研究主线','Back to research direction')} ↑</a>`;renderStage();window.renderResearchMath($('#main'));sync();observer=new IntersectionObserver(()=>{if(presenting||manualSelection)return;const edge=matchMedia('(max-width:800px)').matches?140:110;const renderedSections=[...document.querySelectorAll('.section')];const visible=renderedSections.filter(s=>s.getBoundingClientRect().top<=edge).at(-1)||renderedSections[0];chapter=sections().findIndex(s=>s.id===visible.id);sync();},{rootMargin:'-100px 0px -50% 0px',threshold:0});document.querySelectorAll('.section').forEach(s=>observer.observe(s));}
  document.addEventListener('click',event=>{const language=event.target.closest('[data-lang]');if(language){const prev=chapter;lang=language.dataset.lang;try{localStorage.setItem('research-language',lang);}catch{}render();navigate(prev,{focus:true});return;}const stageButton=event.target.closest('[data-stage]');if(stageButton){chapter=sections().findIndex(s=>s.id==='experiments');stage=Number(stageButton.dataset.stage);renderStage();sync();return;}const expand=event.target.closest('[data-expand]');if(expand){const section=document.getElementById(expand.dataset.expand);const open=section.classList.toggle('expanded');expand.setAttribute('aria-expanded',String(open));expand.textContent=open?t('收起讲解','Hide explanation'):t('展开讲解','Show explanation');return;}const link=event.target.closest('a[href^="#"]');if(link){const id=link.getAttribute('href').slice(1);const index=sections().findIndex(s=>s.id===id);if(index>=0){event.preventDefault();navigate(index,{focus:true});}}});
  $('#present-button').addEventListener('click',()=>{presenting=!presenting;navigate(chapter,{focus:true});});$('#exit-presentation').addEventListener('click',()=>{presenting=false;navigate(chapter,{focus:true});});$('#previous').addEventListener('click',()=>navigate(chapter-1,{focus:true}));$('#next').addEventListener('click',()=>navigate(chapter+1,{focus:true}));$('#print-button').addEventListener('click',()=>window.print());
  document.addEventListener('keydown',event=>{if(event.altKey||event.ctrlKey||event.metaKey||event.target.closest('input,textarea,select,[contenteditable=true]'))return;const tab=event.target.closest('[data-stage]');if(tab&&['ArrowLeft','ArrowRight','Home','End'].includes(event.key)){event.preventDefault();stage=event.key==='Home'?0:event.key==='End'?5:(stage+(event.key==='ArrowRight'?1:5))%6;renderStage();$(`#stage-tab-${stage}`).focus();return;}if(event.key==='Escape'&&presenting){event.preventDefault();presenting=false;navigate(chapter,{focus:true});return;}if(event.key.toLowerCase()==='p'&&!event.target.closest('button,a,summary')){event.preventDefault();presenting=!presenting;navigate(chapter,{focus:true});return;}if(!presenting||event.target.closest('button,a,summary'))return;if(['ArrowLeft','ArrowRight','PageUp','PageDown','Home','End'].includes(event.key)){event.preventDefault();navigate(event.key==='Home'?0:event.key==='End'?sections().length-1:chapter+(['ArrowRight','PageDown'].includes(event.key)?1:-1),{focus:true});}});
  // Keep an explicitly chosen chapter stable through font/layout changes.
  for(const event of ['wheel','touchmove']) window.addEventListener(event,()=>{manualSelection=false;},{passive:true});
  window.addEventListener('pointerdown',event=>{if(event.button===1||event.clientX>=document.documentElement.clientWidth-18)manualSelection=false;});
  window.addEventListener('keydown',event=>{if(!presenting&&['ArrowUp','ArrowDown','PageUp','PageDown','Home','End',' '].includes(event.key))manualSelection=false;});
  window.addEventListener('hashchange',()=>{const raw=location.hash.slice(1);const id=alias[raw]||raw;const key=owner(id);if(key&&key!==pageKey){location.replace(pageHref(key,id));return;}const index=sections().findIndex(s=>s.id===id);if(index>=0)navigate(index,{focus:true});});
  window.addEventListener('beforeprint',()=>{printOpen=[...document.querySelectorAll('details')].map(d=>[d,d.open]);printOpen.forEach(([d])=>d.open=true);});window.addEventListener('afterprint',()=>{printOpen.forEach(([d,open])=>d.open=open);});
  render();if(presenting||location.hash)navigate(chapter,{focus:presenting,scroll:presenting||pageKey==='main'||chapter>0});
})();
