// Version 2.0.0 Data
const version1_1_0_beta = {
    version: 'v1.1.0-beta',
    releaseDate: '2024-02-15',
    status: 'stable',
    description: 'Major improvements in code quality, performance, and developer experience.',
    whatsNew: [
        'Enhanced error handling with logging',
        'Route pattern caching for performance',
        'Comprehensive PHPDoc documentation',
        'Complete type hints throughout codebase',
        'Integrated logging system',
        'Proper resource management'
    ],
    improvements: [
        'Route caching reduces compilation overhead',
        'Comprehensive error logging for debugging',
        'Type safety improves code reliability',
        'Better resource cleanup prevents memory leaks'
    ],
    features: {
        'Enhanced Error Handling': {
            description: 'Comprehensive try-catch blocks with detailed logging using Logger class',
            icon: 'bi-exclamation-triangle',
            color: 'danger',
            code: 'Logger::error("Message", [\'context\' => \'data\']);'
        },
        'Route Pattern Caching': {
            description: 'Compiled route patterns are cached to avoid recompiling on every request',
            icon: 'bi-lightning',
            color: 'warning',
            code: 'private static $compiledRoutes = [];'
        },
        'Comprehensive Documentation': {
            description: 'All classes, methods, and functions now have PHPDoc comments',
            icon: 'bi-file-text',
            color: 'info',
            code: '/** @param string $name Route name */'
        },
        'Type Safety': {
            description: 'Added type hints throughout the codebase for better IDE support',
            icon: 'bi-shield-check',
            color: 'success',
            code: 'public function find(int $id): ?array'
        },
        'Resource Management': {
            description: 'Proper cleanup of database connections and result sets',
            icon: 'bi-recycle',
            color: 'primary',
            code: '$result->free(); $db->close();'
        },
        'Improved Query Building': {
            description: 'Separated query building logic into dedicated methods',
            icon: 'bi-code-square',
            color: 'dark',
            code: 'private static function buildQuery(): string'
        }
    },
    comparison: {
        'Error Handling': { current: 'Comprehensive with logging', previous: 'Basic' },
        'Route Caching': { current: 'Pattern caching', previous: 'None' },
        'Code Documentation': { current: 'Full PHPDoc', previous: 'Minimal' },
        'Type Hints': { current: 'Complete', previous: 'Partial' },
        'Logging System': { current: 'Integrated throughout', previous: 'Not used' },
        'Resource Cleanup': { current: 'Proper cleanup', previous: 'Missing' },
        'Query Building': { current: 'Separated methods', previous: 'Inline' },
        'Input Validation': { current: 'Enhanced with logging', previous: 'Basic' },
        'Database Error Handling': { current: 'Exception-based', previous: 'Basic echo' },
        'Controller Validation': { current: 'File & class checks', previous: 'None' }
    },
    changelog: [
        {
            component: 'Core/App.php',
            changes: [
                'Added comprehensive error handling with try-catch blocks',
                'Integrated Logger for error tracking',
                'Added controller file and class existence validation',
                'Added method existence checks before execution',
                'Improved error messages with context',
                'Added PHPDoc comments for all methods',
                'Added type hints for better type safety'
            ]
        },
        {
            component: 'Core/Router.php',
            changes: [
                'Added route pattern caching to improve performance',
                'Compiled patterns stored in static cache',
                'Cache cleared only on route reload',
                'Added comprehensive PHPDoc documentation',
                'Improved code comments for clarity'
            ]
        },
        {
            component: 'Core/Database.php',
            changes: [
                'Separated query building into buildQuery() method',
                'Added proper error handling with exceptions',
                'Integrated Logger for database errors',
                'Added result set cleanup (free())',
                'Improved connection error handling',
                'Added type hints throughout',
                'Added comprehensive PHPDoc comments'
            ]
        },
        {
            component: 'App/Models/User.php',
            changes: [
                'Added try-catch blocks for all methods',
                'Integrated Logger for error tracking',
                'Added input validation before operations',
                'Proper database connection cleanup',
                'Better error messages with context',
                'Added return type hints',
                'Added comprehensive documentation'
            ]
        },
        {
            component: 'App/Controllers/Api.php',
            changes: [
                'Added comprehensive error handling',
                'Integrated Logger throughout',
                'Added early returns for better flow',
                'Improved error messages',
                'Added file upload validation',
                'Better fallback handling for users endpoint',
                'Added PHPDoc comments'
            ]
        }
    ],
    tutorials: {
        'routing': {
            title: 'Routing',
            sections: [
                {
                    heading: 'Defining Routes',
                    content: 'Routes are defined in <code>routes.php</code>. Each route needs a method, path, controller, and action.',
                    code: `<?php

return [
    'home' => [
        'method' => 'GET',
        'path' => '/',
        'controller' => 'html',
        'action' => 'index',
    ],
    'user.show' => [
        'method' => 'GET',
        'path' => '/user/{id}',
        'controller' => 'user',
        'action' => 'show',
    ],
    'user.store' => [
        'method' => 'POST',
        'path' => '/user',
        'controller' => 'user',
        'action' => 'store',
        'middleware' => ['csrf', 'auth']
    ],
];`,
                    explanation: [
                        '<code>method</code>: HTTP method (GET, POST, PUT, DELETE)',
                        '<code>path</code>: URL pattern with optional parameters like <code>{id}</code>',
                        '<code>controller</code>: Controller class name (without .php extension)',
                        '<code>action</code>: Method name in the controller',
                        '<code>middleware</code>: Array of middleware to run before the action (optional)'
                    ]
                },
                {
                    heading: 'Route Parameters',
                    content: 'Routes can accept parameters in the URL path using curly braces.',
                    code: `<?php

return [
    'post.show' => [
        'method' => 'GET',
        'path' => '/post/{id}',
        'controller' => 'post',
        'action' => 'show',
    ],
];`,
                    explanation: [
                        'Parameters are defined using <code>{param}</code> syntax',
                        'Parameters are passed to the controller action as an array',
                        'Access parameters using <code>$params[0]</code>, <code>$params[1]</code>, etc.'
                    ]
                }
            ]
        },
        'database': {
            title: 'Database Query Builder',
            sections: [
                {
                    heading: 'Basic Queries',
                    content: 'The query builder provides a fluent interface for building database queries.',
                    code: `<?php

use Connection\Database;
use Core\Logger;

try {
    $users = Database::table('users')->get();
    
    $activeUsers = Database::table('users')
        ->where('status = "active"')
        ->orderBy('created_at DESC')
        ->limit(10)
        ->get();
} catch (\\Exception $e) {
    Logger::error("Database query failed", ['error' => $e->getMessage()]);
}`,
                    explanation: [
                        '<code>table(\'name\')</code>: Sets the table name',
                        '<code>where(\'condition\')</code>: Adds WHERE clause',
                        '<code>orderBy(\'column\')</code>: Adds ORDER BY clause',
                        '<code>limit(number)</code>: Limits the number of results',
                        '<code>get()</code>: Executes the query and returns array of results',
                        '<strong>New in v1.1.0-beta:</strong> Enhanced error handling with Logger integration'
                    ]
                },
                {
                    heading: 'Using Models',
                    content: 'Models provide a cleaner interface for database operations with built-in error handling.',
                    code: `<?php

class UserController extends Controller
{
    public function show($params)
    {
        $id = $params[0] ?? null;
        
        // Find user by ID with automatic error handling
        $user = User::find($id);
        
        if (!$user) {
            return $this->error('User not found', 404);
        }
        
        return $this->json($user);
    }
}`,
                    explanation: [
                        'Models include built-in error handling and logging',
                        'Methods return null on failure instead of throwing exceptions',
                        'All database errors are automatically logged'
                    ]
                }
            ]
        },
        'validation': {
            title: 'Form Validation',
            sections: [
                {
                    heading: 'Validating Input',
                    content: 'Use the validator to validate form data with rules. Enhanced with better error handling in v1.1.0-beta.',
                    code: `<?php

use Core\Logger;

try {
    $validator = $this->validate($_POST, [
        'name' => 'required|min:3|max:50',
        'email' => 'required|email|unique:users',
        'password' => 'required|min:8|confirmed',
    ]);
    
    if ($validator->fails()) {
        flash('errors', $validator->errors());
        return $this->back();
    }
    
    $data = $validator->validated();
} catch (\\Exception $e) {
    Logger::error("Validation failed", ['error' => $e->getMessage()]);
}`,
                    explanation: [
                        '<code>required</code>: Field must be present and not empty',
                        '<code>min:X</code>: Minimum length for strings',
                        '<code>max:X</code>: Maximum length for strings',
                        '<code>email</code>: Must be valid email format',
                        '<code>unique:table</code>: Must be unique in the specified table',
                        '<strong>New in v1.1.0-beta:</strong> Enhanced error logging for validation failures'
                    ]
                }
            ]
        },
        'views': {
            title: 'Views & Templates',
            sections: [
                {
                    heading: 'Rendering Views',
                    content: 'Use the <code>view()</code> method to render templates with data.',
                    code: `<?php

class UserController extends Controller
{
    protected $layout = 'main'; // Default layout
    
    public function show($params)
    {
        $user = User::find($params[0]);
        
        // Render view with data
        $this->view('user/show', [
            'user' => $user,
            'title' => 'User Profile'
        ]);
    }
}`,
                    explanation: [
                        'Layout files are stored in <code>app/views/layouts/</code>',
                        'The view content is inserted into <code>$content</code> variable',
                        'You can set a default layout in the controller with <code>protected $layout</code>',
                        'Override layout per view by passing it as third parameter'
                    ]
                }
            ]
        },
        'csrf': {
            title: 'CSRF Protection',
            sections: [
                {
                    heading: 'Adding CSRF Token to Forms',
                    content: 'Protect your forms from CSRF attacks by including a CSRF token.',
                    code: `<form method="POST" action="<?= route('user.store') ?>">
    <?= csrf_field() ?>
    
    <input type="text" name="name" required>
    <button type="submit">Submit</button>
</form>`,
                    explanation: [
                        '<code>csrf_field()</code>: Generates a hidden input with the CSRF token automatically',
                        'The token is stored in the session and validated on each POST request',
                        'If the token doesn\'t match, the request is rejected',
                        'Tokens are regenerated periodically for security'
                    ]
                },
                {
                    heading: 'Protecting Routes',
                    content: 'Add CSRF middleware to routes that handle form submissions.',
                    code: `<?php

return [
    'user.store' => [
        'method' => 'POST',
        'path' => '/user',
        'controller' => 'user',
        'action' => 'store',
        'middleware' => ['csrf']  // CSRF protection
    ],
];`,
                    explanation: [
                        'Add <code>\'middleware\' => [\'csrf\']</code> to protect routes',
                        'Middleware runs before the controller action',
                        'Automatically validates CSRF token for POST/PUT/DELETE requests'
                    ]
                }
            ]
        },
        'upload': {
            title: 'File Upload',
            sections: [
                {
                    heading: 'Handling File Uploads',
                    content: 'Use the Upload class to handle file uploads with validation. Enhanced error handling in v1.1.0-beta.',
                    code: `<?php

use Core\Upload;
use Core\Logger;

try {
    $file = Upload::make('file')
        ->allowed(['jpg', 'jpeg', 'png', 'pdf'])
        ->maxSize(5242880) // 5MB in bytes
        ->path('storage/uploads')
        ->store();
    
    return $this->success([
        'filename' => $file,
        'url' => assets('uploads/' . $file)
    ], 'File uploaded successfully');
    
} catch (\\Exception $e) {
    Logger::error("File upload failed", ['error' => $e->getMessage()]);
    return $this->error($e->getMessage(), 400);
}`,
                    explanation: [
                        '<code>make(\'field\')</code>: Specify the file input name from the form',
                        '<code>allowed([\'ext1\', \'ext2\'])</code>: Set allowed file extensions',
                        '<code>maxSize(bytes)</code>: Set maximum file size (1MB = 1048576 bytes)',
                        '<code>path(\'directory\')</code>: Set upload directory relative to project root',
                        '<code>store()</code>: Saves the file and returns the filename',
                        '<strong>New in v1.1.0-beta:</strong> Enhanced error handling with Logger integration'
                    ]
                }
            ]
        }
    }
};

