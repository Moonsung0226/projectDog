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