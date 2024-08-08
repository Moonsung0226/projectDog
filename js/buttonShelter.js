// 전체 보호소 데이터 (예시)
const allData = [
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

const itemsPerPage = 14;
let currentPage = 1;
let filteredData = [];

function displayItems(pageNumber) {
    const tbody = document.getElementById('shelterInfoBody');    
    tbody.innerHTML = ''; // 기존의 내용 삭제

    const startIndex = (pageNumber - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, filteredData.length);
    const itemsToDisplay = filteredData.slice(startIndex, endIndex);

    itemsToDisplay.forEach(item => {
        const newRow = document.createElement('tr');

        const nameCell = document.createElement('td');
        nameCell.textContent = item.name;
        const numCell = document.createElement('td');
        numCell.textContent = item.num;

        const addrCell = document.createElement('td');
        addrCell.textContent = item.addr;
        addrCell.classList.add('address'); // 주소 셀에 스타일 클래스 추가

        newRow.appendChild(nameCell);
        newRow.appendChild(numCell);
        newRow.appendChild(addrCell);

        tbody.appendChild(newRow);
    });

    updatePagination();
}

function updatePagination() {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = ''; // 기존의 페이지네이션 내용 삭제


    const totalPages = Math.ceil(filteredData.length / itemsPerPage);


    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.classList.add('page-btn');
        if (i === currentPage) {
            button.classList.add('selected');
        }
        button.addEventListener('click', () => changePage(i));
        pagination.appendChild(button);
    }
}

function changePage(pageNumber) {
    currentPage = pageNumber;
    displayItems(pageNumber);
}

function mapTabClick(element) {
    // 모든 li 요소에서 active 클래스 제거
    const allTabs = document.querySelectorAll('.map-tabs li');
    allTabs.forEach(tab => {
        tab.classList.remove('active');

    });

    // 클릭된 요소에 active 클래스 추가
    element.classList.add('active');


    // rightmain의 내용 삭제 및 추가
    const name = element.getAttribute('data-name');
    const addr = element.getAttribute('data-addr');


    // 전체 데이터 또는 필터링된 데이터 설정
    if (name === '전체 보호소') {
        filteredData = allData; // 전체 데이터 표시
    } else {
        filteredData = allData.filter(item => item.addr === addr); // 지역별 데이터 필터링
    }

    currentPage = 1; // 페이지를 1로 초기화
    displayItems(currentPage); // 데이터 표시
}

document.addEventListener('DOMContentLoaded', () => {
    displayItems(currentPage); // 페이지 로드 시 초기 데이터 표시
});