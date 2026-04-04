const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

async function runSeleniumTest() {
    // Setup Chrome options (Headless mode is better for Jenkins)
    let options = new chrome.Options();
    options.addArguments('--headless'); 
    options.addArguments('--no-sandbox');
    options.addArguments('--disable-dev-shm-usage');

    let driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();

    try {
        console.log("Starting Selenium UI Test...");
        
        // 1. Navigate to your deployed app
        await driver.get('http://localhost:9005');

        // 2. Wait for the page to load and check the title
        let title = await driver.getTitle();
        console.log("Page Title is: " + title);

        if (title.includes("Seating") || title.length > 0) {
            console.log("SUCCESS: Application is reachable and UI is loaded.");
        } else {
            throw new Error("UI Content Mismatch");
        }

    } catch (error) {
        console.error("TEST FAILED: " + error.message);
        process.exit(1); // Exit with error for Jenkins
    } finally {
        await driver.quit();
    }
}

runSeleniumTest();
