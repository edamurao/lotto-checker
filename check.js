var filter = [
    'Ultra Lotto 6/58'
    , 'Grand Lotto 6/55'
    , 'Super Lotto 6/49'
    , 'Mega Lotto 6/45'
    , 'Lotto 6/42'
];

var lottoResult = document.querySelectorAll('table.search-lotto-result-table tr');

Object.keys(lottoResult).map((index) => {
    const trObj = lottoResult[index];
    const lottoNameCheck = trObj.querySelector('td:nth-child(1)');

    if (lottoNameCheck != null) {
        const lottoName = lottoNameCheck.innerText;

        if (filter.includes(lottoName)) {
            var lottoResultCheck = trObj.querySelector('td:nth-child(2)');

            var t = CheckResult(lottoResultCheck.innerText);

            lottoResultCheck.innerHTML = t;


        }
    }
});

function CheckResult(lotto) {
    var lottoLookup = ['05', '07', '08', '09', '17', '26'];
    const lottoArr = lotto.split('-');
    var output = '';

    // lottoLookup.map((i) => {
    //     if(lottoArr.includes(i))
    //         console.log('test');
    //     else
    //         formattedLottoResult += 
    // });

    lottoArr.map((i, idx) => {
        if (lottoLookup.includes(i)) {
            lottoArr[idx] = '<span style="background-color:red; color: white">' + i + '</span>';
        }
    });

    return lottoArr.join('-');
}

//document.querySelector("#cphContainer_cpContent_GridView1 > tbody > tr:nth-child(2) > td:nth-child(1)")