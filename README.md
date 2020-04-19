# projekt-io

React-native mobile application, with node.js server managing database.
Project is done for university course of Software Engineering.


## Pull requests rules:

1. All new additions to master should be done through new pull request.
1. Pull request will be merged when all workflows succeed and at least one person approves merge.

## Branch naming rules:
1. All branches should have descriptive names
1. Using uppercase in branch name is forbidden
1. Every branch should be preceded with tag stating what work is done, such as:
- bugfix - gixes bug, should contain bug description in branch name 
- feature - adds new feature, should contain feature description in branch name
- release - leaves specific application version to be released, should contain version number in branch name
- hotfix - Bug fix on release branch, should contain version number and bug description in branch name
- config - maintenance work on repo, README updates, etc.


## QuickStart
1. Make sure you have node.js and npm installed.
1. To start server type: 
    - ```cd server ```
    - ``` npm i```
    - ``` npm start```
1. Server now runs on localhost:8000