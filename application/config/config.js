var config = new Array;
config['hostname'] = '127.0.0.1';
config['enc_key'] = 'noderacer';
config['enc_method_default']='aes192';//'aes-256-cbc'
config['enc_method_url']='RC4-40';//'aes-256-cbc'

module.exports=main;
function main() {};
main.prototype.cfg=config;