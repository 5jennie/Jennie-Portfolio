// 디테일 페이지 셋팅

// URL에서 프로젝트 ID 가져오기
function getProjectIdFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('id');
}

// 프로젝트 상세 정보 로드
async function loadProjectDetail() {
  const projectId = getProjectIdFromURL();
  
  if (!projectId) {
    console.error('프로젝트 ID가 없습니다.');
    return;
  }

  try {
    const response = await fetch('./data/projects.json');
    const data = await response.json();
    
    const project = data.projects.find(p => p.id === parseInt(projectId));
    
    if (project) {
      renderProjectDetail(project);
    } else {
      console.error('프로젝트를 찾을 수 없습니다.');
    }
    
  } catch (error) {
    console.error('프로젝트 데이터 로드 실패:', error);
  }
}

// 프로젝트 상세 정보 렌더링
function renderProjectDetail(project) {
  const container = document.querySelector('.detail-container');
  if (!container) return;
  
  container.innerHTML = `
    <div class="project-header">
      <h1 class="project-title">Project ${project.id}</h1>
      <p class="project-category">${project.tag}</p>
    </div>
    
    <div class="project-image-large">
      <img src="${project.image}" alt="Project ${project.id}" />
    </div>
    
    <div class="project-description-full">
      <h2>About this project</h2>
      <p>${project.description}</p>
    </div>
  `;
}

// 페이지 로드 시 실행
if (document.querySelector('.detail-container')) {
  document.addEventListener('DOMContentLoaded', loadProjectDetail);
}