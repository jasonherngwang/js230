// 1
document.querySelector('#primary_heading').id = 'heading';

// 2
document.querySelector('#list').classList.add('bulleted');

// 3
const toggleNotice = (e) => {
  e.preventDefault();
  let notice = document.querySelector('#notice');
  let noticeStatus = notice.className;
  notice.setAttribute(
    'class',
    noticeStatus === 'hidden' ? 'visible' : 'hidden'
  );
};
document.querySelector('#toggle').onclick = toggleNotice;

// 4
document.querySelector('#notice').onclick = (e) => {
  e.preventDefault();
  e.currentTarget.setAttribute('class', 'hidden');
};

// 5
document.querySelector('#multiplication').textContent = String(13 * 9);

// 6
document.body.setAttribute('id', 'styled');
