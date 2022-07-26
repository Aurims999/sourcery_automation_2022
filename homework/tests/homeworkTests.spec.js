// @ts-check
const { test, expect } = require('@playwright/test');

const versions = [
  'Prototype',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9'
]

const summationData = [
  '13', '189',
  '-18', '-8',
  '169', '11.28',
  '64.157', '-1.4',
  '1.11', '-18.49',
  '-3.48', '-65',
  '0', '0'
]

const subtractionData = [
  "11", "7",
  "7", "0",
  "8", "-8",
  "-16", "12.5",
  "0", "0"
]

versions.forEach(version => {
  
  test.describe(`Add function (version: ${version})`, () => {
    
    for (let i = 0; i < summationData.length - 1; i++) {
      //Arrange
      var firstDigit = summationData[i];
      var secondDigit = summationData[i + 1];
      var expectedResult = (parseFloat(firstDigit) + parseFloat(secondDigit)).toString();

      //Act
      test(`Summming ${firstDigit} and ${secondDigit} results in ${expectedResult}`, async ({ page }) => {
        await page.goto('https://testsheepnz.github.io/BasicCalculator');
        await page.selectOption('#selectBuild', { label: version});
        await page.locator('#number1Field').type(firstDigit);
        await page.locator('#number2Field').type(secondDigit);
        await page.selectOption('#selectOperationDropdown', {label: 'Add'});
        await page.locator('#calculateButton').click();
    
        //Assert
        await expect(page.locator('#numberAnswerField')).toHaveValue(expectedResult);
      });
    }

    //#region Other test scenarious

    // Adding String values //
    //Arrange
    var firstFieldData = "Tekstas";
    var secondFieldData = "Lorum Ipsum";

    //Act
    test(`Summming two strings will not be allowed`, async ({ page }) => {
      await page.goto('https://testsheepnz.github.io/BasicCalculator');
      await page.selectOption('#selectBuild', { label: version});
      await page.locator('#number1Field').type(firstFieldData);
      await page.locator('#number2Field').type(secondFieldData);
      await page.selectOption('#selectOperationDropdown', {label: 'Add'});
      await page.locator('#calculateButton').click();
  
      //Assert
      await expect(page.locator('#errorMsgField')).toBeVisible();
    });

    // Leaving empty fields //

    test(`Summing empty field and 18 results in 18`, async ({ page }) => {
      await page.goto('https://testsheepnz.github.io/BasicCalculator');
      await page.selectOption('#selectBuild', { label: version});
      await page.locator('#number2Field').type("18");
      await page.selectOption('#selectOperationDropdown', {label: 'Add'});
      await page.locator('#calculateButton').click();
  
      //Assert
      await expect(page.locator('#numberAnswerField')).toHaveValue("18");
    });

    test(`Summing 84.11 and empty field results in 84.11`, async ({ page }) => {
      await page.goto('https://testsheepnz.github.io/BasicCalculator');
      await page.selectOption('#selectBuild', { label: version});
      await page.locator('#number1Field').type("84.11");
      await page.selectOption('#selectOperationDropdown', {label: 'Add'});
      await page.locator('#calculateButton').click();
  
      //Assert
      await expect(page.locator('#numberAnswerField')).toHaveValue("84.11");
    });

    test(`Summing two empty fields results in 0`, async ({ page }) => {
      await page.goto('https://testsheepnz.github.io/BasicCalculator');
      await page.selectOption('#selectBuild', { label: version});
      await page.selectOption('#selectOperationDropdown', {label: 'Add'});
      await page.locator('#calculateButton').click();
  
      //Assert
      await expect(page.locator('#numberAnswerField')).toHaveValue("0");
    });

    test(`Only current summation's results should be displayed`, async ({ page }) => {
      await page.goto('https://testsheepnz.github.io/BasicCalculator');
      await page.selectOption('#selectBuild', { label: version});
      let firstDigit, secondDigit;
      for (let i = 0; i < 5; i++){
        //Generating random numbers for summation
        firstDigit = Math.floor(Math.random() * 100);
        secondDigit = Math.floor(Math.random() * 100);

        //Clearing previous data from input fields
        await page.locator('#number1Field').fill('');
        await page.locator('#number2Field').fill('');

        //Inserting new digits and starting summation
        await page.locator('#number1Field').type(firstDigit.toString());
        await page.locator('#number2Field').type(secondDigit.toString());
        await page.selectOption('#selectOperationDropdown', {label: 'Add'});
        await page.locator('#calculateButton').click();

        //If this iteration is the last, check what result should be displayed in the results output field
        if (i === 4){
          let expectedSum = firstDigit + secondDigit;
          //Assert
          await expect(page.locator('#numberAnswerField')).toHaveValue(expectedSum.toString());
          return;
        }
      }

      //User shouldn't be able to get out of the for loop
      throw new Error("Something went wrong with for loop in summations test");
    });

    //#endregion

  });

  test.describe(`Subtract function (version: ${version})`, () => {
    
    for (let i = 0; i < subtractionData.length - 1; i++) {
      //Arrange
      var firstDigit = subtractionData[i];
      var secondDigit = subtractionData[i + 1];
      var expectedResult = (parseFloat(firstDigit) + parseFloat(secondDigit)).toString();

      //Act
      test(`Subtracting ${firstDigit} and ${secondDigit} results in ${expectedResult}`, async ({ page }) => {
        await page.goto('https://testsheepnz.github.io/BasicCalculator');
        await page.selectOption('#selectBuild', { label: version});
        await page.locator('#number1Field').type(firstDigit);
        await page.locator('#number2Field').type(secondDigit);
        await page.selectOption('#selectOperationDropdown', {label: 'Subtract'});
        await page.locator('#calculateButton').click();
    
        //Assert
        await expect(page.locator('#numberAnswerField')).toHaveValue(expectedResult);
      });
    }

    //#region Other test scenarious

    // Subtracting String values //
    //Arrange
    var firstFieldData = "Tekstas";
    var secondFieldData = "Lorum Ipsum";

    //Act
    test(`Subtracting two strings will not be allowed`, async ({ page }) => {
      await page.goto('https://testsheepnz.github.io/BasicCalculator');
      await page.selectOption('#selectBuild', { label: version});
      await page.locator('#number1Field').type(firstFieldData);
      await page.locator('#number2Field').type(secondFieldData);
      await page.selectOption('#selectOperationDropdown', {label: 'Subtract'});
      await page.locator('#calculateButton').click();
  
      //Assert
      await expect(page.locator('#errorMsgField')).toBeVisible();
    });

    // Leaving empty fields //

    test(`Subtracting empty field and 18 results in -18`, async ({ page }) => {
      await page.goto('https://testsheepnz.github.io/BasicCalculator');
      await page.selectOption('#selectBuild', { label: version});
      await page.locator('#number2Field').type("18");
      await page.selectOption('#selectOperationDropdown', {label: 'Subtract'});
      await page.locator('#calculateButton').click();
  
      //Assert
      await expect(page.locator('#numberAnswerField')).toHaveValue("-18");
    });

    test(`Subtracting 84.11 and empty field results in 84.11`, async ({ page }) => {
      await page.goto('https://testsheepnz.github.io/BasicCalculator');
      await page.selectOption('#selectBuild', { label: version});
      await page.locator('#number1Field').type("84.11");
      await page.selectOption('#selectOperationDropdown', {label: 'Subtract'});
      await page.locator('#calculateButton').click();
  
      //Assert
      await expect(page.locator('#numberAnswerField')).toHaveValue("84.11");
    });

    test(`Subtracting two empty fields results in 0`, async ({ page }) => {
      await page.goto('https://testsheepnz.github.io/BasicCalculator');
      await page.selectOption('#selectBuild', { label: version});
      await page.selectOption('#selectOperationDropdown', {label: 'Subtract'});
      await page.locator('#calculateButton').click();
  
      //Assert
      await expect(page.locator('#numberAnswerField')).toHaveValue("0");
    });

    test(`Only current Subtraction's results should be displayed`, async ({ page }) => {
      await page.goto('https://testsheepnz.github.io/BasicCalculator');
      await page.selectOption('#selectBuild', { label: version});
      let firstDigit, secondDigit;
      for (let i = 0; i < 5; i++){
        //Generating random numbers for summation
        firstDigit = Math.floor(Math.random() * 100);
        secondDigit = Math.floor(Math.random() * 100);

        //Clearing previous data from input fields
        await page.locator('#number1Field').fill('');
        await page.locator('#number2Field').fill('');

        //Inserting new digits and starting summation
        await page.locator('#number1Field').type(firstDigit.toString());
        await page.locator('#number2Field').type(secondDigit.toString());
        await page.selectOption('#selectOperationDropdown', {label: 'Subtract'});
        await page.locator('#calculateButton').click();

        //If this iteration is the last, check what result should be displayed in the results output field
        if (i === 4){
          let expectedSum = firstDigit + secondDigit;
          //Assert
          await expect(page.locator('#numberAnswerField')).toHaveValue(expectedSum.toString());
          return;
        }
      }

      //User shouldn't be able to get out of the for loop
      throw new Error("Something went wrong with for loop in summations test");
    });

    //#endregion

  });

  test.describe(`General functionality tests (version: ${version})`, () =>{
    //Testing number fields existance
    for (let i = 0; i < 2; i++){
      test(`Number field ${i + 1} should exist`, async ({ page }) => {
        await page.goto('https://testsheepnz.github.io/BasicCalculator');
        await page.selectOption('#selectBuild', { label: version});
        //Assert
        await expect(page.locator(`#number${i + 1}Field`)).toBeVisible();
      });
    }
  });
});