document.addEventListener("DOMContentLoaded", function () {
    setTimeout(function () {
      let overlay = document.querySelector(".overlay");
      overlay.style.display = "none";
    }, 3000);
  });

// document.querySelector(".createBtn").addEventListener("mouseover", function() {
//     setTimeout(function() {
//       document.querySelector(".Btn_content").innerHTML = "TODO 리스트 추가하기";
//     }, 500);
//   });

//   document.querySelector(".createBtn").addEventListener("mouseout", function() {
//     setTimeout(function() {
//       document.querySelector(".Btn_content").innerHTML = "+";
//     }, 100);
//   });

  document.querySelector(".createBtn").addEventListener("mouseover", function() {
    document.querySelector(".Btn_content").innerHTML = "TODO 리스트 추가하기";
}); 

  document.querySelector(".createBtn").addEventListener("mouseout", function() {
    document.querySelector(".Btn_content").innerHTML = "+";
});