const menuButton=document.querySelector('.menu-toggle');const navLinks=document.querySelector('.nav-links');
if(menuButton&&navLinks){menuButton.addEventListener('click',()=>{const isOpen=navLinks.classList.toggle('open');menuButton.setAttribute('aria-expanded',isOpen);menuButton.textContent=isOpen?'×':'☰';});}

const slides=[...document.querySelectorAll('.slide')];const dots=[...document.querySelectorAll('.dot')];const prevButton=document.querySelector('.slider-arrow.prev');const nextButton=document.querySelector('.slider-arrow.next');
let activeIndex=0;

function showSlide(index){
  activeIndex=(index+slides.length)%slides.length;
  slides.forEach((slide,slideIndex)=>slide.classList.toggle('active',slideIndex===activeIndex));
  dots.forEach((dot,dotIndex)=>dot.classList.toggle('active',dotIndex===activeIndex));
}

if(slides.length){
  prevButton?.addEventListener('click',()=>showSlide(activeIndex-1));
  nextButton?.addEventListener('click',()=>showSlide(activeIndex+1));
  dots.forEach((dot)=>dot.addEventListener('click',()=>showSlide(Number(dot.dataset.slide))));
  setInterval(()=>showSlide(activeIndex+1),4000);
}

const whySection=document.querySelector('.why-section');
const whyItems=[...document.querySelectorAll('.why-item')];
if(whySection&&whyItems.length&&'IntersectionObserver' in window&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
  whySection.classList.add('why-motion-ready');
  const whyObserver=new IntersectionObserver((entries,observer)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },{threshold:.15});
  whyItems.forEach((item,index)=>{
    item.style.setProperty('--reveal-delay',`${(index%3)*90}ms`);
    whyObserver.observe(item);
  });
}

const contactForm=document.querySelector('#contact-form');
if(contactForm){contactForm.addEventListener('submit',event=>{event.preventDefault();const note=contactForm.querySelector('.form-note');note.textContent='Thank you. We will be in touch within 1-2 working days.';note.style.color='#7e4131';contactForm.reset();});}