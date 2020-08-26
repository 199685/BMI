
window.onload = function () {
    var count = document.querySelector('.count');
    var data = JSON.parse(localStorage.getItem('BMIdata')) || [];
    var remove = document.querySelector('.content');
    outputData();


    function inputbmi(e) {
        var height = document.querySelector('.data #cm');
        var weight = document.querySelector('.data #kg');
        var storage = document.querySelector('.data #storage');
        var noStorage = document.querySelector('.data #nostorage');

        if (height.value > 0 && weight.value > 0) {
            if (noStorage.checked == false && storage.checked == false) {
                alert('請選擇是否儲存record');
            } else if (e.target.nodeName == 'INPUT') {
                countbmi(height.value, weight.value);
                open(e);
            }
        } else {
            alert('請輸入身高體重');
        };

        if (e.target.nodeName == 'A' || e.target.nodeName == 'IMG') {
            open(e)
        }

    };
    count.addEventListener('click', inputbmi, false);
    //count and add local storage data
    function countbmi(cm, kg) {

        var height = cm;
        var weight = kg;
        var bmi = Math.round((weight / ((height * height))) * 1000000) / 100;
        var status = '';
        var myDate = new Date();
        var day = myDate.toLocaleDateString();


        var color = document.querySelector('.displayresult');
        var statusName = document.querySelector('.displayresult >p');
        var bmiClass = document.querySelector('.displayresult >div p')
        var Storage = document.querySelector('.data #storage');


        if (bmi <= 18.5) {
            status = '過輕';
            color.classList.add('blue')
            statusName.textContent = status
        } else if (bmi <= 25) {
            status = '理想'
            color.classList.add('green')
            statusName.textContent = status
        } else if (bmi <= 30) {
            status = '過重'
            color.classList.add('orange')
            statusName.textContent = status
        } else if (bmi <= 35) {
            status = '輕度肥胖'
            color.classList.add('orangeone')
            statusName.textContent = status
        } else if (bmi <= 40) {
            status = '中度肥胖'
            color.classList.add('orangetwo')
            statusName.textContent = status
        } else {
            status = '重度肥胖'
            color.classList.add('red')
            statusName.textContent = status
        }
        bmiClass.textContent = bmi

        if (Storage.checked == true) {
            data.push({
                myStatusName: status,
                myBmi: bmi,
                myHeight: height,
                myWeight: weight,
                myDay: day
            });
            var strData = JSON.stringify(data);
            localStorage.setItem('BMIdata', strData);

        };
        outputData();
    };

    function outputData() {
        var len = data.length;
        var str = '';

        for (var i = 0; i < len; i++) {
            str += changeStyle(data[i].myStatusName) + '<table><tr><td>' + data[i].myStatusName + '</td><td><span>BMI</span>' + data[i].myBmi + '</td><td><span>weight</span>' + data[i].myHeight + 'kg</td><td><span>height</span>' + data[i].myWeight + 'cm</td><td><span>' + data[i].myDay + '</span><input data-num="' + [i] + '" type="button" value="x"></td></tr></table></li>'
        }

        document.querySelector('.bmi-data').innerHTML = str

    };

    function changeStyle(statusName) {
        var statusName = statusName;
        switch (statusName) {
            case '過輕':
                return '<li class="blue">'
            case '理想':
                return '<li class="green">'
            case '過重':
                return '<li class="orange">'
            case '輕度肥胖':
                return '<li class="orangeone">'
            case '中度肥胖':
                return '<li class="orangetwo">'
            case '重度肥胖':
                return '<li class="red">'
        }

    };
    //open and close start icon
    function open(e) {
        var even = e;
        var height = document.querySelector('.data #cm');
        var weight = document.querySelector('.data #kg');
        var noStorage = document.querySelector('.data #nostorage');
        var storage = document.querySelector('.data #storage');

        if (even.target.nodeName == 'A' || even.target.nodeName == 'IMG') {
            document.querySelector('.result').classList.remove('close');
            document.querySelector('.displayresult').className = 'displayresult';
            height.value = ''
            weight.value = ''
            noStorage.checked = false
            storage.checked = false
        } else {
            document.querySelector('.result').classList.add('close');
            document.querySelector('.displayresult').classList.add('open');
        }

    };
    //remove data
    remove.addEventListener('click', function (e) {
        var deleNumber = Number(e.target.dataset.num)

        if (deleNumber >= 0) {
            data.splice(deleNumber, 1)
            var strData = JSON.stringify(data);
            localStorage.setItem('BMIdata', strData)

        } else if (e.target.nodeName == 'INPUT') {
            data = []
            var strData = JSON.stringify(data);
            localStorage.setItem('BMIdata', strData)
        }
        outputData()
    }, false)

};
