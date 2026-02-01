// 마우스 커서 커스텀 (전역 적용)

window.addEventListener("DOMContentLoaded", function () {
  const cursor = document.querySelector(".custom-cursor");

  if (cursor) {
    // 마우스 위치 저장 변수
    let mouseX = 0;
    let mouseY = 0;

    // 마우스 이동 시 좌표 업데이트
    document.addEventListener("mousemove", function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    // 커서를 마우스 위치로 부드럽게 이동
    function updateCursor() {
      cursor.style.left = mouseX + "px";
      cursor.style.top = mouseY + "px";
      requestAnimationFrame(updateCursor);
    }
    updateCursor();

    // 호버 효과 적용할 선택자 목록
    const hoverSelectors = [
      "a",
      "button",
      "canvas",
      ".scroll-guide",
      ".project-images-slider1",
      ".project-images-slider2",
      ".project-images-slider3",
      ".more-images",
      ".more-click",
      ".project-card",
      ".tab-btn",
      ".pagination-btn",
      ".sticker",
      ".category-tabs",
      ".connection-card",
    ].join(", ");

    // 호버 효과 제외할 선택자
    const excludeSelectors = ".back-click, .scroll-to-top, .github-link";

    // 이벤트 위임 방식 (동적 생성 요소에도 적용)
    document.addEventListener("mouseover", function (e) {
      const target = e.target.closest(hoverSelectors);
      const excluded = e.target.closest(excludeSelectors);

      if (target && !excluded) {
        cursor.classList.add("active");
      }
    });

    document.addEventListener("mouseout", function (e) {
      const target = e.target.closest(hoverSelectors);
      const excluded = e.target.closest(excludeSelectors);

      if (target && !excluded) {
        cursor.classList.remove("active");
      }
    });
  }
});
