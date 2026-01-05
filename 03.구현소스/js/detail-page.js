// ★수정됨: 상세 페이지 기본 설정 (자동 렌더링 로직 삭제)
// 각 detail-page1.html, detail-page2.html 등에서 자유롭게 레이아웃 구성

// GitHub 링크 호버 효과 (커스텀 커서)
document.addEventListener("DOMContentLoaded", function () {
  const githubLink = document.querySelector(".github-link a");
  const cursor = document.querySelector(".custom-cursor");

  if (githubLink && cursor) {
    githubLink.addEventListener("mouseenter", () => {
      cursor.classList.add("active");
    });
    githubLink.addEventListener("mouseleave", () => {
      cursor.classList.remove("active");
    });
  }
});

// 박스 슬라이더 (무한 루프)
document.addEventListener("DOMContentLoaded", function () {
  const track = document.querySelector(".amuse-slider-track");
  const slides = document.querySelectorAll(".amuse-slide");
  const btnUp = document.querySelector(".amuse-btn-up");
  const btnDown = document.querySelector(".amuse-btn-down");
  
  if (!track || slides.length === 0) return;
  
  const slideHeight = 410; // 1장 높이 + 간격
  const totalSlides = slides.length;
  let currentIndex = 0;
  let isAnimating = false; // 애니메이션 중복 방지
  
  // 슬라이드 복제 (앞뒤로 2개씩)
  const firstClone1 = slides[0].cloneNode(true);
  const firstClone2 = slides[1].cloneNode(true);
  const lastClone1 = slides[totalSlides - 1].cloneNode(true);
  const lastClone2 = slides[totalSlides - 2].cloneNode(true);
  
  track.appendChild(firstClone1);
  track.appendChild(firstClone2);
  track.insertBefore(lastClone1, slides[0]);
  track.insertBefore(lastClone2, lastClone1);
  
  // 초기 위치 (복제본 때문에 2칸 뒤에서 시작)
  currentIndex = 2;
  track.style.transform = `translateY(-${currentIndex * slideHeight}px)`;
  
  // 위 버튼 클릭
  btnUp.addEventListener("click", function () {
    if (isAnimating) return;
    isAnimating = true;
    currentIndex--;
    moveSlider();
  });
  
  // 아래 버튼 클릭
  btnDown.addEventListener("click", function () {
    if (isAnimating) return;
    isAnimating = true;
    currentIndex++;
    moveSlider();
  });
  
  function moveSlider() {
    track.style.transition = "transform 0.5s ease";
    track.style.transform = `translateY(-${currentIndex * slideHeight}px)`;
  }
  
  // 애니메이션 끝나면 위치 조정
  track.addEventListener("transitionend", function () {
    // 맨 앞 복제본에 도달하면 → 진짜 마지막으로 순간 이동
    if (currentIndex <= 1) {
      track.style.transition = "none";
      currentIndex = totalSlides + 1;
      track.style.transform = `translateY(-${currentIndex * slideHeight}px)`;
    }
    
    // 맨 뒤 복제본에 도달하면 → 진짜 처음으로 순간 이동
    if (currentIndex >= totalSlides + 2) {
      track.style.transition = "none";
      currentIndex = 2;
      track.style.transform = `translateY(-${currentIndex * slideHeight}px)`;
    }
    
    isAnimating = false;
  });
});

// 이미지 드레그 방지
document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll(".amuse-slide img");
  images.forEach((img) => {
    img.addEventListener("dragstart", (e) => e.preventDefault());
  });
});