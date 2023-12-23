// // util.js
// var util = {
//     mobileMenu() {
//       document.getElementById("nav").classList.toggle("nav-visible");
//     },
//     windowResize() {
//       if (window.innerWidth > 800) {
//         document.getElementById("nav").classList.remove("nav-visible");
//       }
//     },
//     scrollEvent() {
//       var scrollPosition = window.scrollY;
      
//       util.scrollMenuIds.forEach(function(link) {
//         var containerId = link.getAttribute("href");
//         var container = document.querySelector(containerId);
        
//         if (container) {
//           var containerOffset = container.offsetTop;
//           var containerHeight = container.offsetHeight;
//           var containerBottom = containerOffset + containerHeight;
  
//           if (scrollPosition < containerBottom - 20 && scrollPosition >= containerOffset - 20) {
//             link.classList.add("active");
//           } else {
//             link.classList.remove("active");
//           }
//         }
//       });
//     }
//   };
  
//   document.addEventListener("DOMContentLoaded", function() {
//     util.scrollMenuIds = Array.from(document.querySelectorAll('a.nav-link[href]'));
//     document.getElementById("menu").addEventListener("click", util.mobileMenu);
//     window.addEventListener("resize", util.windowResize);
//     document.addEventListener("scroll", util.scrollEvent);
//   });
  