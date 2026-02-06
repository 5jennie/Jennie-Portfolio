/* ********************* 어뮤즈 프로모션 스크롤 애니메이션 ********************* */

document.addEventListener("DOMContentLoaded", function () {
  /* long-more 섹션 스크롤 애니메이션 */
  const longMoreSection = document.querySelector(".long-more");

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

  // long-more 섹션 관찰 시작
  if (longMoreSection) {
    moreObserver.observe(longMoreSection);
  }
});