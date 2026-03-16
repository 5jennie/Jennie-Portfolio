/* ********************* CFS 프로모션 스크롤 애니메이션 ********************* */

document.addEventListener("DOMContentLoaded", function () {
  const cfsVideo = document.querySelector(".cfs-video");
  const cfsMore = document.querySelector(".cfs-more");

  if (!cfsVideo && !cfsMore) return;

  const fadeObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  if (cfsVideo) fadeObserver.observe(cfsVideo);
  if (cfsMore) fadeObserver.observe(cfsMore);
});