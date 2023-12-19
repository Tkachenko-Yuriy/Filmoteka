import { refs } from './refs';

export default function addScroll() {
    refs.anchor.addEventListener('click', function(e) {
      e.preventDefault();
    
      const target = document.querySelector(refs.anchor.getAttribute('href'));
    
      target.scrollIntoView({ behavior: 'smooth' });
    });
}
