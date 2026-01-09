/* ********************* 연작 프로모션 스크롤 애니메이션 ********************* */

document.addEventListener("DOMContentLoaded", function () {
  /* 1. 가로 슬라이더 무한 루프 (이미지 복제) */
  const track = document.querySelector(".yj-slide-track");
  if (track) {
    const slides = track.innerHTML;
    track.innerHTML = slides + slides; // 2세트로 복제
  }

  /* 2. 스크롤 애니메이션 - threshold 0.1 (10%) 적용 요소들 */
  const fadeElements = document.querySelectorAll(
    ".yj-poto, .official-text, .official-img, .promotion-text, .promotion-img"
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

  /* 3. yj-more 전용 Observer - threshold 0 적용 */
  const yjMoreSection = document.querySelector(".yj-more");

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

  // yj-more 섹션 관찰 시작
  if (yjMoreSection) {
    moreObserver.observe(yjMoreSection);
  }
});