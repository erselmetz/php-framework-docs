// Version 1.0.0 Data
const version1_0_0 = {
    version: 'v1.0.0',
    releaseDate: '2024-01-01',
    status: 'stable',
    description: 'Initial release of PHP Framework with core features.',
    whatsNew: [
        'Basic routing system',
        'Database query builder',
        'CSRF protection',
        'File upload handling',
        'Form validation',
        'View system with layouts'
    ],
    improvements: [],
    features: {
        'Basic Routing': {
            description: 'Simple route matching and controller dispatching',
            icon: 'bi-router',
            color: 'primary'
        },
        'Database Query Builder': {
            description: 'Fluent interface for database queries',
            icon: 'bi-database',
            color: 'info'
        },
        'CSRF Protection': {
            description: 'Basic CSRF token generation and validation',
            icon: 'bi-shield-check',
            color: 'success'
        },
        'File Upload': {
            description: 'File upload handling with validation',
            icon: 'bi-file-earmark-arrow-up',
            color: 'warning'
        },
        'Form Validation': {
            description: 'Input validation with rules',
            icon: 'bi-check2-square',
            color: 'danger'
        },
        'View System': {
            description: 'Template rendering with layouts',
            icon: 'bi-view-stacked',
            color: 'dark'
        }
    },
    comparison: {
        'Error Handling': { current: 'Basic', previous: 'N/A' },
        'Route Caching': { current: 'None', previous: 'N/A' },
        'Code Documentation': { current: 'Minimal', previous: 'N/A' },
        'Type Hints': { current: 'Partial', previous: 'N/A' },
        'Logging System': { current: 'Not used', previous: 'N/A' },
        'Resource Cleanup': { current: 'Missing', previous: 'N/A' },
        'Query Building': { current: 'Inline', previous: 'N/A' },
        'Input Validation': { current: 'Basic', previous: 'N/A' },
        'Database Error Handling': { current: 'Basic echo', previous: 'N/A' },
        'Controller Validation': { current: 'None', previous: 'N/A' }
    },
    changelog: [
        {
            component: 'Core/App.php',
            changes: [
                'Basic routing implementation',
                'Controller loading',
                'Method resolution',
                'URL parsing'
            ]
        },
        {
            component: 'Core/Router.php',
            changes: [
                'Route matching',
                'Named routes',
                'URL generation'
            ]
        },
        {
            component: 'Core/Database.php',
            changes: [
                'Query builder implementation',
                'Fluent interface',
                'Basic connection handling'
            ]
        },
        {
            component: 'Core/Controller.php',
            changes: [
                'Base controller class',
                'View rendering',
                'Response helpers'
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
];`,
                    explanation: [
                        '<code>method</code>: HTTP method (GET, POST, PUT, DELETE)',
                        '<code>path</code>: URL pattern with optional parameters like <code>{id}</code>',
                        '<code>controller</code>: Controller class name (without .php extension)',
                        '<code>action</code>: Method name in the controller'
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

$users = Database::table('users')->get();

$activeUsers = Database::table('users')
    ->where('status = "active"')
    ->orderBy('created_at DESC')
    ->limit(10)
    ->get();`,
                    explanation: [
                        '<code>table(\'name\')</code>: Sets the table name',
                        '<code>where(\'condition\')</code>: Adds WHERE clause',
                        '<code>orderBy(\'column\')</code>: Adds ORDER BY clause',
                        '<code>limit(number)</code>: Limits the number of results',
                        '<code>get()</code>: Executes the query and returns array of results'
                    ]
                }
            ]
        },
        'validation': {
            title: 'Form Validation',
            sections: [
                {
                    heading: 'Validating Input',
                    content: 'Use the validator to validate form data with rules.',
                    code: `<?php

$validator = $this->validate($_POST, [
    'name' => 'required|min:3|max:50',
    'email' => 'required|email',
    'password' => 'required|min:8',
]);

if ($validator->fails()) {
    flash('errors', $validator->errors());
    return $this->back();
}`,
                    explanation: [
                        '<code>required</code>: Field must be present and not empty',
                        '<code>min:X</code>: Minimum length for strings',
                        '<code>max:X</code>: Maximum length for strings',
                        '<code>email</code>: Must be valid email format'
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
    public function show($params)
    {
        $user = User::find($params[0]);
        
        $this->view('user/show', [
            'user' => $user,
            'title' => 'User Profile'
        ]);
    }
}`,
                    explanation: [
                        'Layout files are stored in <code>app/views/layouts/</code>',
                        'The view content is inserted into <code>$content</code> variable',
                        'You can set a default layout in the controller'
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
                        '<code>csrf_field()</code>: Generates a hidden input with the CSRF token',
                        'The token is stored in the session and validated on each POST request',
                        'If the token doesn\'t match, the request is rejected'
                    ]
                }
            ]
        },
        'upload': {
            title: 'File Upload',
            sections: [
                {
                    heading: 'Handling File Uploads',
                    content: 'Use the Upload class to handle file uploads with validation.',
                    code: `<?php

use Core\Upload;

$file = Upload::make('file')
    ->allowed(['jpg', 'jpeg', 'png', 'pdf'])
    ->maxSize(5242880) // 5MB
    ->path('storage/uploads')
    ->store();`,
                    explanation: [
                        '<code>make(\'field\')</code>: Specify the file input name',
                        '<code>allowed([\'ext1\', \'ext2\'])</code>: Set allowed file extensions',
                        '<code>maxSize(bytes)</code>: Set maximum file size',
                        '<code>store()</code>: Saves the file and returns the filename'
                    ]
                }
            ]
        }
    }
};

