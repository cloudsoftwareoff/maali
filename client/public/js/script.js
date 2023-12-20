// document.querySelectorAll('.input-cart-number').forEach(function(input) {
//     input.addEventListener('keyup', function() {
//       var t = this;
  
//       if (t.value.length > 3) {
//         t.nextElementSibling.focus();
//       }
  
//       var cardNumber = '';
//       document.querySelectorAll('.input-cart-number').forEach(function(input) {
//         cardNumber += input.value + ' ';
//         if (input.value.length === 16) {
//           input.nextElementSibling.focus();
//         }
//       });
  
//       document.querySelector('.credit-card-box .number').innerHTML = cardNumber;
//     });
//   });
  
//   document.getElementById('card-holder').addEventListener('keyup', function() {
//     var t = this;
//     document.querySelector('.credit-card-box .card-holder div').innerHTML = t.value;
//   });
  
//   document.getElementById('card-expiration-month').addEventListener('change', function() {
//     var m = document.getElementById('card-expiration-month').selectedIndex;
//     m = (m < 10) ? '0' + m : m;
//     var y = document.getElementById('card-expiration-year').value.substr(2, 2);
//     document.querySelector('.card-expiration-date div').innerHTML = m + '/' + y;
//   });
  
//   document.getElementById('card-expiration-year').addEventListener('change', function() {
//     var m = document.getElementById('card-expiration-month').selectedIndex;
//     m = (m < 10) ? '0' + m : m;
//     var y = this.value.substr(2, 2);
//     document.querySelector('.card-expiration-date div').innerHTML = m + '/' + y;
//   });
  
//   document.getElementById('card-cvv').addEventListener('focus', function() {
//     document.querySelector('.credit-card-box').classList.add('hover');
//   });
  
//   document.getElementById('card-cvv').addEventListener('blur', function() {
//     document.querySelector('.credit-card-box').classList.remove('hover');
//   });
  
//   document.getElementById('card-cvv').addEventListener('keyup', function() {
//     document.querySelector('.cvv div').innerHTML = this.value;
//   });
  
//   setTimeout(function() {
//     document.getElementById('card-cvv').focus();
//     setTimeout(function() {
//       document.getElementById('card-cvv').blur();
//     }, 1000);
//   }, 500);
  