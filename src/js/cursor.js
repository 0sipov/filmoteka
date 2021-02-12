const mouseCursor = document.getElementById('cursor');
// const body = document.body;
mouseCursor.classList.remove('cursor');
mouseCursor.classList.add('cursor-n');
body.classList.remove('cursor-none');

let navLinks = document.querySelectorAll('a');
let button = document.querySelectorAll('button');
const body = document.querySelector('body');

window.addEventListener('mousemove', cursor);

function cursor(e) {
  mouseCursor.style.top = e.pageY + 'px';
  mouseCursor.style.left = e.pageX + 'px';
}

navLinks.forEach(link => {
  link.addEventListener('mouseleave', () => {
    mouseCursor.classList.remove('cursor');
    mouseCursor.classList.add('cursor-n');
    body.classList.remove('cursor-none');
  });
  link.addEventListener('mouseover', () => {
    mouseCursor.classList.add('cursor');
    mouseCursor.classList.remove('cursor-n');
    body.classList.add('cursor-none');
  });
});
button.forEach(button => {
  button.addEventListener('mouseleave', () => {
    mouseCursor.classList.remove('cursor');
    mouseCursor.classList.add('cursor-n');
    body.classList.remove('cursor-none');
  });
  button.addEventListener('mouseover', () => {
    mouseCursor.classList.add('cursor');
    mouseCursor.classList.remove('cursor-n');
    body.classList.add('cursor-none');
  });
});

// const cursorHandler = {
//   currentElem: null,
//   // mouseCursor: document.getElementById('cursor'),
//   // body: document.body,

//   onmouseover: function (event) {
//     let target = event.target.closest('button');
//     if (!target) return;
//     if (!body.contains(target)) return;
//     this.currentElem = target;
//     mouseCursor.classList.add('cursor');
//     mouseCursor.classList.remove('cursor-n');
//     body.classList.add('cursor-none');;
//   },

//   onmouseout: function (event) {
//     if (!this.currentElem) return;
//     let relatedTarget = event.relatedTarget;
//     while (relatedTarget) {
//       if (relatedTarget == !this.currentElem) return;
//       relatedTarget = relatedTarget.parentNode;
//     };

//     mouseCursor.classList.remove('cursor');
//     mouseCursor.classList.add('cursor-n');
//     body.classList.remove('cursor-none');
//     this.currentElem = null;
//   }
// };

// body.addEventListener('mouseover', cursorHandler.onmouseover);
// body.addEventListener('mouseout', cursorHandler.onmouseout);
