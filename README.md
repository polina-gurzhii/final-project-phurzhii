Polina`s Playwright final project, YAJSC 


## Requirements

* You should have any git client installed
* NodeJS 20 or higher
* VSCode

## Getting Started

To run the project locally, follow these steps:

1.  Clone the repository:

    ```bash
    git clone [https://github.com/polina-gurzhii/final-project-phurzhii.git](https://github.com/polina-gurzhii/final-project-phurzhii.git)
    ```

2.  Navigate to the project directory:

    ```bash
    cd final-project-phurzhii
    ```

3.  Install Node.js dependencies:

    ```bash
    npm install
    ```

4.  Install the `dotenv` package:

    ```bash
    npm install dotenv
    ```

5.  Initialize Playwright:

    ```bash
    npm init playwright@latest
    ```

    * During Playwright initialization, you will be prompted to select a language, chose TypeScript, add a GitHub Actions workflow, and install browsers.

## Using `dotenv`

1.  Create a `.env` file in the root directory of the project.
2.  Add environment variables to the `.env` file in the format `KEY=VALUE`. 
3.  In your JavaScript or TypeScript code, import and configure `dotenv`. For example:

    const baseUrl = process.env.BASE_URL;

    console.log(baseUrl);
    ```

## Running Tests

To run Playwright tests, execute the following command:

```bash
npx playwright test
```

View the test report:

```bash
npx playwright show-report
 ```