// 헤더 로드
fetch('./inc/header.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('nav').innerHTML = data;
    
    /* Works 링크에 active 표시 */
    document.querySelectorAll('.nav a').forEach(link => {
      link.style.fontWeight = '100';
      if (link.getAttribute('href') === 'works.html') {
        link.style.fontWeight = '600';
      }
    });
    
    /* nav의 a 태그에 커서 효과 */
    const cursor = document.querySelector('.custom-cursor');
    if (cursor) {
      document.querySelectorAll('.nav a').forEach((element) => {
        element.addEventListener("mouseenter", () => cursor.classList.add("active"));
        element.addEventListener("mouseleave", () => cursor.classList.remove("active"));
      });
    }
  });

// 푸터 로드
fetch('./inc/footer.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('footer').innerHTML = data;
  });

/* 페이지 로드 후 실행 */
document.addEventListener('DOMContentLoaded', function() {
  
  /* ========== 커서 커스텀 ========== */
  const cursor = document.querySelector('.custom-cursor');
  
  // 커서 움직임
  document.addEventListener("mousemove", function (e) {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
  });
  
  // 인터랙티브 요소에 호버 시 커서 확대
  document.querySelectorAll(
    "button, .project-card, .pagination-btn"
  ).forEach((element) => {
    element.addEventListener("mouseenter", () => cursor.classList.add("active"));
    element.addEventListener("mouseleave", () => cursor.classList.remove("active"));
  });
  
  /* ========== 카테고리 필터링 ========== */
  const tabButtons = document.querySelectorAll('.tab-btn');
  const projectCards = document.querySelectorAll('.project-card');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      const category = this.getAttribute('data-category');
      
      // 활성 탭 스타일 변경
      tabButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      // 프로젝트 카드 필터링
      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        
        if (category === 'all') {
          card.classList.remove('hidden');
        } else if (cardCategory === category) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
  
  /* ========== 페이지네이션 ========== */
  const prevBtn = document.querySelector('.pagination-btn.prev');
  const nextBtn = document.querySelector('.pagination-btn.next');
  
  if (prevBtn) {
    prevBtn.addEventListener('click', function() {
      console.log('이전 페이지');
      // 페이지네이션 로직 추가 예정
    });
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', function() {
      console.log('다음 페이지');
      // 페이지네이션 로직 추가 예정
    });
  }
  
});