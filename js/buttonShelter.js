let currentPage = 1;
const rowsPerPage = 13;

const shelters = [
    { name: '서울 보호소', num: '02-123-4567', addr: '서울특별시' },
    { name: '부산 보호소', num: '051-987-6543', addr: '부산광역시' },
    { name: '대구 보호소', num: '053-123-7890', addr: '대구광역시' },
    { name: '인천 보호소', num: '032-456-1234', addr: '인천광역시' },
    { name: '대전 보호소', num: '042-789-4561', addr: '대전광역시' },
    { name: '울산 보호소', num: '052-223-6274', addr: '울산광역시' },
    { name: '광주 보호소', num: '062-456-7890', addr: '광주광역시' },
    { name: '세종 보호소', num: '044-789-1234', addr: '세종특별자치시' },
    { name: '경기 보호소', num: '031-123-4567', addr: '경기도' },
    { name: '경남 보호소', num: '055-987-6543', addr: '경상남도' },
    { name: '경북 보호소', num: '054-123-7890', addr: '경상북도' },
    { name: '전남 보호소', num: '061-456-1234', addr: '전라남도' },
    { name: '전북 보호소', num: '063-789-4561', addr: '전라북도' },
    { name: '충남 보호소', num: '041-456-7890', addr: '충청남도' },
    { name: '충북 보호소', num: '043-123-4567', addr: '충청북도' },
    { name: '강원 보호소', num: '033-987-6543', addr: '강원도' },
    { name: '제주 보호소', num: '064-123-7890', addr: '제주특별자치도' }
];

function mapTabClick(element) {
    // 모든 li 요소에서 active 클래스 제거
    const allTabs = document.querySelectorAll('.map-tabs li');
    allTabs.forEach(tab => {
        tab.classList.remove('active');
    });

    // 클릭된 요소에 active 클래스 추가
    element.classList.add('active');

    // 데이터 필터링
    const filter = element.id;
    currentPage = 1;
    displayShelters(filter);
}

function displayShelters(filter) {
    const tbody = document.getElementById('shelterInfoBody');
    tbody.innerHTML = ''; // 기존의 내용 삭제

    // 필터링된 데이터 가져오기
    const filteredShelters = shelters.filter(shelter => filter === '전체' || shelter.addr === filter);
    const totalShelters = filteredShelters.length;
    const start = (currentPage - 1) * rowsPerPage;
    const end = Math.min(start + rowsPerPage, totalShelters);
    
    for (let i = start; i < end; i++) {
        const shelter = filteredShelters[i];
        const row = document.createElement('tr');
        row.innerHTML = `<td>${shelter.name}</td><td>${shelter.num}</td><td class="address">${shelter.addr}</td>`;
        tbody.appendChild(row);
    }

    displayPagination(totalShelters);
}

function displayPagination(totalShelters) {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';
    const totalPages = Math.ceil(totalShelters / rowsPerPage);

    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.innerText = i;
        if (i === currentPage) {
            pageButton.disabled = true;
        }
        pageButton.addEventListener('click', () => {
            currentPage = i;
            displayShelters(document.querySelector('.map-tabs li.active').id);
        });
        pagination.appendChild(pageButton);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // 초기 데이터 표시
    displayShelters('전체');
});

function openNaverMap(event) {
    if (event.target.tagName === 'TD' && event.target.classList.contains('address')) {
        const addr = event.target.textContent;
        window.open(`https://map.naver.com/v5/search/${addr}`, '_blank');
    }
}
