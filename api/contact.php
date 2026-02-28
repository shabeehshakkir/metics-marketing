<?php
/**
 * Metics Contact Form API
 * Receives form submissions and sends email to shabeeh@oxmics.com
 * 
 * Deploy alongside the static site or on any PHP-capable hosting.
 */

// ── CORS & Headers ──
header('Content-Type: application/json');
header('X-Content-Type-Options: nosniff');

// Allow requests from your domain (update in production)
$allowed_origins = [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://metics.io',
    'https://www.metics.io',
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $allowed_origins, true)) {
    header("Access-Control-Allow-Origin: $origin");
}

header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Accept');

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// Only accept POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// ── Configuration ──
$to_email    = 'shabeeh@oxmics.com';
$from_email  = 'noreply@oxmics.com';  // Change to your domain's email

// ── Rate Limiting (simple file-based) ──
$rate_limit_dir = sys_get_temp_dir() . '/metics_rate_limit';
if (!is_dir($rate_limit_dir)) {
    mkdir($rate_limit_dir, 0700, true);
}

$client_ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$rate_file = $rate_limit_dir . '/' . md5($client_ip);

if (file_exists($rate_file)) {
    $last_submit = (int) file_get_contents($rate_file);
    if (time() - $last_submit < 30) {
        http_response_code(429);
        echo json_encode(['error' => 'Too many requests. Please wait before trying again.']);
        exit;
    }
}

// ── Parse Input ──
$content_type = $_SERVER['CONTENT_TYPE'] ?? '';

if (strpos($content_type, 'application/json') !== false) {
    $raw = file_get_contents('php://input');
    $data = json_decode($raw, true);
} else {
    $data = $_POST;
}

if (empty($data)) {
    http_response_code(400);
    echo json_encode(['error' => 'No data received']);
    exit;
}

// ── Sanitize ──
function clean($value) {
    if (!is_string($value)) return '';
    return htmlspecialchars(strip_tags(trim($value)), ENT_QUOTES, 'UTF-8');
}

$firstName = clean($data['firstName'] ?? '');
$lastName  = clean($data['lastName'] ?? '');
$email     = filter_var(trim($data['email'] ?? ''), FILTER_VALIDATE_EMAIL);
$company   = clean($data['company'] ?? '');
$role      = clean($data['role'] ?? '');
$size      = clean($data['size'] ?? '');
$packages  = clean($data['packages'] ?? '');
$message   = clean($data['message'] ?? '');

// ── Honeypot Check ──
if (!empty($data['website'])) {
    // Bot detected — silently accept to not reveal the trap
    echo json_encode(['ok' => true]);
    exit;
}

// ── Validate Required Fields ──
if (empty($firstName) || empty($lastName)) {
    http_response_code(422);
    echo json_encode(['error' => 'First and last name are required.']);
    exit;
}

if (!$email) {
    http_response_code(422);
    echo json_encode(['error' => 'A valid email address is required.']);
    exit;
}

// ── Block Free Email Providers ──
$domain = strtolower(explode('@', $email)[1] ?? '');
$free_providers = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'aol.com', 'mail.com', 'protonmail.com', 'icloud.com'];
if (in_array($domain, $free_providers, true)) {
    http_response_code(422);
    echo json_encode(['error' => 'Please use your work email address.']);
    exit;
}

// ── Build Email ──
$subject = "Metics Demo Request from $firstName $lastName";

$body = "New demo request received from the Metics website.\n\n";
$body .= "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";
$body .= "Name:       $firstName $lastName\n";
$body .= "Email:      $email\n";
$body .= "Company:    " . ($company ?: 'Not provided') . "\n";
$body .= "Role:       " . ($role ?: 'Not provided') . "\n";
$body .= "Team Size:  " . ($size ?: 'Not provided') . "\n";
$body .= "Packages:   " . ($packages ?: 'Not provided') . "\n\n";
$body .= "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";
$body .= "Message:\n$message\n\n";
$body .= "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";
$body .= "Submitted: " . date('Y-m-d H:i:s T') . "\n";
$body .= "IP: $client_ip\n";

$headers = [
    "From: Metics Website <$from_email>",
    "Reply-To: $firstName $lastName <$email>",
    "X-Mailer: Metics-Contact-Form/1.0",
    "MIME-Version: 1.0",
    "Content-Type: text/plain; charset=UTF-8",
];

// ── Send ──
$sent = mail($to_email, $subject, $body, implode("\r\n", $headers));

if ($sent) {
    // Record rate limit
    file_put_contents($rate_file, time());

    echo json_encode(['ok' => true, 'message' => 'Your message has been sent. We will be in touch soon.']);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to send email. Please try again or contact us directly at shabeeh@oxmics.com.']);
}
