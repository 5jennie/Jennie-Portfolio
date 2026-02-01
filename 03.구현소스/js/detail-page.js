// 상세 페이지 기본 설정 (자동 렌더링 로직 삭제)

// 각 detail-page1.html, detail-page2.html 등에서 자유롭게 레이아웃 구성

// 이미지 드레그 방지
document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll("#detail-page img");
  images.forEach((img) => {
    img.addEventListener("dragstart", (e) => e.preventDefault());
  });
});