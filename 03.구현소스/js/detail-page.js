// 디테일 페이지 셋팅

// URL에서 프로젝트 ID 가져오기
function getProjectIdFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("id");
}

// 프로젝트 상세 정보 로드
async function loadProjectDetail() {
  const projectId = getProjectIdFromURL();

  if (!projectId) {
    console.error("프로젝트 ID가 없습니다.");
    return;
  }

  try {
    const response = await fetch("./data/projects.json");
    const data = await response.json();

    const project = data.projects.find((p) => p.id === parseInt(projectId));

    if (project) {
      renderProjectDetail(project);
    } else {
      console.error("프로젝트를 찾을 수 없습니다.");
    }
  } catch (error) {
    console.error("프로젝트 데이터 로드 실패:", error);
  }
}

/* 프로젝트 상세 정보 렌더링 */
function renderProjectDetail(project) {
  const detailPage = document.querySelector("#detail-page");
  if (!detailPage) return;

  // 기존 내용 초기화
  detailPage.innerHTML = "";

  // 메인 이미지
  const mainImageDiv = document.createElement("div");
  mainImageDiv.className = "detail-img-m";
  mainImageDiv.innerHTML = `<img src="${project.detailMainImage}" alt="Project ${project.id}" />`;
  detailPage.appendChild(mainImageDiv);

  // 서브 이미지들
  if (project.detailSubImages && project.detailSubImages.length > 0) {
    const subImagesDiv = document.createElement("div");
    subImagesDiv.className = "detail-img-sb";

    project.detailSubImages.forEach((imgSrc) => {
      const img = document.createElement("img");
      img.src = imgSrc;
      img.alt = `Project ${project.id} detail`;
      subImagesDiv.appendChild(img);
    });

    detailPage.appendChild(subImagesDiv);
  }
}

/* 페이지 로드 시 실행 */
if (document.querySelector("#detail-page")) {
  document.addEventListener("DOMContentLoaded", loadProjectDetail);
}

// 이미지 셋팅
/* Masonry를 활용한 레이아웃 자동 배치 */
function setupMasonryLayout() {
  const container = document.querySelector(".detail-img-sb");
  if (!container) return;

  const images = container.querySelectorAll("img");

  images.forEach((img) => {
    // 이미지 로드 완료 후 처리
    if (img.complete) {
      setGridRowSpan(img);
    } else {
      img.addEventListener("load", function () {
        setGridRowSpan(this);
      });
    }
  });
}

// 이미지 높이에 따라 Grid Row 자동 조절
function setGridRowSpan(img) {
  const container = img.parentElement;
  const gap = 20; // gap 값과 동일하게

  // 이미지의 실제 높이 계산
  const rowHeight = 10; // 기본 row 높이
  const rowSpan = Math.ceil((img.offsetHeight + gap) / rowHeight);

  // grid-row-end 동적 설정
  img.style.gridRowEnd = `span ${rowSpan}`;
}

// 윈도우 리사이즈 시 재계산
window.addEventListener("resize", function () {
  setupMasonryLayout();
});

// 페이지 로드 시 실행
if (document.querySelector(".detail-img-sb")) {
  document.addEventListener("DOMContentLoaded", setupMasonryLayout);
}
