# Introduction
This repository is used to fight automatically on LeekWars.

# Prerequisites
- NPM 6.14.8+ (if you want to run tests with the GUI of Cypress)

# Installation
Clone the repository in your workspace
```bash
git clone git@github.com:cyprille/cypress-leek.git
```
Run the Makefile to configure the project and install dependencies
```bash
make install
```
Test the Cypress install
```bash
npm test
````

**The Cypress GUI will start automatically at the end of the process.**

# Execute tests
## Launch Cypress with the graphical interface
```bash
make launch
```
Then, you just have to click on the test you want to run.

## Run Cypress in headless mode and generate reports
```bash
make run
```
