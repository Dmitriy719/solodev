<script>
if(!db.prices)db.prices=[];if(!db.tasks)db.tasks=[];
const OG=go;
go=function(v){
  const R={
    price:()=>'<h2>💵 Прайс</h2>',
    time:()=>'<h2>⏱ Время</h2>',
    growth:()=>'<h2>🎯 Рост</h2>',
    lawyer:()=>'<h2>⚖️ Юрист</h2>',
    plan:()=>'<h2>📅 План</h2>',
    portfolio:()=>'<h2>💼 Портфолио</h2>',
    notes:()=>'<h2>📝 Заметки</h2>',
    analytics:()=>'<h2>📊 Аналитика</h2>'
  };
  if(R[v]){
    document.getElementById('app').innerHTML=R[v]();
    document.getElementById('nav').innerHTML=RN(v);
    return;
  }
  OG(v);
};
const RN=function(a){
  const I=[
    {id:'home',ic:'🏠',l:'Главная'},{id:'clients',ic:'👥',l:'Клиенты'},{id:'projects',ic:'📁',l:'Проекты'},{id:'finances',ic:'💰',l:'Финансы'},{id:'taxes',ic:'🧾',l:'Налоги'},
    {id:'price',ic:'💵',l:'Прайс'},{id:'time',ic:'⏱',l:'Время'},{id:'plan',ic:'📅',l:'План'},{id:'growth',ic:'🎯',l:'Рост'},{id:'lawyer',ic:'⚖️',l:'Юрист'},
    {id:'portfolio',ic:'💼',l:'Портфолио'},{id:'notes',ic:'📝',l:'Заметки'},{id:'analytics',ic:'📊',l:'Аналитика'},{id:'settings',ic:'⚙️',l:'Настройки'}
  ];
  let h='<div class="nav">';
  I.forEach(x=>{
    h+='<button class="nav-btn '+(x.id===a?' active':'')+'" onclick="go(\''+x.id+'\')">'+x.ic+'<br><small>'+x.l+'</small></button>';
  });
  h+='</div>';
  return h;
};
console.log('✅ Patch OK');
</script>