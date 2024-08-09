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
function pathClick(element) {
  const targetName = element.getAttribute('data-name');
  // data-name 값과 일치하는 id를 가진 li 요소를 선택
  const targetTab = document.querySelector(`.map-tabs li[id="${targetName}"]`);

  // 모든 path 요소에서 'active' 클래스를 제거하여 비활성화
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
function mapTabClick(element) {
  // 모든 li 요소에서 active 클래스 제거
  const allTabs = document.querySelectorAll('.map-tabs li');
  allTabs.forEach(tab => {
      tab.classList.remove('active');
  });

  // 클릭된 요소에 active 클래스 추가
  element.classList.add('active');

  // 모든 path 요소에서 active 클래스 제거
  const allPaths = document.querySelectorAll('#map path');
  allPaths.forEach(path => {
      path.classList.remove('active');
  });

  // 해당하는 path 요소에 active 클래스 추가
  const targetName = element.getAttribute('id');
  const targetPath = document.querySelector(`#map path[data-name="${targetName}"]`);
  if (targetPath) {
      targetPath.classList.add('active');
  }

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

  newRow.appendChild(nameCell);
  newRow.appendChild(numCell);
  newRow.appendChild(addrCell);

  tbody.appendChild(newRow);
}

function openNaverMap(event) {
  const target = event.target;
  // 클릭된 요소의 가장 가까운 행(tr) 요소를 찾음
  const row = target.closest('tr');
  if (row) {
    // 셀의 모든 텍스트를 가져와서 주소를 찾기
    const cells = row.querySelectorAll('td');
    // 셀 중에서 'address' 클래스를 가진 셀을 찾음
    const addressCell = Array.from(cells).find(cell => cell.classList.contains('address'));
    if (addressCell) {
      // 주소 셀에서 주소 텍스트를 가져옴
      const address = addressCell.textContent;
      // 네이버 지도에서 검색할 URL을 생성함
      const mapUrl = `https://map.naver.com/?query=${encodeURIComponent(address)}`;

      // 새 창에서 네이버 지도 열기
      window.open(mapUrl, '_blank'); 
    }
  }
}
