document.getElementById("checkBtn").addEventListener("click", check);

function check() {
    chrome.tabs.query({active: true, currentWindow: true}).then(([tab]) => {
        chrome.scripting.executeScript({
            target: {
                tabId: tab.id,                
            },
            files: ['check.js']
        })

        
    });
    // chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    //     // console.log(tabs[0]);
    //     alert('>> ' + tabs[0]);
    // });
}

/*
document.querySelector("#cphContainer_cpContent_GridView1 > tbody > tr:nth-child(2) > td:nth-child(1)")
*/