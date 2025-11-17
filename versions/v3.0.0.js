// Version 3.0.0 Data
const version3_0_0 = {
    version: 'v3.0.0',
    releaseDate: '2024-04-01',
    status: 'planned',
    description: 'Upcoming features and improvements planned for the next major release.',
    whatsNew: [
        'Middleware pipeline improvements',
        'Event system implementation',
        'Enhanced caching mechanisms',
        'API rate limiting',
        'Database migrations',
        'Testing framework integration'
    ],
    improvements: [
        'Better middleware execution order',
        'Event-driven architecture',
        'Multi-driver cache support',
        'Request throttling',
        'Schema versioning',
        'Unit and integration tests'
    ],
    features: {
        'Middleware Pipeline': {
            description: 'Improved middleware execution with better ordering and priority',
            icon: 'bi-funnel',
            color: 'primary',
            code: 'Middleware::pipe([...middlewares])'
        },
        'Event System': {
            description: 'Event-driven architecture for better extensibility',
            icon: 'bi-broadcast',
            color: 'info',
            code: 'Event::dispatch(\'user.created\', $user);'
        },
        'Enhanced Caching': {
            description: 'Support for multiple cache drivers (Redis, Memcached, File)',
            icon: 'bi-hdd-stack',
            color: 'success',
            code: 'Cache::driver(\'redis\')->remember(...)'
        },
        'API Rate Limiting': {
            description: 'Built-in rate limiting for API endpoints',
            icon: 'bi-speedometer2',
            color: 'warning',
            code: 'RateLimiter::for(\'api\', 60)'
        },
        'Database Migrations': {
            description: 'Version control for database schema changes',
            icon: 'bi-arrow-repeat',
            color: 'danger',
            code: 'php migrate:up'
        },
        'Testing Framework': {
            description: 'Integrated testing framework for unit and integration tests',
            icon: 'bi-check-circle',
            color: 'dark',
            code: 'php test:run'
        }
    },
    comparison: {
        'Error Handling': { current: 'Enhanced with context', previous: 'Comprehensive with logging' },
        'Route Caching': { current: 'Multi-level caching', previous: 'Pattern caching' },
        'Code Documentation': { current: 'Full PHPDoc', previous: 'Full PHPDoc' },
        'Type Hints': { current: 'Complete', previous: 'Complete' },
        'Logging System': { current: 'Structured logging', previous: 'Integrated throughout' },
        'Resource Cleanup': { current: 'Proper cleanup', previous: 'Proper cleanup' },
        'Query Building': { current: 'Enhanced builder', previous: 'Separated methods' },
        'Input Validation': { current: 'Advanced rules', previous: 'Enhanced with logging' },
        'Database Error Handling': { current: 'Exception-based', previous: 'Exception-based' },
        'Controller Validation': { current: 'File & class checks', previous: 'File & class checks' }
    },
    changelog: [
        {
            component: 'Core/Middleware.php',
            changes: [
                'Improved middleware pipeline execution',
                'Added priority-based ordering',
                'Better error handling in middleware stack'
            ]
        },
        {
            component: 'Core/Event.php',
            changes: [
                'New event system implementation',
                'Event listeners and subscribers',
                'Event broadcasting support'
            ]
        },
        {
            component: 'Core/Cache.php',
            changes: [
                'Multi-driver cache support',
                'Redis and Memcached drivers',
                'Cache tagging and invalidation'
            ]
        }
    ]
};

