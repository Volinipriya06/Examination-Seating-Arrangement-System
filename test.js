const { Builder, By, until } = require('selenium-webdriver');

(async function () {
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        await driver.get('http://localhost:9000');
        await driver.wait(until.elementLocated(By.id('roomConfig')), 10000);

        const testCases = [
            {
                room: 'Room A:2x2',
                excluded: '105',
                students: '101-104-IT'
            },
            {
                room: 'Room A:3x2',
                excluded: '',
                students: '101-106-IT\n201-206-CSE'
            },
            {
                room: 'Room A:3x3',
                excluded: '103,202',
                students: '101-105-IT\n201-205-CSE'
            },
            {
                room: 'Room A:2x2, Room B:2x2',
                excluded: '104',
                students: '101-106-IT\n201-206-CSE'
            },
            {
                room: 'Room A:4x3',
                excluded: '110,115,120',
                students: '101-130-IT\n201-230-CSE\n301-320-ECE'
            }
        ];

        for (let test of testCases) {

            let roomInput = await driver.findElement(By.id('roomConfig'));
            let excludedInput = await driver.findElement(By.id('excludedStudents'));
            let studentInput = await driver.findElement(By.id('studentList'));

            await roomInput.clear();
            await excludedInput.clear();
            await studentInput.clear();

            await roomInput.sendKeys(test.room);
            await excludedInput.sendKeys(test.excluded);
            await studentInput.sendKeys(test.students);

            let button = await driver.findElement(By.tagName('button'));

            await driver.executeScript("arguments[0].scrollIntoView(true);", button);
            await driver.sleep(500);

            await driver.executeScript("arguments[0].click();", button);

            await driver.sleep(2000);

            let output = await driver.findElement(By.id('outputArea')).getText();

            if (output.trim().length > 0) {
                console.log("Test Passed for:", test.room);
            } else {
                console.log("Test Failed for:", test.room);
            }
        }

    } catch (error) {
        console.log("Test Failed", error);
    } finally {
        await driver.quit();
    }
})();
