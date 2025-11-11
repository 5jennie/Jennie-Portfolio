/* ************************ header 불러오기 ************************* */
fetch("./inc/header.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("nav").innerHTML = data;

    // 부드러운 스크롤 효과
    document.querySelectorAll('.nav a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      });
    });

    const cursor = document.querySelector(".custom-cursor");
    document.querySelectorAll(".nav a").forEach((element) => {
      element.addEventListener("mouseenter", () =>
        cursor.classList.add("active")
      );
      element.addEventListener("mouseleave", () =>
        cursor.classList.remove("active")
      );
    });
  });

/* ************************ footer 불러오기 ************************* */
fetch("./inc/footer.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("footer").innerHTML = data;
  });

/* ************************ 반응 셋팅 ************************* */

// 페이지 로드 시 최상단으로 이동
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

// 히스토리 사용 시에도 최상단으로 이동
if (history.scrollRestoration) {
  history.scrollRestoration = "manual";
}

// 부드러운 스크롤 기능
document.documentElement.style.scrollBehavior = "smooth";

/* ***************************************************************** */

// ************************ gif 설정 ************************ //
/* 메인에 gif 이미지 가져오기 */
const canvas = document.getElementById("je-gif");
const ctx = canvas.getContext("2d");

// 애니메이션 프레임 설정
// 총 프레임 수
const totalFrames = 20;
// 프레임 배열과 현재 프레임 인덱스
const frames = [];
// 현재 표시 중인 프레임 번호
let currentFrame = 0;
// 애니메이션 재생 상태
let isPlaying = true;
// 로드된 이미지 개수
let imagesLoaded = 0;
// 마지막 프레임 표시 시간
let lastFrameTime = 0;
// 프레임 간 딜레이 (약 0초)
const frameDelay = 1000 / 6;

/* gif캔버스 크기 설정 */
canvas.width = 400;
canvas.height = 400;

/* 모든 프레임 이미지 미리 로드 */
for (let i = 1; i <= totalFrames; i++) {
  const img = new Image();
  // 이미지 로드 완료 시 카운트 증가
  img.src = `./img/animation/144ppi/je_ani_${i}.png`;
  img.onload = function () {
    imagesLoaded++;
    // 모든 이미지가 로드되면 애니메이션 시작
    if (imagesLoaded === totalFrames) {
      animate(0);
    }
  };
  frames.push(img);
}

// 애니메이션 재생 함수
function animate(timestamp) {
  // 재생이 멈춘 상태면 중단
  if (!isPlaying) return;

  // 프레임 딜레이만큼 시간이 지나면 다음 프레임으로
  if (timestamp - lastFrameTime >= frameDelay) {
    // 이전 프레임 지우기
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // 현재 프레임 그리기
    ctx.drawImage(frames[currentFrame], 0, 0, canvas.width, canvas.height);

    // 다음 프레임으로 이동 (마지막 프레임이면 처음으로)
    currentFrame = (currentFrame + 1) % totalFrames;
    lastFrameTime = timestamp;
  }

  // 다음 프레임 요청
  requestAnimationFrame(animate);
}

// 마우스가 캔버스에 올라가면 애니메이션 일시정지
canvas.addEventListener("mouseenter", function () {
  isPlaying = false;
});

// 마우스가 캔버스에서 벗어나면 애니메이션 재개
canvas.addEventListener("mouseleave", function () {
  isPlaying = true;
  lastFrameTime = 0;
  requestAnimationFrame(animate);
});

// ************************************************************ //

// ******************** 마우스 커서 커스텀 ******************** //
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

    // 인터랙티브 요소에 호버 시 커서 확대 효과
    document
      .querySelectorAll(
        "a, canvas, .scroll-guide, .project-images-slider1, .project-images-slider2, .project-images-slider3, .more-images, .more-click"
      )
      .forEach((element) => {
        // 마우스 올리면 커서에 'active' 클래스 추가 (확대)
        element.addEventListener("mouseenter", function () {
          cursor.classList.add("active");
        });

        // 마우스 벗어나면 'active' 클래스 제거 (원래 크기)
        element.addEventListener("mouseleave", function () {
          cursor.classList.remove("active");
        });
      });
  }
});

// ************************************************************ //
// ********************* 스크롤 애니메이션 ********************* //

// Intersection Observer 옵션 설정
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

// 요소가 화면에 보이면 'visible' 클래스 추가
const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

// Works 섹션 관찰 시작
document.addEventListener("DOMContentLoaded", function () {
  const worksSection = document.querySelector(".works-section");
  if (worksSection) {
    observer.observe(worksSection);
  }
});

// ************************************************************ //
// *************** 스티커 패럴랙스 & 드래그 효과 *************** //

/* 스티커 패럴랙스 효과 */
document.addEventListener("DOMContentLoaded", function () {
  const stickers = document.querySelectorAll(".sticker");

  /* 드래그 관련 변수 */
  let isDragging = false; // 드래그 중인지 확인
  let currentSticker = null; // 현재 드래그 중인 스티커
  let offsetX = 0; // 스티커 내 클릭 위치 X
  let offsetY = 0; // 스티커 내 클릭 위치 Y

  if (stickers.length > 0) {
    /* 마우스 이동에 따른 패럴랙스 효과 */
    document.addEventListener("mousemove", function (e) {
      /* 드래그 중일 때는 드래그 처리 */
      if (isDragging && currentSticker) {
        /* 마우스 위치에서 오프셋을 빼서 스티커 위치 계산 */
        const newLeft = e.clientX - offsetX;
        const newTop = e.clientY - offsetY;

        /* 스티커를 absolute 위치로 변경하여 자유롭게 이동 */
        currentSticker.style.left = newLeft + "px";
        currentSticker.style.top = newTop + "px";
        currentSticker.style.transform = "none"; // 패럴랙스 효과 제거

        return; // 드래그 중에는 패럴랙스 효과 비활성화
      }

      /* 드래그 중이 아닐 때만 패럴랙스 효과 적용 */
      /* 마우스 위치를 0~1 사이 값으로 정규화 */
      const mouseX = e.clientX / window.innerWidth;
      const mouseY = e.clientY / window.innerHeight;

      /* 각 스티커에 패럴랙스 효과 적용 */
      stickers.forEach((sticker) => {
        /* 드래그로 이동한 스티커는 패럴랙스 효과 제외 */
        if (sticker.dataset.dragged === "true") return;

        /* 각 스티커의 이동 속도 가져오기 */
        const speed = parseFloat(sticker.getAttribute("data-speed")) || 0.5;

        /* 마우스 반대 방향으로 이동 거리 계산 (패럴랙스 효과) */
        const moveX = (mouseX - 0.5) * -50 * speed;
        const moveY = (mouseY - 0.5) * -50 * speed;

        /* transform 속성으로 스티커 위치 이동 */
        sticker.style.transform = `translate(${moveX}px, ${moveY}px)`;
      });
    });

    /* 스티커에 드래그 기능 추가 */
    stickers.forEach((sticker) => {
      /* 마우스 클릭 시작 (드래그 시작) */
      sticker.addEventListener("mousedown", function (e) {
        isDragging = true;
        currentSticker = sticker;

        /* 스티커 내에서 클릭한 위치 계산 */
        const rect = sticker.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;

        /* 드래그 중임을 표시 */
        sticker.style.cursor = "grabbing";
        sticker.style.zIndex = "5"; // 다른 스티커 위로

        /* 드래그 중에는 패럴랙스 효과 비활성화 */
        sticker.dataset.dragged = "true";

        e.preventDefault(); // 기본 드래그 동작 방지
      });

      /* 스티커에 마우스 올리면 커스텀 커서 활성화 */
      sticker.addEventListener("mouseenter", function () {
        const cursor = document.querySelector(".custom-cursor");
        if (cursor) {
          cursor.classList.add("active");
        }
        /* 드래그 가능함을 나타내는 커서 */
        if (!isDragging) {
          sticker.style.cursor = "grab";
        }
      });

      /* 스티커에서 마우스 벗어나면 커스텀 커서 원래대로 */
      sticker.addEventListener("mouseleave", function () {
        const cursor = document.querySelector(".custom-cursor");
        if (cursor) {
          cursor.classList.remove("active");
        }
      });
    });

    /* 마우스 버튼을 놓으면 드래그 종료 */
    document.addEventListener("mouseup", function () {
      if (isDragging && currentSticker) {
        isDragging = false;
        currentSticker.style.cursor = "grab";
        currentSticker = null;
      }
    });

    /* 마우스가 화면 밖으로 나가도 드래그 종료 */
    document.addEventListener("mouseleave", function () {
      if (isDragging && currentSticker) {
        isDragging = false;
        currentSticker.style.cursor = "grab";
        currentSticker = null;
      }
    });
  }
});

// ******************* Works 섹션 애니메이션 ******************* //

/* Intersection Observer로 프로젝트 아이템 애니메이션 */
const projectObserverOptions = {
  threshold: 0.2,
  rootMargin: "0px 0px -50px 0px",
};

const projectObserver = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, projectObserverOptions);

/* 페이지 로드 시 프로젝트 아이템 관찰 */
document.addEventListener("DOMContentLoaded", function () {
  const projectItems = document.querySelectorAll(".project-item");
  projectItems.forEach((item) => {
    projectObserver.observe(item);
  });
});

// ************************************************************ //

// *************** 프로젝트 이미지 랜덤 크기 생성 *************** //
/* 이미지 원본 비율을 자동으로 계산하여 크기 조정 */
document.addEventListener("DOMContentLoaded", function () {
  // 프로젝트별 설정
  const projects = [
    {
      container: ".project-images-slider1",
      images: [
        "./img/project/project (1).jpg",
        "./img/project/project (2).jpg",
        "./img/project/project (3).jpg",
        "./img/project/project (4).jpg",
        "./img/project/project (5).jpg",
        "./img/project/project (6).jpg",
        "./img/project/project (7).jpg",
      ],
      minWidth: 300,
      maxWidth: 600,
      count: 15, // 총 이미지 개수 (같은 이미지 반복)
    },
    {
      container: ".project-images-slider2",
      images: [
        "./img/project/project (8).jpg",
        "./img/project/project (9).jpg",
        "./img/project/project (10).jpg",
        "./img/project/project (11).jpg",
        "./img/project/project (12).jpg",
        "./img/project/project (13).jpg",
        "./img/project/project (14).jpg",
      ],
      minWidth: 300,
      maxWidth: 600,
      count: 15,
    },
    {
      container: ".project-images-slider3",
      images: [
        "./img/project/project (15).jpg",
        "./img/project/project (16).jpg",
        "./img/project/project (1).jpg",
        "./img/project/project (4).jpg",
        "./img/project/project (5).jpg",
        "./img/project/project (6).jpg",
        "./img/project/project (7).jpg",
      ],
      minWidth: 300,
      maxWidth: 600,
      count: 15,
    },
  ];

  /* 이미지 원본 크기를 가져와서 비율 계산하는 함수 */
  function loadImageWithRatio(imagePath, minWidth, maxWidth) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = function () {
        const aspectRatio = this.naturalHeight / this.naturalWidth;
        const isHorizontal = this.naturalWidth >= this.naturalHeight;

        /* 가로형 이미지: maxWidth 기준, 세로형 이미지: minWidth 기준 */
        let targetWidth;
        if (isHorizontal) {
          // 가로형: maxWidth 기준으로 랜덤 생성 (maxWidth의 80~100%)
          targetWidth =
            Math.ceil(Math.random() * (maxWidth * 0.2)) + maxWidth * 0.8;
        } else {
          // 세로형: minWidth 기준으로 랜덤 생성 (minWidth의 100~120%)
          targetWidth = Math.ceil(Math.random() * (minWidth * 0.2)) + minWidth;
        }
        const calculatedHeight = Math.ceil(targetWidth * aspectRatio);

        resolve({
          width: targetWidth,
          height: calculatedHeight,
          src: imagePath,
        });
      };
      img.src = imagePath;
    });
  }

  /* 각 프로젝트의 이미지를 원본 비율로 생성 */
  projects.forEach(async (project) => {
    const container = document.querySelector(project.container);
    if (!container) return;

    const imagePromises = [];

    /* 이미지 생성 (2세트 - 무한 루프용) */
    for (let set = 0; set < 2; set++) {
      for (let i = 0; i < project.count; i++) {
        // /* 이미지 배열에서 순환하여 선택 */
        const imageIndex = i % project.images.length;
        const imagePath = project.images[imageIndex];

        /* minWidth, maxWidth를 함수에 전달하여 이미지 비율에 따라 처리 */
        imagePromises.push(
          loadImageWithRatio(imagePath, project.minWidth, project.maxWidth)
        );
      }
    }

    /* 모든 이미지 정보를 가져온 후 HTML 생성 */
    const imageData = await Promise.all(imagePromises);

    let htmlCode = "";
    imageData.forEach((data, index) => {
      htmlCode += `
        <img 
          src="${data.src}" 
          alt="Project Image ${index + 1}"
          style="width: ${data.width}px; height: ${
        data.height
      }px; object-fit: cover;"
        >
      `;
    });

    /* HTML에 삽입 */
    container.innerHTML = htmlCode;
    /* 드래그로 슬라이더 이동 */
    const wrapper = container.parentElement; // 스크롤 가능한 부모 (.project-slider-container)
    let isDown = false;
    let startX;
    let scrollLeft;
    let velocity = 0;
    let lastX = 0;
    let lastTime = 0;
    let momentumId;

    wrapper.addEventListener("mousedown", (e) => {
      isDown = true;
      startX = e.pageX;
      scrollLeft = wrapper.scrollLeft;
      lastX = e.pageX;
      lastTime = Date.now();
      velocity = 0;
      cancelAnimationFrame(momentumId);
      wrapper.classList.add("active");
      container.style.animationPlayState = "paused";
    });

    wrapper.addEventListener("mouseleave", stopDrag);
    wrapper.addEventListener("mouseup", stopDrag);

    wrapper.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();

      const x = e.pageX;
      const walk = x - startX;
      wrapper.scrollLeft = scrollLeft - walk;

      // 속도 계산 (나중에 관성효과에 사용)
      const now = Date.now();
      const delta = now - lastTime;
      const dx = x - lastX;
      velocity = dx / delta; // px/ms
      lastX = x;
      lastTime = now;
    });

    function stopDrag() {
      if (!isDown) return;
      isDown = false;
      wrapper.classList.remove("active");
      smoothMomentum();
    }

    function smoothMomentum() {
      const startVelocity = velocity * 10; // 시작 속도
      const duration = 1500; // 감속 시간 (ms)
      const startTime = performance.now();

      function easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3); // 점점 천천히 멈추는 커브
      }

      function animate(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeOutCubic(progress);

        // 처음 속도에서 점점 줄어듦
        const move = startVelocity * (1 - eased);
        wrapper.scrollLeft -= move;

        if (progress < 1) {
          momentumId = requestAnimationFrame(animate);
        } else {
          container.style.animationPlayState = "running";
        }
      }

      requestAnimationFrame(animate);
    }
  });
});
/* ***************************************************************** */

// ******************* more 섹션 애니메이션 ******************* //

/* Intersection Observer로 more 섹션 애니메이션 */
const moreObserverOptions = {
  threshold: 0.2,
  rootMargin: "0px 0px -50px 0px",
};

const moreObserver = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, moreObserverOptions);

/* 페이지 로드 시 more 컨테이너 관찰 */
document.addEventListener("DOMContentLoaded", function () {
  const moreContainer = document.querySelector(".more-container");
  if (moreContainer) {
    moreObserver.observe(moreContainer);
  }
});

// ************************************************************ //
