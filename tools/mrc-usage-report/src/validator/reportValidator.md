# Report Validator

This script is a command-line tool used to validate the generated JSON report. It checks for the presence of application and Micro-Frontend (MFE) data to ensure the report is not empty or incomplete.

## How it Works

The script performs the following validation checks:

1.  **Checks for Report Path**: It first ensures that a path to the report file is provided as a command-line argument.
2.  **Checks if Report File Exists**: It verifies that the report file actually exists at the specified path.
3.  **Parses the Report**: It reads and parses the JSON report file.
4.  **Validates Application Data**: It checks if the report contains any application data. If the report is empty, the validation fails.
5.  **Validates MFE Data**: It iterates through each application and ensures that it contains data for at least one MFE.
6.  **Validates Component Usage Data**: It checks each MFE to ensure that it has component usage data.

If any of these checks fail, the script will log an error message and exit with a non-zero status code. If all checks pass, it will log a success message.

## Usage

To use the validator, run the script from the command line and provide the path to the JSON report file as an argument:

```bash
node reportValidator.js /path/to/your/report.json
```
