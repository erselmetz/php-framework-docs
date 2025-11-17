# Version X.X.X Change Log

**Release Date:** YYYY-MM-DD  
**Status:** stable | beta | planned

## Description
Brief description of this version release.

## What's New
- Feature 1
- Feature 2
- Feature 3

## Improvements
- Improvement 1
- Improvement 2

## Features

### Feature Name 1
- **Description:** Brief description of the feature
- **Icon:** Bootstrap icon class (e.g., `bi-router`)
- **Color:** Bootstrap color class (e.g., `primary`, `success`, `info`, `warning`, `danger`, `dark`)
- **Code Example (optional):** 
  ```php
  // Code snippet showing the feature
  ```

### Feature Name 2
- **Description:** Brief description
- **Icon:** `bi-icon-name`
- **Color:** `primary`

## Comparison (vs Previous Version)

| Feature | Previous Version | Current Version |
|---------|-----------------|-----------------|
| Error Handling | Basic | Comprehensive with logging |
| Route Caching | None | Pattern caching |
| Code Documentation | Minimal | Full PHPDoc |

## Changelog by Component

### Core/App.php
- Change 1
- Change 2
- Change 3

### Core/Router.php
- Change 1
- Change 2

### Core/Database.php
- Change 1
- Change 2

### App/Models/User.php
- Change 1
- Change 2

### App/Controllers/Api.php
- Change 1
- Change 2

## Tutorials

### Routing
#### Section: Defining Routes
- **Heading:** Defining Routes
- **Content:** Routes are defined in `routes.php`. Each route needs a method, path, controller, and action.
- **Code:**
  ```php
  <?php
  
  return [
      'home' => [
          'method' => 'GET',
          'path' => '/',
          'controller' => 'html',
          'action' => 'index',
      ],
  ];
  ```
- **Explanation:**
  - `method`: HTTP method (GET, POST, PUT, DELETE)
  - `path`: URL pattern with optional parameters like `{id}`
  - `controller`: Controller class name (without .php extension)
  - `action`: Method name in the controller

#### Section: Route Parameters
- **Heading:** Route Parameters
- **Content:** Routes can accept parameters in the URL path using curly braces.
- **Code:**
  ```php
  // Code example
  ```
- **Explanation:**
  - Explanation point 1
  - Explanation point 2

### Database
#### Section: Basic Queries
- **Heading:** Basic Queries
- **Content:** The query builder provides a fluent interface for building database queries.
- **Code:**
  ```php
  // Code example
  ```
- **Explanation:**
  - Explanation point 1
  - Explanation point 2

### Validation
#### Section: Validating Input
- **Heading:** Validating Input
- **Content:** Use the validator to validate form data with rules.
- **Code:**
  ```php
  // Code example
  ```
- **Explanation:**
  - Explanation point 1
  - Explanation point 2

### Views
#### Section: Rendering Views
- **Heading:** Rendering Views
- **Content:** Use the `view()` method to render templates with data.
- **Code:**
  ```php
  // Code example
  ```
- **Explanation:**
  - Explanation point 1
  - Explanation point 2

### CSRF
#### Section: Adding CSRF Token to Forms
- **Heading:** Adding CSRF Token to Forms
- **Content:** Protect your forms from CSRF attacks by including a CSRF token.
- **Code:**
  ```html
  <!-- Code example -->
  ```
- **Explanation:**
  - Explanation point 1
  - Explanation point 2

### Upload
#### Section: Handling File Uploads
- **Heading:** Handling File Uploads
- **Content:** Use the Upload class to handle file uploads with validation.
- **Code:**
  ```php
  // Code example
  ```
- **Explanation:**
  - Explanation point 1
  - Explanation point 2

## Notes
Any additional notes or important information about this version.

