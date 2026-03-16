/* ********************* 키르시 프로모션 스크롤 애니메이션 ********************* */

document.addEventListener("DOMContentLoaded", function () {
  
  /* 1. 태그 슬라이더 무한 루프 (이미지 복제) */
  /* 왼쪽→오른쪽 방향 무한 반복을 위해 충분히 복제 */
  const tagTracks = document.querySelectorAll(".ks-tag-slide-track");
  tagTracks.forEach((track) => {
    if (track) {
      const slides = track.innerHTML;
      // 무한 루프를 위해 6세트로 복제 (왼쪽에서 오른쪽으로 흐름)
      track.innerHTML = slides + slides + slides + slides + slides + slides;
    }
  });

  /* 2. 메인 슬라이더 무한 루프 (이미지 복제) */
  const mainTrack = document.querySelector(".ks-slide-track");
  if (mainTrack) {
    const slides = mainTrack.innerHTML;
    // 무한 루프를 위해 2세트로 복제
    mainTrack.innerHTML = slides + slides;
  }

  /* 3. 스크롤 애니메이션 - 페이드인 요소들 */
  const fadeElements = document.querySelectorAll(
    ".official-text, .official-img, .ks-cherry, .promotion-text, .promotion-img, .other-img"
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

  /* 4. 섹션4 상품 연출컷 - 순차 노출 애니메이션 */
  const potoCut1 = document.querySelector(".poto_cut1");
  const potoCut2 = document.querySelector(".poto_cut2");
  const potoCut3 = document.querySelector(".poto_cut3");

  // poto_cut1 Observer - 스크롤 1번: 1번 이미지 노출
  const poto1Observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          poto1Observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.3,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  // poto_cut2 Observer - 스크롤 2번: 2번 이미지 노출 후 3초 뒤 3번 이미지 노출
  const poto2Observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // 2번 이미지 노출
          entry.target.classList.add("visible");
          poto2Observer.unobserve(entry.target);

          // 3초 후 3번 이미지 노출
          setTimeout(() => {
            if (potoCut3) {
              potoCut3.classList.add("visible");
            }
          }, 1500);
        }
      });
    },
    {
      threshold: 0.3,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  // 관찰 시작
  if (potoCut1) {
    poto1Observer.observe(potoCut1);
  }
  if (potoCut2) {
    poto2Observer.observe(potoCut2);
  }
});