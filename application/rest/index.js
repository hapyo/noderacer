module.exports = router;
/*
 * For Developer Route define Here!
 * URL Ex : /hello
 */
router.get('/hello', function(req, res) {   
    res.writeHead(200, { 'Content-Type': 'text/html'});       
    res.end('OK');
});
