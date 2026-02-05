/* ********************* 케이빌리지 브랜딩 스크롤 애니메이션 ********************* */

/* iframe 방식에 맞게 스크롤 애니메이션으로 변경 */
document.addEventListener("DOMContentLoaded", function () {
  
  /* 스크롤 애니메이션 - 영상 섹션들 */
  const fadeElements = document.querySelectorAll(
    ".kv-video, .kv-video2"
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
});