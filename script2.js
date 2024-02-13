document.addEventListener('DOMContentLoaded', documentEvents, false);

function documentEvents() {
    document.getElementById('checkBtn').addEventListener('click',
        function () {
            var check1 = document.getElementById('check1').value;
            var check2 = document.getElementById('check2').value;
            var check3 = document.getElementById('check3').value;
            var check4 = document.getElementById('check4').value;
            var check5 = document.getElementById('check5').value;
            var check6 = document.getElementById('check6').value;
            var checkLotto = check1 + '-' + check2 + '-' + check3 + '-' + check4 + '-' + check5 + '-' + check6;

            chrome.tabs.query({ active: true, currentWindow: true }).then(([tab]) => {
                chrome.scripting.executeScript({
                    target: {
                        tabId: tab.id,
                    }
                    , function: checkResult
                    , args: [checkLotto]
                });
            });

        });
}

function checkResult(lottoToCheck) {
    var filterName = [
        'Ultra Lotto 6/58'
        , 'Grand Lotto 6/55'
        , 'Superlotto 6/49'
        , 'Megalotto 6/45'
        , 'Lotto 6/42'
    ];

    var lottoToCheckSplit = lottoToCheck.split('-')

    var lottoResults = document.querySelectorAll('table.search-lotto-result-table tr');

    Object.keys(lottoResults).map((index) => {
        const trObj = lottoResults[index];
        const lottoNameCheck = trObj.querySelector('td:nth-child(1)');
        var matchFound = [];

        if (lottoNameCheck != null) {
            const lottoName = lottoNameCheck.innerText;

            if (filterName.includes(lottoName)) {
                var lottoResultCheck = trObj.querySelector('td:nth-child(2)');
                var lottoResultCheckSplit = lottoResultCheck.innerText.split('-');

                lottoResultCheckSplit.map((i, idx) => {
                    if (lottoToCheckSplit.includes(i)) {
                        // lottoResultCheckSplit[idx] = '<span style="background-color:red; color: white">' + i + '</span>';
                        matchFound.push(i);
                    }
                });
                lottoResultCheck.innerHTML = lottoResultCheckSplit.join('-');
            }
        }

        var currentRowCells = trObj.querySelectorAll('td');

        if (matchFound.length > 0) {
            var formattedMatchFound = '<span style="background-color: red; color: white">' + matchFound.join('-') + '</span>';
            if (currentRowCells.length === 5) {
                var x = trObj.insertCell()
                x.innerHTML = formattedMatchFound;
            }
            else {
                trObj.querySelector('td:nth-child(6)').innerHTML = formattedMatchFound;
            }
        }
        else {
            if (currentRowCells.length > 5) {
                console.log('testing no match', trObj.querySelector('td:nth-child(2)').innerText);
                trObj.deleteCell(5);
            }
        }
    });
}

