document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.querySelector('.gallery');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const imagesPerView = 20; // 한 번에 보여지는 이미지 수
    const totalImages = galleryItems.length;
    let currentIndex = 0; // 현재 페이지 인덱스
    let currentPage = 1; // 현재 페이지
    const imagesPerPage = 20; // 한 페이지당 이미지 수
    let totalPages = Math.ceil(totalImages / imagesPerPage); // 전체 페이지 수
    
    // 페이지 정보를 업데이트하는 함수
    function updatePaginationInfo() {
        document.getElementById('currentPage').textContent = currentPage;
        document.getElementById('totalPages').textContent = totalPages;
    }

    // 초기 상태 설정
    updateDisplay();
    updatePaginationInfo();

    // 다음 페이지로 넘어가는 함수
    function nextPage() {
        if (currentPage < totalPages) {
            currentPage++;
        } else {
            currentPage = 1; // 마지막 페이지에서 다시 첫 번째 페이지로 돌아감
        }
        updateDisplay();
        updatePaginationInfo();
        window.scroll(0, 0); // 페이지가 업데이트 될 때마다 맨 위로 바로 이동
    }

    // 이전 페이지로 돌아가는 함수
    function prevPage() {
        if (currentPage > 1) {
            currentPage--;
        } else {
            currentPage = totalPages; // 첫 번째 페이지에서 이전을 누르면 마지막 페이지로 돌아감
        }
        updateDisplay();
        updatePaginationInfo();
        window.scroll(0, 0); // 페이지가 업데이트 될 때마다 맨 위로 바로 이동
    }

    // 다음 버튼 클릭 이벤트
    const nextButton = document.getElementById('nextButton');
    nextButton.addEventListener('click', () => {
        nextPage();
    });

    // 이전 버튼 클릭 이벤트
    const prevButton = document.getElementById('prevButton');
    prevButton.addEventListener('click', () => {
        prevPage();
    });

    // 이미지를 업데이트하는 함수
    function updateDisplay() {
        const start = (currentPage - 1) * imagesPerPage;
        const end = start + imagesPerPage;
        galleryItems.forEach((item, index) => {
            if (index >= start && index < end) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }
});


document.addEventListener('DOMContentLoaded', () => {
    // 상단으로 스크롤 : behavior: 'smooth'  스무스 효과 
    document.getElementById('scrollToTop').addEventListener('click', () => {
        window.scrollTo({ top: 0});
    });

    // 하단으로 스크롤
    document.getElementById('scrollToBottom').addEventListener('click', () => {
        window.scrollTo({ top: document.body.scrollHeight});
    });

    // 위 아래 스크롤
    document.getElementById('nextButton').addEventListener('click', nextPage);
    document.getElementById('prevButton').addEventListener('click', prevPage);

    updateDisplay();
    updatePaginationInfo();
});


//   체크박스 필터 함수
  document.addEventListener('DOMContentLoaded', function () {
    const checkboxes = document.querySelectorAll('.filter-box input[type="checkbox"]');
    const galleryItems = document.querySelectorAll('.gallery-item');

    checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', function () {
        const checkedLocations = Array.from(checkboxes)
                                  .filter(input => input.checked)
                                  .map(input => input.value);

        galleryItems.forEach(item => {
          const itemLocation = item.getAttribute('data-location');

          if (checkedLocations.length === 0 || checkedLocations.includes(itemLocation)) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  });


  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        const checkedLocations = Array.from(checkboxes)
            .filter(input => input.checked)
            .map(input => input.value);

        galleryItems.forEach(item => {
            const itemLocation = item.getAttribute('data-location');

            // 선택된 지역에 따라 보이기/숨기기 설정
            if (checkedLocations.length === 0 || checkedLocations.includes(itemLocation)) {
                item.style.display = 'block'; // 보이기
            } else {
                item.style.display = 'none'; // 숨기기
            }
        });
    });
});

