// 페이지 로드 시 기본으로 "전체 보호소" 활성화
document.addEventListener('DOMContentLoaded', () => {
  const defaultTab = document.querySelector('.map-tabs li#전체');
  if (defaultTab) {
      mapTabClick(defaultTab);

      // 기본 path도 활성화
      const defaultPath = document.querySelector('#map path[data-name="전체 보호소"]');
      if (defaultPath) {
          pathClick(defaultPath);
      }
  }
});
function mapTabClick(element) {
  // 모든 li 요소에서 active 클래스 제거
  const allTabs = document.querySelectorAll('.map-tabs li');
  allTabs.forEach(tab => {
      tab.classList.remove('active');
  });

  // 클릭된 요소에 active 클래스 추가
  element.classList.add('active');

  // rightmain의 내용 삭제 및 추가
  const tbody = document.getElementById('shelterInfoBody');
  tbody.innerHTML = ''; // 기존의 내용 삭제

  // 데이터 속성에서 보호소 정보 가져오기
  const name = element.getAttribute('data-name');
  const num = element.getAttribute('data-num');
  const addr = element.getAttribute('data-addr');

  const newRow = document.createElement('tr');

  const nameCell = document.createElement('td');
  nameCell.textContent = name;

  const numCell = document.createElement('td');
  numCell.textContent = num;

  const addrCell = document.createElement('td');
  addrCell.textContent = addr;
  addrCell.classList.add('address'); // 주소 셀에 스타일 클래스 추가

  newRow.appendChild(nameCell);
  newRow.appendChild(numCell);
  newRow.appendChild(addrCell);

  tbody.appendChild(newRow);

  currentAddress = addr; // 현재 주소 저장
}

// tbody 클릭시 새 창에서 네이버 지도 띄움
function openNaverMap() {
  if (currentAddress) {
      const encodedAddress = encodeURIComponent(currentAddress);
      window.open(`https://map.naver.com/v5/search/${encodedAddress}`, '_blank');
  }
}

function pathClick(element) {
  const targetName = element.getAttribute('data-name');
  const targetTab = document.querySelector(`.map-tabs li[id="${targetName}"]`);

  const allPaths = document.querySelectorAll('#map path');
  allPaths.forEach(path => {
      path.classList.remove('active');
  });

  // 클릭된 path에 active 클래스 추가
  element.classList.add('active');

  if (targetTab) {
      // 모든 li 요소에서 active 클래스 제거
      const allTabs = document.querySelectorAll('.map-tabs li');
      allTabs.forEach(tab => {
          tab.classList.remove('active');
      });

      // 클릭된 요소에 active 클래스 추가
      targetTab.classList.add('active');
      mapTabClick(targetTab);  // 클릭된 li의 정보를 업데이트
  }
}