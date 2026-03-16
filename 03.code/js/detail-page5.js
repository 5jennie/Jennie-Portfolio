/* ********************* 바디럽 프로모션 스크롤 애니메이션 ********************* */

document.addEventListener("DOMContentLoaded", function () {
  /* bl-more 섹션 스크롤 애니메이션 */
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
      threshold: 0, // 요소가 조금이라도 보이면 실행
      rootMargin: "0px 0px -50px 0px",
    }
  );

  // bl-more 섹션 관찰 시작
  if (blMoreSection) {
    moreObserver.observe(blMoreSection);
  }
});