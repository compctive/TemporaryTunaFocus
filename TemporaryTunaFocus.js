// ==UserScript==
// @name         TemporaryTunaFocus
// @author       Anonymous Tuna compctive With ChatGPT
// @version      0.2
// @description  Display response_info with specific ID or code on tunaground BBS thread pages
// @match        https://bbs.tunaground.net/*
// ==/UserScript==

(function() {
  'use strict';

  const threadId = window.location.pathname.split('/').pop();
  const isThreadIdValid = /^\d{10}$/.test(threadId);
  if (!isThreadIdValid) {
    return;
  }

  const displayButton = createButton('레스', '10px', displayResponses);
  const showAllButton = createButton('전부보기', '10px', showAllResponses);
  showAllButton.style.display = 'none';

  const threadTitle = document.querySelector(`#thread_${threadId} .thread_title`);
  threadTitle.append(displayButton, showAllButton);

  const moreButton = document.querySelector(`#thread_${threadId} .response_list .more`);
  moreButton.parentNode.insertBefore(showAllButton, moreButton.nextSibling);

  function createButton(text, marginLeft, onClick) {
    const button = document.createElement('button');
    button.textContent = text;
    button.style.marginLeft = marginLeft;
    button.addEventListener('click', onClick);
    return button;
  }

  function displayResponses() {
    const responseOwner = prompt('보려는 아이디나 인증코드 입력');
    if (!responseOwner) {
      return;
    }

    const responseElements = Array.from(document.querySelectorAll(`#thread_${threadId} .response`));
    let foundResponse = false;

    responseElements.forEach(responseElement => {
      const responseInfo = responseElement.querySelector('.response_info');
      const responseOwnerId = responseInfo?.querySelector('a')?.textContent.trim();
      const responseOwnerNickname = responseInfo?.querySelector('b')?.textContent.split('◆')[1]?.trim();

      const isMatchedOwner =
        (responseOwnerId && responseOwnerId === responseOwner) ||
        (responseOwnerNickname && responseOwnerNickname === responseOwner);

      responseElement.style.display = isMatchedOwner ? 'block' : 'none';
      foundResponse = foundResponse || isMatchedOwner;
    });

    if (foundResponse) {
      showAllButton.style.display = 'inline-block';
    } else {
      alert(`"${responseOwner}" 이런 아이디나 인증코드가 없습니다.`);
      responseElements.forEach(responseElement => {
        responseElement.style.display = 'block';
      });
      showAllButton.style.display = 'none';
    }
  }

  function showAllResponses() {
    const responseElements = document.querySelectorAll(`#thread_${threadId} .response`);
    responseElements.forEach(responseElement => {
      responseElement.style.display = 'block';
    });

    showAllButton.style.display = 'none';
  }
})();
