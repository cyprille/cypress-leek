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
This option allows you to select wich tests you want to run (one or all).
Firs you need to have _Cypress_ installed locally (be sure to install the same version than this project).
```bash
npx cypress open
```
Then, you just have to click on the test you want to run.

## Launch Cypress in headless mode
This is an example using the `run --spec` command.

```bash
npx cypress run --spec './cypress/<PATH>/<SCRIPT>.js'
```
