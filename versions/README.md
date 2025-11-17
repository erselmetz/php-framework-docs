# Version Files

Each version has its own separate file for easy maintenance and organization.

## File Structure

- `v1.0.0.js` - Version 1.0.0 data
- `v2.0.0.js` - Version 2.0.0 data
- `v3.0.0.js` - Version 3.0.0 data (planned)
- `v4.0.0.js` - Version 4.0.0 data (planned)

## Adding a New Version

To add a new version (e.g., v3.0.0):

1. Create a new file `v3.0.0.js` in this directory
2. Use the following template:

```javascript
// Version 3.0.0 Data
const version3_0_0 = {
    version: 'v3.0.0',
    releaseDate: '2024-04-01',
    status: 'stable', // or 'planned'
    description: 'Description of this version',
    whatsNew: [
        'Feature 1',
        'Feature 2',
        // ...
    ],
    improvements: [
        'Improvement 1',
        'Improvement 2',
        // ...
    ],
    features: {
        'Feature Name': {
            description: 'Feature description',
            icon: 'bi-icon-name',
            color: 'primary', // primary, success, danger, warning, info, dark
            code: 'Code example' // optional
        },
        // ...
    },
    comparison: {
        'Feature': { current: 'Current state', previous: 'Previous state' },
        // ...
    },
    changelog: [
        {
            component: 'Component/File.php',
            changes: [
                'Change 1',
                'Change 2',
                // ...
            ]
        },
        // ...
    ]
};
```

3. Register the version in `versions.js`:

```javascript
const versionRegistry = {
    // ... existing versions
    'v3.0.0': () => version3_0_0
};
```

4. Add the script tag to `index.html`:

```html
<script src="versions/v3.0.0.js"></script>
```

## Benefits

- **Easy to maintain**: Each version is in its own file
- **Better organization**: Clear separation of concerns
- **Version control friendly**: Changes to one version don't affect others
- **Scalable**: Easy to add new versions without cluttering

## Version Data Structure

Each version file exports a constant with the following structure:

- `version`: Version string (e.g., 'v2.0.0')
- `releaseDate`: Release date (YYYY-MM-DD format)
- `status`: 'stable' or 'planned'
- `description`: Brief description of the version
- `whatsNew`: Array of new features
- `improvements`: Array of improvements over previous version
- `features`: Object with feature details
- `comparison`: Object with comparison data
- `changelog`: Array of component changes

