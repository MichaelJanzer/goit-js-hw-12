import{a as f,S as b,i as l}from"./assets/vendor-ee72e1a4.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&n(c)}).observe(document,{childList:!0,subtree:!0});function a(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(e){if(e.ep)return;e.ep=!0;const o=a(e);fetch(e.href,o)}})();function d({query:s="",page:t=1,per_page:a=15}={}){const n=`https://pixabay.com/api/?key=44869216-4addd85d29d39c45ae242764b=${s}&image_type=photo&orientation=horizontal&safesearch=true`;return f.get(n,{params:{query:s,page:t,per_page:a}}).then(({data:e})=>e)}function y(s){return images.map(({webformatURL:t,largeImageURL:a,tags:n,likes:e,views:o,comments:c,downloads:C})=>{}).join("")}const u=document.querySelector(".form"),p=document.querySelector(".gallery"),g=document.querySelector(".loader-wrap"),i=document.querySelector(".load-more-btn"),h=new b(".gallery a",{captionsData:"alt",captionDelay:250}),r={query:"",page:1,per_page:15,max_page:0};u.addEventListener("submit",w);async function w(s){if(s.preventDefault(),p.innerHTML="",r.page=1,r.query=u.elements.query.value.trim(),i.style.display="none",i.removeEventListener("click",m),!r.query){l.warning({title:"Caution",titleColor:"white",titleSize:"16px",message:"Please, fill out the field!",messageColor:"white",messageSize:"16px",position:"topRight",backgroundColor:"rgba(255, 160, 0, 0.6)",close:!1,closeOnClick:!0}),u.reset();return}g.style.display="flex";try{const t=await d(r);t.hits.length===0?l.error({title:"Error",titleColor:"white",titleSize:"16px",message:"Sorry, there are no images matching your search query. Please try again!",messageColor:"white",messageSize:"16px",position:"bottomRight",backgroundColor:"rgba(239, 64, 64, 0.6)",close:!1,closeOnClick:!0}):(r.max_page=Math.ceil(t.totalHits/r.per_page),r.max_page>1?(i.style.display="block",i.addEventListener("click",m)):(i.style.display="none",l.warning({title:"Caution",titleColor:"white",titleSize:"16px",message:"We are sorry, but you have reached the end of search results.",messageColor:"white",messageSize:"16px",position:"bottomCenter",backgroundColor:"rgba(70, 130, 180, 0.8)",close:!1,closeOnClick:!0,timeout:6e3})),p.innerHTML=y(t.hits),h.refresh())}catch(t){l.error({title:"Error",titleColor:"white",titleSize:"16px",message:`Ups... Someting went wrong. Error: ${t}`,messageColor:"white",messageSize:"16px",position:"bottomRight",backgroundColor:"rgba(239, 64, 64, 0.6)",close:!1,closeOnClick:!0})}finally{u.reset(),g.style.display="none"}}async function m(){r.page+=1,g.style.display="flex",i.style.display="none";try{const s=await d(r);p.insertAdjacentHTML("beforeend",y(s.hits)),h.refresh();//! плавний скролл
const a=document.querySelector(".gallery-item").getBoundingClientRect().height;window.scrollBy({top:a*2,behavior:"smooth"})}catch(s){l.error({title:"Error",titleColor:"white",titleSize:"16px",message:`Ups... Someting went wrong. Error: ${s}`,messageColor:"white",messageSize:"16px",position:"bottomRight",backgroundColor:"rgba(239, 64, 64, 0.6)",close:!1,closeOnClick:!0})}finally{g.style.display="none",r.page===r.max_page?(i.style.display="none",i.removeEventListener("click",m),l.warning({title:"Caution",titleColor:"white",titleSize:"16px",message:"We are sorry, but you have reached the end of search results.",messageColor:"white",messageSize:"16px",position:"bottomCenter",backgroundColor:"rgba(70, 130, 180, 0.8)",close:!1,closeOnClick:!0,timeout:6e3})):i.style.display="block"}}
//# sourceMappingURL=commonHelpers.js.map
