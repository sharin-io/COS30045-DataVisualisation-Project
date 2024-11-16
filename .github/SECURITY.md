# Security Policy

## Project Status

This project is now complete and in maintenance mode. While we continue to monitor for security issues, updates will primarily address critical security concerns.

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Reporting a Security Issue

If you discover a security vulnerability within the ASEAN Health Statistics Visualization project:

1. **DO NOT** create a public GitHub issue
2. Contact the project maintainers:
   - SHIN THANT THI RI (@sharin-io)
   - YADANAR THEINT (@Treasure-Mei-box)
3. Include:
   - Type of issue
   - Location of the affected source code
   - Any special configuration required to reproduce the issue
   - Step-by-step instructions to reproduce the issue
   - Proof-of-concept or exploit code (if possible)
   - Impact of the issue

## Security Best Practices

For users implementing this visualization:

1. **Data Handling**
   - Keep source data files in a secure location
   - Validate all data inputs
   - Sanitize user inputs if extending the visualization

2. **Implementation**
   - Keep all dependencies updated
   - Use the latest stable version
   - Implement appropriate access controls
   - Follow secure coding practices

3. **Deployment**
   - Use HTTPS for live deployments
   - Implement appropriate CORS policies
   - Regular security audits of deployed instances

## Response Process

1. Confirmation of receipt within 48 hours
2. Assessment of the reported vulnerability
3. Development of fixes if validated
4. Release of security patches as needed

## Attribution

We will acknowledge security researchers who responsibly disclose vulnerabilities, if they wish to be credited.

## Contact

For any security-related questions, contact the project maintainers through GitHub.
