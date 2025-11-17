# Change Log Documentation Guide

This directory contains change log files for each version of the PHP Framework. These markdown files make it easy to track and document changes, which can then be used to update the version data files (`vX.X.X.js`).

## File Naming Convention

Change log files should be named: `vX.X.X-changelog.md`

Examples:
- `v1.0.0-changelog.md`
- `v2.0.0-changelog.md`
- `v3.0.0-changelog.md`

## Template

Use `CHANGELOG_TEMPLATE.md` as a starting point when creating a new version's change log.

## Structure

Each change log file should include:

1. **Header Information**
   - Release Date
   - Status (stable, beta, planned)

2. **Description**
   - Brief overview of the version

3. **What's New**
   - List of new features

4. **Improvements**
   - List of improvements to existing features

5. **Features**
   - Detailed feature descriptions with icons and colors

6. **Comparison Table**
   - Side-by-side comparison with previous version

7. **Changelog by Component**
   - Changes organized by file/component

8. **Tutorials**
   - Tutorial content for each tutorial section
   - Code examples
   - Explanations

## How to Use

1. **When creating a new version:**
   - Copy `CHANGELOG_TEMPLATE.md` to `vX.X.X-changelog.md`
   - Fill in all the sections with your changes
   - Follow the existing format for consistency

2. **When updating documentation:**
   - Update the change log file with your changes
   - The AI assistant can then read the change log and update the corresponding `vX.X.X.js` file automatically

3. **Tutorial Sections:**
   - Each tutorial (routing, database, validation, views, csrf, upload) should have its sections
   - Include heading, content, code, and explanation for each section
   - Mark new features with "New in vX.X.X:" in explanations

## Tips

- Be specific and detailed in your descriptions
- Include code examples where relevant
- Use consistent formatting
- Mark breaking changes clearly
- Note backward compatibility status
- Include migration notes if needed

## Example Workflow

1. You make changes to the framework
2. You update `v3.0.0-changelog.md` with all the changes
3. You ask the AI: "Update v3.0.0.js based on v3.0.0-changelog.md"
4. The AI reads the change log and updates the JavaScript file accordingly

This makes it much easier to maintain accurate documentation!

