/* ********************* 바디럽 프로모션 스크롤 애니메이션 ********************* */

document.addEventListener("DOMContentLoaded", function () {
  /* 2. 섹션2 순차 노출 애니메이션 */
  const blPotoSection = document.querySelector(".bl-poto");

  const potoObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // 1단계: 로고 노출
          const logo = document.querySelector(".bl-logo");
          if (logo) logo.classList.add("visible");

          // 2단계: bl-so1, bl-so2, bl-so3 동시 노출 (1초 후)
          setTimeout(() => {
            const so1 = document.querySelector(".bl-so1");
            const so2 = document.querySelector(".bl-so2");
            const so3 = document.querySelector(".bl-so3");
            if (so1) so1.classList.add("visible");
            if (so2) so2.classList.add("visible");
            if (so3) so3.classList.add("visible");
          }, 1000);

          // 3단계: bl-so4 노출 (1초 후)
          setTimeout(() => {
            const so4 = document.querySelector(".bl-so4");
            if (so4) so4.classList.add("visible");
          }, 3000);

          // 4단계: 텍스트 2개 동시 노출 (1.5초 후)
          setTimeout(() => {
            const text1 = document.querySelector(".bl-poto-text1");
            const text2 = document.querySelector(".bl-poto-text2");
            if (text1) text1.classList.add("visible");
            if (text2) text2.classList.add("visible");
          }, 4500);

          potoObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  // bl-poto 섹션 관찰 시작
  if (blPotoSection) {
    potoObserver.observe(blPotoSection);
  }

  /* 3. 스크롤 애니메이션 - 다른 섹션들 */
  const fadeElements = document.querySelectorAll(
    ".official-text, .official-img, .promotion-text, .promotion-img, .bl-more"
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
      threshold: 0.2,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  fadeElements.forEach((el) => {
    fadeObserver.observe(el);
  });

  /* 4. bl-more 전용 Observer - threshold 0 적용 */
  const blMoreSection = document.querySelector(".bl-more");

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
      threshold: 0,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  if (blMoreSection) {
    moreObserver.observe(blMoreSection);
  }
});