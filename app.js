'use strict';
// Demo catalog: images supplied by the owner; commercial data is illustrative.
const products = [
  {id:'saudi',name:'بن عسير — القهوة السعودية',category:'saudi',image:'coffee-200',price:38,size:'200 جم',badge:'مذاق الضيافة',note:'تحميص فاتح · للقهوة السعودية',description:'اختيار لجلسة الضيافة وفنجان القهوة السعودية. عبوة بهوية بن عسير، لتبدأ بها طقوسك على مهل.',weights:[['200 جم',38],['500 جم',85]],grinds:true,gallery:'product-pair'},
  {id:'premium',name:'بن عسير — بريميوم',category:'specialty',image:'coffee-1000',price:145,size:'1 كجم',badge:'عبوة المشاركة',note:'حبوب قهوة · عبوة كبيرة',description:'عبوة البن الكبيرة للمشاركة والجلسات الطويلة. اختر طريقة الطحن التي تناسب تحضيرك اليومي.',weights:[['1 كجم',145],['500 جم',78]],grinds:true,gallery:'product-bag'},
  {id:'jar',name:'قهوة عسير — عبوة زجاجية',category:'specialty',image:'coffee-jars',price:52,size:'150 جم',badge:'من دليل الهوية',note:'قهوتك اليومية · عبوة أنيقة',description:'قهوة بعبوة زجاجية تحمل هوية بن عسير. صورة العبوة مستخرجة من دليل الهوية، ومواصفاتها في هذه النسخة توضيحية.',weights:[['150 جم',52]],grinds:false},
  {id:'sticks',name:'أظرف القهوة الفردية',category:'saudi',image:'coffee-sticks',price:35,size:'10 أظرف',badge:'رفيق يومك',note:'حصص فردية · سهلة الحمل',description:'أظرف فردية للحظات القهوة السريعة. نموذج منتج مستوحى من تطبيقات العبوة في دليل الهوية.',weights:[['10 أظرف',35],['20 ظرفًا',65]],grinds:false},
  {id:'green',name:'بن عسير الأخضر',category:'green',image:'coffee-200',price:58,size:'500 جم',badge:'للتجربة والتحميص',note:'بن غير محمّص · عبوة توضيحية',description:'نموذج لبن أخضر لمن يحب اكتشاف رحلة التحميص. صورة العبوة مستخدمة لتمثيل المنتج تجريبيًا؛ ليست صورة عبوة نهائية للبن الأخضر.',weights:[['500 جم',58],['1 كجم',105]],grinds:false},
  {id:'tin',name:'علبة قهوة بن عسير',category:'specialty',image:'coffee-tin',price:65,size:'250 جم',badge:'من دليل الهوية',note:'عبوة أسطوانية · للقهوة',description:'تصميم العبوة الأسطوانية من تطبيقات الهوية. قطعة جميلة لركن القهوة، بأسماء وسعة وأسعار توضيحية.',weights:[['250 جم',65]],grinds:true},
  {id:'mug',name:'كوب بن عسير',category:'accessories',image:'cup',price:29,size:'قطعة واحدة',badge:'لركن القهوة',note:'كوب بهوية بن عسير',description:'كوب أبيض بشعار جمعية البن بمنطقة عسير. صورة حقيقية من تطبيقات دليل الهوية، لتكتمل بها تجربة المتجر.',weights:[['قطعة واحدة',29]],grinds:false},
  {id:'cupset',name:'مجموعة أكواب عسير',category:'accessories',image:'cups',price:79,size:'3 أكواب',badge:'للمشاركة',note:'مجموعة ألوان · هدية لطيفة',description:'مجموعة أكواب ملوّنة تحمل هوية الجمعية. نموذج توضيحي لباقة ضيافة وإهداء مستوحاة من ملف الهوية.',weights:[['3 أكواب',79]],grinds:false},
];
const $ = (s,root=document)=>root.querySelector(s);
const $$ = (s,root=document)=>[...root.querySelectorAll(s)];
const money=n=>new Intl.NumberFormat('ar-SA',{maximumFractionDigits:0}).format(n);
const safe=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const icon=id=>`<svg aria-hidden="true"><use href="#i-${id}"/></svg>`;
const price=n=>`<span class="price">${money(n)}<small>ر.س</small></span>`;
let category='all', query='', sorting='featured', cart=[],toastTimer;
const grinds=['حبوب كاملة','طحن فلتر','طحن قهوة سعودية'];
try{const saved=JSON.parse(localStorage.getItem('asir-cart-v1')||'[]');if(Array.isArray(saved))cart=saved.filter(r=>{const p=products.find(p=>p.id===r.id);return p&&Number.isInteger(r.variant)&&p.weights[r.variant]&&Number.isInteger(r.qty)&&r.qty>0&&r.qty<=20&&((p.grinds&&grinds.includes(r.grind))||(!p.grinds&&r.grind==='بدون طحن'));}).map(r=>({id:r.id,variant:r.variant,grind:r.grind,qty:r.qty}));}catch{}
function persist(){try{localStorage.setItem('asir-cart-v1',JSON.stringify(cart));}catch{}updateCount();}
function updateCount(){const n=cart.reduce((s,r)=>s+r.qty,0);$('#cart-count').textContent=money(n);$('#cart-toggle').setAttribute('aria-label',`فتح سلة التسوق، ${n} منتج`);}
function notify(message){clearTimeout(toastTimer);$('#toast').textContent=message;$('#toast').classList.add('visible');toastTimer=setTimeout(()=>$('#toast').classList.remove('visible'),2800);}
function openDialog(id){const dialog=$(id);if(!dialog.open)dialog.showModal();}
function closeDialog(dialog){dialog.close();}
$$('dialog').forEach(dialog=>{dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeDialog(dialog);}});});
$$('[data-close]').forEach(b=>b.addEventListener('click',()=>closeDialog(b.closest('dialog'))));
function renderProducts(){
 let list=products.filter(p=>(category==='all'||p.category===category)&&(`${p.name} ${p.note} ${p.description}`.includes(query)));
 if(sorting==='low')list.sort((a,b)=>a.price-b.price);if(sorting==='high')list.sort((a,b)=>b.price-a.price);
 $('#result-count').textContent=`${money(list.length)} منتجات${query?' · نتائج البحث عن «'+query+'»':''}`;
 $('#clear-search').hidden=!query&&category==='all';
 $('#product-grid').innerHTML=list.length?list.map(p=>`<article class="product-card"><div class="product-visual"><button class="product-open" data-product="${p.id}" aria-label="عرض ${p.name}"><img src="assets/${p.image}.webp" alt="${p.name}" width="300" height="300" loading="lazy"></button><span class="product-badge">${p.badge}</span><button class="quick-add" data-add="${p.id}" aria-label="أضف ${p.name} للسلة">${icon('plus')}</button></div><p class="product-meta">${p.note}</p><h3 class="product-title"><button data-product="${p.id}">${p.name}</button></h3><div class="product-bottom">${price(p.price)}<span class="weight">${p.size}</span></div></article>`).join(''):`<div class="empty"><h3>لم نجد هذا المذاق بعد</h3><p>جرّب كلمة أخرى، أو استكشف جميع المنتجات.</p><button class="button" data-reset>عرض كل المنتجات</button></div>`;
 $$('[data-filter]').forEach(b=>{const selected=b.dataset.filter===category;b.classList.toggle('selected',selected);b.setAttribute('aria-pressed',selected);});
}
function filter(value,scroll=false){category=value;query='';$('#search').value='';renderProducts();if(scroll)$('#products').scrollIntoView({behavior:'auto'});}
function productDetail(id){const p=products.find(p=>p.id===id);if(!p)return;
 $('#product-detail').innerHTML=`<div class="detail-layout"><div class="detail-photo"><img id="detail-photo-main" src="assets/${p.image}.webp" alt="${p.name}">${p.gallery?`<div class="photo-options"><button data-photo="${p.image}" aria-label="عرض صورة المنتج المعزولة"><img src="assets/${p.image}.webp" alt="صورة المنتج"></button><button data-photo="${p.gallery}" aria-label="عرض الصورة الأصلية المرفقة"><img src="assets/${p.gallery}.webp" alt="الصورة الأصلية المرفقة"></button></div>`:''}</div><div class="detail-copy"><p>${p.note}</p><h2 id="detail-title">${p.name}</h2><div id="detail-price">${price(p.price)}</div><p>${p.description}</p><label for="variant">${p.category==='accessories'?'المجموعة':'حجم العبوة'}</label><select id="variant">${p.weights.map((w,i)=>`<option value="${i}">${w[0]} — ${money(w[1])} ر.س</option>`).join('')}</select>${p.grinds?`<label for="grind">درجة الطحن</label><select id="grind">${grinds.map(g=>`<option>${g}</option>`).join('')}</select>`:''}<button class="button" id="detail-add">${icon('bag')} أضف للسلة</button><p class="detail-demo">منتج تجريبي؛ الأسعار والمواصفات للتوضيح.</p></div></div>`;
 $('#variant').addEventListener('change',()=>$('#detail-price').innerHTML=price(p.weights[+$('#variant').value][1]));
 $('#detail-add').addEventListener('click',()=>{addItem(p.id,+$('#variant').value,$('#grind')?.value||'بدون طحن');$('#product-dialog').close();});
 openDialog('#product-dialog');
}
function addItem(id,variant=0,grind){const p=products.find(p=>p.id===id);if(!p)return;grind=grind||(p.grinds?'حبوب كاملة':'بدون طحن');const row=cart.find(r=>r.id===id&&r.variant===variant&&r.grind===grind);if(row){if(row.qty>=20){notify('الحد التجريبي ٢٠ قطعة من كل اختيار');return;}row.qty++;}else cart.push({id,variant,grind,qty:1});persist();notify('أُضيف المنتج إلى سلة مزاجك');}
function total(){return cart.reduce((s,r)=>s+products.find(p=>p.id===r.id).weights[r.variant][1]*r.qty,0);}
function renderCart(){
 if(!cart.length){$('#cart-content').innerHTML=`<div class="empty">${icon('bag')}<h3>السلة تنتظر قهوتك</h3><p>اختر أول فنجان في حكايتك مع عسير.</p><button class="button" id="continue-shopping">استكشف المنتجات</button></div>`;$('#continue-shopping').onclick=()=>{$('#cart-dialog').close();$('#products').scrollIntoView({behavior:'auto'});};return;}
 $('#cart-content').innerHTML=cart.map((r,i)=>{const p=products.find(p=>p.id===r.id);return `<div class="cart-row"><img src="assets/${p.image}.webp" alt="${p.name}"><div><h3>${p.name}</h3><p>${p.weights[r.variant][0]}${p.grinds?' · '+r.grind:''}</p>${price(p.weights[r.variant][1]*r.qty)}<div class="row-bottom"><div class="quantity"><button data-qty="${i}" data-delta="-1" aria-label="تقليل كمية ${p.name}">−</button><span>${money(r.qty)}</span><button data-qty="${i}" data-delta="1" aria-label="زيادة كمية ${p.name}" ${r.qty>=20?'disabled':''}>+</button></div><button class="text-button remove" data-remove="${i}" aria-label="حذف ${p.name}">حذف</button></div></div></div>`;}).join('')+`<div class="cart-summary"><div class="total-line"><span>المجموع</span>${price(total())}</div><div class="total-line"><span>الشحن التجريبي</span><span>بدون تكلفة</span></div><button class="button" id="checkout-start">إكمال الطلب التجريبي ${icon('arrow')}</button><p>لن يتم تحصيل أي مبالغ. لا توجد عمليات دفع أو شحن فعلية.</p></div>`;
 $('#checkout-start').onclick=startCheckout;
}
function startCheckout(){if(!cart.length)return;$('#cart-dialog').close();$('#checkout-content').innerHTML=`<h2 id="checkout-title">آخر خطوة لفنجانك</h2><p>جرّب إتمام الطلب ببيانات توضيحية. لا تُرسل هذه البيانات أو تُحفظ، ولا تحتاج لإدخال معلومات دفع.</p><form class="checkout-form" id="checkout-form"><label for="customer-name">الاسم التوضيحي</label><input id="customer-name" name="name" required minlength="2" maxlength="60" placeholder="مثال: ضيف عسير" autocomplete="off"><label for="city">المدينة</label><select id="city" required><option value="">اختر المدينة</option><option>أبها</option><option>خميس مشيط</option><option>الرياض</option><option>جدة</option><option>الدمام</option><option>مدينة أخرى</option></select><div class="total-line"><span>إجمالي الطلب التجريبي</span>${price(total())}</div><button class="button" type="submit">تأكيد الطلب التجريبي ${icon('check')}</button></form>`;
 $('#checkout-form').onsubmit=e=>{e.preventDefault();if(!$('#customer-name').value.trim()){ $('#customer-name').setCustomValidity('اكتب اسمًا توضيحيًا من حرفين على الأقل');$('#customer-name').reportValidity();return;}const amount=total(),count=cart.reduce((n,r)=>n+r.qty,0),receipt='ASR-'+Date.now().toString().slice(-6);cart=[];persist();$('#checkout-content').innerHTML=`<div class="success-icon">${icon('check')}</div><h2 id="checkout-title">اكتملت التجربة، بالعافية!</h2><p>تم إنشاء نموذج الطلب بنجاح. هذا تأكيد تجريبي فقط؛ لم تُرسل بياناتك ولم يتم خصم أي مبلغ.</p><div class="receipt"><div class="total-line"><span>رقم التجربة</span><strong dir="ltr">${receipt}</strong></div><div class="total-line"><span>عدد القطع</span><strong>${money(count)}</strong></div><div class="total-line"><span>الإجمالي التوضيحي</span>${price(amount)}</div></div><button class="button" id="finish-shopping">العودة للمتجر</button>`;$('#finish-shopping').onclick=()=>$('#checkout-dialog').close();$('#finish-shopping').focus();};
 $('#customer-name').oninput=()=>$('#customer-name').setCustomValidity('');openDialog('#checkout-dialog');
}
document.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;
 if(b.dataset.photo)$('#detail-photo-main').src=`assets/${b.dataset.photo}.webp`;
 if(b.dataset.product)productDetail(b.dataset.product);
 if(b.dataset.add)addItem(b.dataset.add);
 if(b.dataset.category)filter(b.dataset.category,true);
 if(b.dataset.filter)filter(b.dataset.filter);
 if(b.hasAttribute('data-reset'))filter('all');
 if(b.hasAttribute('data-show-accessories'))filter('accessories',true);
 if(b.dataset.qty!==undefined){const i=+b.dataset.qty,delta=b.dataset.delta;cart[i].qty+=+delta;if(cart[i].qty<1)cart.splice(i,1);persist();renderCart();const next=$(`[data-qty="${Math.min(i,cart.length-1)}"][data-delta="${delta}"]`);(next&&!next.disabled?next:$('#continue-shopping')||$('#checkout-start'))?.focus();}
 if(b.dataset.remove!==undefined){const i=+b.dataset.remove;cart.splice(i,1);persist();renderCart();($(`[data-remove="${Math.min(i,cart.length-1)}"]`)||$('#continue-shopping'))?.focus();}
 if(b.dataset.policy){const privacy=b.dataset.policy==='privacy';$('#info-content').innerHTML=`<h2 id="info-title">${privacy?'الخصوصية في النسخة التجريبية':'الشحن والاستبدال'}</h2><p>${privacy?'تُحفظ اختيارات السلة فقط على جهازك باستخدام تخزين المتصفح. نموذج الطلب لا يرسل الاسم أو المدينة ولا يحتفظ بهما. لا توجد أدوات تتبع أو خدمات دفع في هذا النموذج. يستضيف GitHub Pages الملفات الثابتة ويطبق سياسة الخصوصية الخاصة به على طلبات الاستضافة.':'المتجر نموذج تجريبي، ولا ينفّذ شحنًا أو بيعًا فعليًا. لا تنطبق عليه رسوم شحن أو سياسة إرجاع تجارية. يجب اعتماد سياسات البيع والشحن والاستبدال قبل تحويله إلى متجر فعلي.'}</p>`;openDialog('#info-dialog');}
});
$('#cart-toggle').onclick=()=>{renderCart();openDialog('#cart-dialog');};
$('#sort').onchange=e=>{sorting=e.target.value;renderProducts();};
$('#clear-search').onclick=()=>filter('all');
$('#search-toggle').onclick=()=>{const panel=$('#search-panel');panel.hidden=!panel.hidden;if(!panel.hidden)$('#search').focus();};
function search(){query=$('#search').value.trim();category='all';renderProducts();$('#products').scrollIntoView({behavior:'auto'});}
$('#search-go').onclick=search;$('#search').addEventListener('keydown',e=>{if(e.key==='Enter')search();});
$('#menu-toggle').onclick=()=>{const menu=$('#mobile-nav');menu.hidden=!menu.hidden;$('#menu-toggle').setAttribute('aria-expanded',!menu.hidden);};
$$('#mobile-nav a').forEach(a=>a.onclick=()=>{$('#mobile-nav').hidden=true;$('#menu-toggle').setAttribute('aria-expanded','false');});
$('#wholesale-button').onclick=()=>{$('#info-content').innerHTML=`<h2 id="info-title">باقة الضيافة</h2><p>باقة تجريبية تجمع عبوة بن عسير بريميوم (١ كجم) مع مجموعة أكواب عسير (٣ أكواب).</p><div class="receipt"><div class="total-line"><span>إجمالي الباقة</span>${price(224)}</div></div><p>هذه باقة توضيحية. لا يوجد عرض تجاري أو طلب جملة فعلي.</p><button class="button" id="bundle-add">أضف الباقة للسلة ${icon('bag')}</button>`;$('#bundle-add').onclick=()=>{addItem('premium');addItem('cupset');$('#info-dialog').close();renderCart();openDialog('#cart-dialog');};openDialog('#info-dialog');};
updateCount();renderProducts();
