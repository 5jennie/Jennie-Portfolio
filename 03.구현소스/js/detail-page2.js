/* ********************* 오니스트 프로모션 ********************* */

// Ownist 스크롤 애니메이션
document.addEventListener("DOMContentLoaded", function () {
  const floatImages = document.querySelectorAll(".ownist-float");
  
  if (floatImages.length === 0) return;
  
  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.3,
      rootMargin: "0px 0px -100px 0px",
    }
  );
  
  floatImages.forEach((img) => {
    observer.observe(img);
  });
});

// 2열 이미지 컨테이너 스크롤 애니메이션
document.addEventListener("DOMContentLoaded", function () {
  const moreContent = document.querySelector(".more-content.scroll-fade");
  
  if (!moreContent) return;
  
  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }
  );
  
  observer.observe(moreContent);
});