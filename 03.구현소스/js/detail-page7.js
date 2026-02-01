/* ********************* 힌스 프로모션 스크롤 애니메이션 ********************* */

document.addEventListener("DOMContentLoaded", function () {

  /* 1. 스크롤 애니메이션 - threshold 0.1 (10%) 적용 요소들 */
  const fadeElements = document.querySelectorAll(
    ".h, .official-text, .official-img, .promotion-text, .p-1, .t-1, .p-2, .t-2, .p-3"
  );

  const fadeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          fadeObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2, // 요소가 20% 보일 때 실행
      rootMargin: "0px 0px -50px 0px",
    }
  );

  // 각 요소 관찰 시작
  fadeElements.forEach((el) => {
    fadeObserver.observe(el);
  });

  /* 3. h-more 전용 Observer - threshold 0 적용 */
  const hMoreSection = document.querySelector(".h-more");

  const moreObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          moreObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0, // 요소가 조금이라도 보이면 실행
      rootMargin: "0px 0px -50px 0px",
    }
  );

  // h-more 섹션 관찰 시작
  if (hMoreSection) {
    moreObserver.observe(hMoreSection);
  }
});