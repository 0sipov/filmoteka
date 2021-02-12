function removePreloader() {
    document.querySelector('.loader').classList.add('is-hidden');
};

function addPreloader() {
    document.querySelector('.loader').classList.remove('is-hidden');
};

// preloader on start page
// window.onload = function () {
//   addPreloader();
//   window.setTimeout(function () {
//     addPreloader();
//     removePreloader();
//   }, 500);
// };