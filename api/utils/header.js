/*
Handle Header Recommendation for OWASP security 
Source from https://cheatsheetseries.owasp.org/cheatsheets/REST_Security_Cheat_Sheet.html
*/

const header = {
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '0',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'no-referrer',
    'Cache-Control': 'no-store',
    'Content-Security-Policy': "frame-ancestors 'none'; default-src 'none'",
    'Feature-Policy': "'none'",
    'Content-Type': 'application/json',

}

module.exports = {
    header
};