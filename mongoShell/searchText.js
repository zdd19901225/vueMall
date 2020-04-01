var db = connect('company');
db.textContent.insert({content:'I am Daniel,I am a boy,I like blue,I can jump,I am from China,I like English, I study in ABIE'});
db.textContent.insert({content:'I am zdd,I am a programmer, I love my family,I like to read~'});

db.textContent.find(
    {$text:{$search:'programmer'}}
)