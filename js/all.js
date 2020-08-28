
window.onload = function () {
    const count = document.querySelector('.count');
    let data = JSON.parse(localStorage.getItem('BMIdata')) || [];
    const remove = document.querySelector('.content');
    outputData();


    function inputbmi(e) {
        let height = document.querySelector('.data #cm');
        let weight = document.querySelector('.data #kg');
        let storage = document.querySelector('.data #storage');
        let noStorage = document.querySelector('.data #nostorage');

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

        let height = cm;
        let weight = kg;
        let bmi = Math.round((weight / ((height * height))) * 1000000) / 100;
        let status = '';
        let myDate = new Date();
        let day = myDate.toLocaleDateString();


        let color = document.querySelector('.displayresult');
        let statusName = document.querySelector('.displayresult >p');
        let bmiClass = document.querySelector('.displayresult >div p')
        let Storage = document.querySelector('.data #storage');


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
            let strData = JSON.stringify(data);
            localStorage.setItem('BMIdata', strData);

        };
        outputData();
    };

    function outputData() {
        let len = data.length;
        let str = '';

        for (let i = 0; i < len; i++) {
            str+=`<li class=${changeStyle(data[i].myStatusName)}> 
                        <table>
                            <tbody>
                                <tr>
                                    <td>${data[i].myStatusName}</td>
                                    <td><span>BMI</span>${data[i].myBmi}</td>
                                    <td><span>weight</span>${data[i].myWeight}kg</td>
                                    <td><span>height</span>${data[i].myHeight}cm</td>
                                    <td>${data[i].myDay}<span></span>
                                    <input data-num=${[i]} type="button" value="x"></td>
                                </tr>
                            </tbody>
                        </table>
                    </li>`;
        }

        document.querySelector('.bmi-data').innerHTML = str;

    };

    function changeStyle(name) {
        let statusName = name;
        switch (name) {
            case '過輕':
                return "blue"
            case '理想':
                return "green"
            case '過重':
                return "orange"
            case '輕度肥胖':
                return "orangeone"
            case '中度肥胖':
                return "orangetwo"
            case '重度肥胖':
                return "red"
        }

    };
    //open and close start icon
    function open(e) {
        let even = e;
        let height = document.querySelector('.data #cm');
        let weight = document.querySelector('.data #kg');
        let noStorage = document.querySelector('.data #nostorage');
        let storage = document.querySelector('.data #storage');

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
        let deleNumber = Number(e.target.dataset.num)

        if (deleNumber >= 0) {
            data.splice(deleNumber, 1)
            let strData = JSON.stringify(data);
            localStorage.setItem('BMIdata', strData)

        } else if (e.target.nodeName == 'INPUT') {
            data = []
            let strData = JSON.stringify(data);
            localStorage.setItem('BMIdata', strData)
        }
        outputData()
    }, false)

};
