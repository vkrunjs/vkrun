# VkrunJS Releases

## 1.7.0
- change build from commonjs to ESNext

## 1.6.0
- oneOf and notOneOf methods of schema module must accept schemas as comparison
- add compileRegex util
- add to schema module validation of min, max, oneOf and notOneOf for arrays
- migrate schema documentation to official website
- change the default export of vkrun to the App module

## 1.5.0
- remove the use of customResponse from the app server, leaving it only for use by superRequest
- route matching refactoring

## 1.4.0
- add to the upload module greater flexibility in managing files in memory, validations and custom returns by error type
- remove all tests with axios
- parse form data return file size

## 1.3.0
- replace wildcard imports with explicit imports for modularization and change type names to avoid duplication between modules
- add singleFile and multipleFiles methods to the upload module with configuration options
- add to parseData return fieldName when content type is form data
- fix translation of sentences from Portuguese to English in the readme of the sample projects
- add benchmark example

## 1.2.0
- fix superRequest does not work with async handlers
- adjust setHeader to return vkrun custom response and all additional vkrun methods should return this

## 1.1.0
- swagger builder should accept default path change api-docs
- change the way to inject error handling into the app
- change variable name and export httpStatus
- ensure that all methods in the schema module replace valueName and value in the error message

## 1.0.0
- official release

## 0.45.2
- updating incomplete package

## 0.45.0

- add mime function to return mime type from file extension
- add Mime documentation
- add sample projects to Mime with javascript and typescript
- super request return buffer string
- add serve static file middleware to serve files from a path
- add serve static file documentation
- add sample projects to serve static file with javascript and typescript

## 0.44.0

- add support for wildcard routes
- add SwaggerBuilder to dynamically work with Swagger OpenAPI documentation with flexible route visibility and multi-server support
- add SwaggerBuilder documentation
- add sample projects to SwaggerBuilder with javascript and typescript

## 0.43.0

- fix ensure isNumber returns false for NaN values
- add support BigInt parsing for large integers
- add util isBigInt
- add bigInt method to schema with sub methods min, max, positive and negative

## 0.42.4

- add sample projects to cors with javascript and typescript
- add sample projects to jwt with javascript and typescript
- add sample projects to logger with javascript and typescript
- add sample projects to validate route data with javascript and typescript
- add sample projects to rate limit with javascript and typescript
- add sample projects to schema with javascript and typescript
- add sample projects to super request with javascript and typescript

## 0.42.3

- link example projects to readme

## 0.42.2

- add sample projects to parse data with javascript and typescript
- fix when not post, put and patch protocol return empty body object
- fix parameter followed by query is not parsed

## 0.42.1

- update to generate release 0.42.0

## 0.42.0

- parse data convert files in memory when content-type is multipart/form-data
- add the parseData module as a method in app
- add upload middleware to save files
- add upload documentation
- add super request documentation
- super request accepts FormData without declaring the content-type
- add cors documentation
- add parse data documentation
- add rate limit documentation
- add validate route data documentation

## 0.41.1

- previous package did not include all new features

## 0.41.0

- add documentation for the methods min, max, positive, negative, notEqual, oneOf, and notOneOf of the schema module
- add test for submethods min, max, positive and positive from the number method to the array method
- add notEqual, ofOne and notOneOf methods to the schema module
- add utils regexMatch, isNotEqual, ofOne and notOneOf

## 0.40.0

- add validate negative number
- add validate positive number
- add validate min number
- add validate max number
- add validate nullable
- fix user session crashing when there is an attempt to use access credentials on another machine
- fix log file name format in Logger module is invalid on Windows

## 0.39.2

- fix user session crashing when there is an attempt to use access credentials on another machine

## 0.39.1

- remove console log

## 0.39.0

- add default attributes to session instance

## 0.38.4

- session remove cookies only in correct scenarios

## 0.38.3

- remove console log

## 0.38.2

- remove console logs

## 0.38.1

- remove default parameters from setCookie method


## 0.38.0

- session instance receiving cookie attributes

## 0.37.0

- add signOut method to session module
- add clearCookie method to response

## 0.36.0

- adjust the router to work with multiple router instances and create a route directly in the app

## 0.35.0

- change create session from middleware to function
- fix export types jwt module
- create mapping from http status code

## 0.34.3

### Minor Changes

- change Vkrun link in module documentation.

## 0.34.2

### Minor Changes

- fix build package from latest version v0.34.0 and v0.34.1.

## 0.34.1

### Minor Changes

- add Logger module documentation link to Vkrun Readme.

## 0.34.0

### Minor Changes

- add documentation for Logger module.
- change createLogger function name to Logger.
- add support for creating error log directly with the error in the Logger module.
- fix summary links.

## 0.29.0

### Minor Changes

- change export of modules.

## 0.28.0

### Minor Changes

- c5efc38: add documentation for router module

## 0.27.0

### Minor Changes

- 5b22289: update readme for framework
  add LICENSE
  add contributing document
  add installation guide document
  add security document
  add code of conduct document
  add hello world code example for javascript and typescript

## 0.26.0

### Minor Changes

- a2f48eb: change function name

## 0.25.0

### Minor Changes

- 70ab3f3: fix export app

## 0.24.0

### Minor Changes

- 1a011a8: export default app

## 0.23.0

### Minor Changes

- 563888a: router when running the middleware is not skipping the error handler

## 0.22.1

### Patch Changes

- f60b366: transform lib into framework

## 0.22.0

### Minor Changes

- 33e5e70: refactor logger

## 0.21.0

### Minor Changes

- c0a85ab: change path in config logger

## 0.20.0

### Minor Changes

- a8688a7: create logger module to create log files

## 0.19.0

### Minor Changes

- d2e949f: create module for schema

## 0.18.0

### Minor Changes

- ab67446: change filename

## 0.17.0

### Minor Changes

- bf7728c: refactor setLocation

## 0.16.1

### Patch Changes

- dc3564d: docs: update README

## 0.16.0

### Minor Changes

- 5cded14: validate return a test

## 0.15.0

### Minor Changes

- 5e548fc: refactor location modules"
- ae8123a: refactor setTranslationMessage function and create tests to achieve 100% test coverage
- e2ffee8: refactor setTranslationMessage and leave it with 100% test coverage

## 0.14.0

### Minor Changes

- f3f2954: automating deployment
