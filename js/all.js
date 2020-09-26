
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
        let message = document.querySelector('.count >p')
        if (height.value > 0 && weight.value > 0) {
            if (noStorage.checked === false && storage.checked === false) {
                message.textContent = '請選擇是否儲存record'
                alert('請選擇是否儲存record!!!');
            } else if (e.target.nodeName === 'INPUT') {
                countbmi(height.value, weight.value);
                open(e);
                message.textContent = ''
            }
        } else {
            message.textContent = '請輸入身高體重!!!'
            alert('請輸入身高體重');
        };

        if (e.target.nodeName === 'A' || e.target.nodeName === 'IMG') {
            open(e)
            message.textContent = ''
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
        let color;

        let colorClass = document.querySelector('.displayresult');
        let statusName = document.querySelector('.displayresult >p');
        let bmiClass = document.querySelector('.displayresult >div p')
        let Storage = document.querySelector('.data #storage');


        switch (true) {
            case bmi <= 18.5:
                status = '過輕';
                color = 'blue'
                break;
            case bmi <= 25:
                status = '理想'
                color = 'green'
                break;
            case bmi <= 30:
                status = '過重'
                color = 'orange'
                break;
            case bmi <= 35:
                status = '輕度肥胖'
                color = 'orangeone'
                break;
            case bmi <= 40:
                status = '中度肥胖'
                color = 'orangetwo'
                break;
            case bmi > 40:
                status = '重度肥胖'
                color = 'red'

        }
        bmiClass.textContent = bmi
        colorClass.classList.add(color)
        statusName.textContent = status

        if (Storage.checked === true) {
            data.push({
                myStatusName: status,
                myBmi: bmi,
                myColor: color,
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
            str += `<li class=${data[i].myColor}> 
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


    //open and close start icon
    function open(e) {
        let even = e;
        let height = document.querySelector('.data #cm');
        let weight = document.querySelector('.data #kg');
        let noStorage = document.querySelector('.data #nostorage');
        let storage = document.querySelector('.data #storage');

        if (even.target.nodeName === 'A' || even.target.nodeName === 'IMG') {
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

        } else if (e.target.nodeName === 'INPUT') {
            data = []
            let strData = JSON.stringify(data);
            localStorage.setItem('BMIdata', strData)
        }
        outputData()
    }, false)

};

