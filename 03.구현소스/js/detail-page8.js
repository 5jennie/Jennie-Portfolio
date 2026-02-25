/* ********************* 애니큐브 애니메이션 ********************* */
/* 홍보 영상 스크롤 시 무음 자동재생 */
document.addEventListener("DOMContentLoaded", function () {
  const videoSection = document.querySelector(".an-video");
  const iframe = document.getElementById("an-youtube");

  if (!videoSection || !iframe) return;

  let hasPlayed = false;

  const videoObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasPlayed) {
          const autoplaySrc = iframe.getAttribute("data-src-autoplay");
          if (autoplaySrc) {
            iframe.src = autoplaySrc;
            hasPlayed = true;
          }
        }
      });
    },
    {
      threshold: 0.3,
      rootMargin: "0px 0px -100px 0px",
    }
  );

  videoObserver.observe(videoSection);
});