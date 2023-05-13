// ==UserScript==
// @name         TemporaryTunaFocus
// @author       Anonymous Tuna compctive With ChatGPT
// @version      0.1
// @description  Display response_info with specific ID or code on tunaground BBS thread pages
// @match        https://bbs.tunaground.net/*

// ==/UserScript==

(function() {
    'use strict';
    // Get the 10-digit thread ID from the URL
    const threadId = window.location.pathname.split('/').pop();
    // Check if the URL matches the expected format
    if (/^\d{10}$/.test(threadId)) {
        // Create a button element for displaying response info
        const displayButton = document.createElement('button');
        displayButton.textContent = '레스';
        displayButton.style.marginLeft = '10px';
        // Create a button element for showing all responses
        const showAllButton = document.createElement('button');
        showAllButton.textContent = '전부보기';
        showAllButton.style.marginLeft = '10px';
        showAllButton.style.display = 'none';
        // Add a click event listener to the display button
        displayButton.addEventListener('click', () => {
            // Prompt the user for a response owner ID or nickname
            const responseOwner = prompt('보려는 아이디나 인증코드 입력');
            if (!responseOwner) {
                return;
            }
            // Find the response elements with the matching ID or nickname and hide the others
            const responseElements = document.querySelectorAll(`#thread_${threadId} .response`);
            let foundResponse = false;
            responseElements.forEach((responseElement) => {
                const responseInfo = responseElement.querySelector('.response_info');
                if (responseInfo) {
                    const responseOwnerId = responseInfo.querySelector('a')?.textContent.trim();
                    const responseOwnerNickname = responseInfo.querySelector('b')?.textContent.split('◆')[1]?.trim();
                    if ((responseOwnerId && responseOwnerId === responseOwner) || (responseOwnerNickname && responseOwnerNickname === responseOwner)) {
                        responseElement.style.display = 'block';
                        foundResponse = true;
                    } else {
                        responseElement.style.display = 'none';
                    }
                } else {
                    responseElement.style.display = 'none';
                }
            });
            // Show the "Show All Responses" button if responses were found, otherwise display an error message
            if (foundResponse) {
                showAllButton.style.display = 'inline-block';
            } else {
                alert(`"${responseOwner}" ← 이런 아이디나 인증코드가 없습니다.`);
                return;
            }
        });
        // Add a click event listener to the show all button
        showAllButton.addEventListener('click', () => {
            // Show all response elements
            const responseElements = document.querySelectorAll(`#thread_${threadId} .response`);
            responseElements.forEach((responseElement) => {
                responseElement.style.display = 'block';
            });
            // Hide the "Show All Responses" button
            showAllButton.style.display = 'none';
        });
        // Insert the buttons after the thread title
        const threadTitle = document.querySelector(`#thread_${threadId} .thread_title`);
        threadTitle.appendChild(displayButton);
        threadTitle.appendChild(showAllButton);
        // Add the "Show All Responses" button next to the "More" button
        const moreButton = document.querySelector(`#thread_${threadId} .response_list .more`);
        moreButton.parentNode.insertBefore(showAllButton, moreButton.nextSibling);
    }
})();
