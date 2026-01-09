/* ********************* CFS 프로모션 스크롤 애니메이션 ********************* */

document.addEventListener("DOMContentLoaded", function () {
  // 애니메이션 대상 요소들
  const cfsText = document.querySelector(".cfs-text");
  const stillCut1 = document.querySelector(".still-cut1");
  const stillCut2 = document.querySelector(".still-cut2");
  const stillCutText = document.querySelector(".still-cut-text");
  const stillCut3 = document.querySelector(".still-cut3");
  const cfsVideo = document.querySelector(".cfs-video");
  const officialText = document.querySelector(".official-text");
  const promotionImg = document.querySelector(".promotion-img");
  const cfsMore = document.querySelector(".cfs-more");

  // 요소가 없으면 종료
  if (!cfsText) return;

  // 기본 Observer (페이드인)
  const fadeObserver = new IntersectionObserver(
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

  // cut2 전용 Observer (오른쪽에서 왼쪽으로 + still-cut-text 0.5초 후 등장)
  const cut2Observer = new IntersectionObserver(
    function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");

          // cut2 등장 후 0.5초 뒤에 still-cut-text 등장
          if (stillCutText) {
            setTimeout(() => {
              stillCutText.classList.add("visible");
            }, 500);
          }
        }
      });
    },
    {
      threshold: 0.3,
      rootMargin: "0px 0px -100px 0px",
    }
  );

  // cfs-more 전용 Observer (더 민감하게)
  const moreObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.05,
      rootMargin: "100px 0px 0px 0px",
    }
  );

  /* official-text 전용 Observer (promotion-img도 같이 등장) */
  const officialObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          
          // official-text 등장 시 promotion-img도 같이 등장
          if (promotionImg) {
            promotionImg.classList.add("visible");
          }
        }
      });
    },
    {
      threshold: 0.3,
      rootMargin: "0px 0px -100px 0px",
    }
  );

  // 각 요소에 Observer 적용
  // 1단계: cfs-text
  if (cfsText) {
    fadeObserver.observe(cfsText);
  }

  // 2단계: still-cut1
  if (stillCut1) {
    fadeObserver.observe(stillCut1);
  }

  // 3단계: still-cut2 (오른쪽에서 왼쪽으로)
  if (stillCut2) {
    cut2Observer.observe(stillCut2);
  }

  // 4단계: still-cut3
  if (stillCut3) {
    fadeObserver.observe(stillCut3);
  }

  // 5단계: cfs-video
  if (cfsVideo) {
    fadeObserver.observe(cfsVideo);
  }

  // 6단계: official-text
  if (officialText) {
    fadeObserver.observe(officialText);
  }

  // 7단계: promotion-img
  if (promotionImg) {
    fadeObserver.observe(promotionImg);
  }

  // 8단계: cfs-more
  if (cfsMore) {
    moreObserver.observe(cfsMore);
  }
});
