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
      /* GitHub 링크 설정 호출 */
      setupGithubLink(project);
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

  // GitHub GitHub 링크 버튼 먼저 추가
  const githubLinkDiv = document.createElement("div");
  githubLinkDiv.className = "github-link";
  githubLinkDiv.id = "githubLink";
  githubLinkDiv.style.display = "none";
  githubLinkDiv.innerHTML = `
    <a href="" target="_blank" rel="noopener noreferrer">
      <span>Github</span>
      <span class="arrow-icon">
        <img src="./img/svg/up1.svg" alt="arrow" />
      </span>
    </a>
  `;
  detailPage.appendChild(githubLinkDiv);

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

/* GitHub 링크 설정 (web 카테고리만) */
function setupGithubLink(project) {
  const githubLinkDiv = document.getElementById("githubLink");

  if (!githubLinkDiv) return;

  // web 카테고리이고 github URL이 있으면 표시
  if (project.category === "web" && project.github) {
    const link = githubLinkDiv.querySelector("a");
    link.href = project.github;
    githubLinkDiv.style.display = "block";

    // 커스텀 커서 호버 효과
    const cursor = document.querySelector(".custom-cursor");
    if (cursor) {
      link.addEventListener("mouseenter", () => {
        cursor.classList.add("active");
      });
      link.addEventListener("mouseleave", () => {
        cursor.classList.remove("active");
      });
    }
  } else {
    // web 카테고리가 아니거나 github URL이 없으면 숨김
    githubLinkDiv.style.display = "none";
  }
}

/* 페이지 로드 시 실행 */
if (document.querySelector("#detail-page")) {
  document.addEventListener("DOMContentLoaded", loadProjectDetail);
}
