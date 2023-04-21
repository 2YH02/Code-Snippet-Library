// based on https://github.com/ts95/lang-detector

/**
 * A checker is an object with the following form:
 *  { pattern: /something/, points: 1 }
 * or if the pattern only matches code near the top of a given file:
 *  { pattern: /something/, points: 2, nearTop: true }
 *
 * Key: Language name.
 * Value: Array of checkers.
 *
 * N.B. An array of checkers shouldn't contain more regexes than
 * necessary as it would inhibit performance.
 *
 * Points scale:
 *  2 = Bonus points:   Almost unique to a given language.
 *  1 = Regular point:  Not unique to a given language.
 * -1 = Penalty point:  Does not match a given language.
 * Rare:
 * -50 = Bonus penalty points: Only used when two languages are mixed together,
 *  and one has a higher precedence over the other one.
 */
var languages = {
  JavaScript: [
    { pattern: /undefined/g, points: 2 },
    { pattern: /console\.log( )*\(/, points: 2 },
    { pattern: /(var|const|let)( )+\w+( )*=?/, points: 2 },
    { pattern: /(('|").+('|")( )*|\w+):( )*[{\[]/, points: 2 },
    { pattern: /===/g, points: 1 },
    { pattern: /!==/g, points: 1 },
    { pattern: /function\*?(( )+[\$\w]+( )*\(.*\)|( )*\(.*\))/g, points: 1 },
    { pattern: /null/g, points: 1 },
    { pattern: /\(.*\)( )*=>( )*.+/, points: 1 },
    { pattern: /(else )?if( )+\(.+\)/, points: 1 },
    { pattern: /while( )+\(.+\)/, points: 1 },
    { pattern: /(^|\s)(char|long|int|float|double)( )+\w+( )*=?/, points: -1 },
    { pattern: /(\w+)( )*\*( )*\w+/, points: -1 },
    {
      pattern: /<(\/)?script( type=('|")text\/javascript('|"))?>/,
      points: -50,
    },
  ],

  C: [
    // Primitive variable declaration.
    { pattern: /(char|long|int|float|double)( )+\w+( )*=?/, points: 2 },
    // malloc function call
    { pattern: /malloc\(.+\)/, points: 2 },
    // #include <whatever.h>
    { pattern: /#include (<|")\w+\.h(>|")/, points: 2, nearTop: true },
    // pointer
    { pattern: /(\w+)( )*\*( )*\w+/, points: 2 },
    // Variable declaration and/or initialisation.
    { pattern: /(\w+)( )+\w+(;|( )*=)/, points: 1 },
    // Array declaration.
    { pattern: /(\w+)( )+\w+\[.+\]/, points: 1 },
    // #define macro
    { pattern: /#define( )+.+/, points: 1 },
    // NULL constant
    { pattern: /NULL/, points: 1 },
    // void keyword
    { pattern: /void/g, points: 1 },
    // (else )if statement
    { pattern: /(else )?if( )*\(.+\)/, points: 1 },
    // while loop
    { pattern: /while( )+\(.+\)/, points: 1 },
    // printf function
    { pattern: /(printf|puts)( )*\(.+\)/, points: 1 },
    // new Keyword from C++
    { pattern: /new \w+/, points: -1 },
    // new Keyword from Java
    { pattern: /new [A-Z]\w*( )*\(.+\)/, points: 2 },
    // Single quote multicharacter string
    { pattern: /'.{2,}'/, points: -1 },
    // JS variable declaration
    { pattern: /var( )+\w+( )*=?/, points: -1 },
  ],

  "C++": [
    // Primitive variable declaration.
    { pattern: /(char|long|int|float|double)( )+\w+( )*=?/, points: 2 },
    // #include <whatever.h>
    { pattern: /#include( )*(<|")\w+(\.h)?(>|")/, points: 2, nearTop: true },
    // using namespace something
    { pattern: /using( )+namespace( )+.+( )*;/, points: 2 },
    // template declaration
    { pattern: /template( )*<.*>/, points: 2 },
    // std
    { pattern: /std::\w+/g, points: 2 },
    // cout/cin/endl
    { pattern: /(cout|cin|endl)/g, points: 2 },
    // Visibility specifiers
    { pattern: /(public|protected|private):/, points: 2 },
    // nullptr
    { pattern: /nullptr/, points: 2 },
    // new Keyword
    { pattern: /new \w+(\(.*\))?/, points: 1 },
    // #define macro
    { pattern: /#define( )+.+/, points: 1 },
    // template usage
    { pattern: /\w+<\w+>/, points: 1 },
    // class keyword
    { pattern: /class( )+\w+/, points: 1 },
    // void keyword
    { pattern: /void/g, points: 1 },
    // (else )if statement
    { pattern: /(else )?if( )*\(.+\)/, points: 1 },
    // while loop
    { pattern: /while( )+\(.+\)/, points: 1 },
    // Scope operator
    { pattern: /\w*::\w+/, points: 1 },
    // Single quote multicharacter string
    { pattern: /'.{2,}'/, points: -1 },
    // Java List/ArrayList
    {
      pattern: /(List<\w+>|ArrayList<\w*>( )*\(.*\))(( )+[\w]+|;)/,
      points: -1,
    },
  ],

  Python: [
    { pattern: /def( )+\w+\(.*\)( )*:/, points: 2 },
    { pattern: /while (.+):/, points: 2 },
    { pattern: /from [\w\.]+ import (\w+|\*)/, points: 2 },
    { pattern: /class( )*\w+(\(( )*\w+( )*\))?( )*:/, points: 2 },
    { pattern: /if( )+(.+)( )*:/, points: 2 },
    { pattern: /elif( )+(.+)( )*:/, points: 2 },
    { pattern: /else:/, points: 2 },
    { pattern: /for (\w+|\(?\w+,( )*\w+\)?) in (.+):/, points: 2 },
    { pattern: /\w+( )*=( )*\w+(?!;)(\n|$)/, points: 1 },
    { pattern: /import ([[^\.]\w])+/, points: 1, nearTop: true },
    { pattern: /print((( )*\(.+\))|( )+.+)/, points: 1 },
    { pattern: /(&{2}|\|{2})/, points: -1 },
  ],

  Rust: [
    { pattern: /fn main\(\)( )*{/, points: 2 },
    { pattern: /let( )+\w+( )*[:=]/, points: 2 },
    { pattern: /println!( )*\(/, points: 2 },
    { pattern: /pub( )+struct( )+\w+( )*{/, points: 1 },
    { pattern: /pub( )+enum( )+\w+( )*{/, points: 1 },
    { pattern: /pub( )+fn( )+\w+\(.*\)( )*->( )*.+/, points: 1 },
    { pattern: /impl( )+\w+( )*for( )+\w+( )*{/, points: 1 },

    // use statement
    { pattern: /use [a-z0-9_]+::[a-zA-Z0-9_]+;/, points: 2, nearTop: true },
    // let keyword
    { pattern: /let( )+\w+( )*=?/, points: 2 },
    // Function definition
    { pattern: /fn( )+\w+\(.*\)( )*->?( )*(\w+)?\{/, points: 2 },
    // Struct definition
    { pattern: /struct( )+\w+(\{)?/, points: 2 },
    // Enum definition
    { pattern: /enum( )+\w+\{/, points: 2 },
    // impl keyword
    { pattern: /impl( )+(\w+)?/, points: 2 },
    // match keyword
    { pattern: /match( )+\w+\(.*\)( )*\{/, points: 2 },
    // loop keyword
    { pattern: /loop( )+\{/, points: 2 },
    // if let statement
    { pattern: /if( )+let( )+(.*)( )+=/, points: 2 },
    // Option/Result types
    { pattern: /(Option|Result)<\w+>/, points: 2 },
    // Single quote character literal
    { pattern: /'\w'/, points: 1 },
    // Double colon
    { pattern: /::/, points: 1 },
    // Unsafe block
    { pattern: /unsafe( )+\{/, points: 1 },
  ],

  Java: [
    // System.out.println() etc.
    { pattern: /System\.(in|out)\.\w+/, points: 2 },
    // Class variable declarations
    {
      pattern: /(private|protected|public)( )*\w+( )*\w+(( )*=( )*[\w])?/,
      points: 2,
    },
    // Method
    { pattern: /(private|protected|public)( )*\w+( )*[\w]+\(.+\)/, points: 2 },
    // String class
    { pattern: /(^|\s)(String)( )+[\w]+( )*=?/, points: 2 },
    // List/ArrayList
    { pattern: /(List<\w+>|ArrayList<\w*>( )*\(.*\))(( )+[\w]+|;)/, points: 2 },
    // class keyword
    { pattern: /(public( )*)?class( )*\w+/, points: 2 },
    // Array declaration.
    { pattern: /(\w+)(\[( )*\])+( )+\w+/, points: 2 },
    // final keyword
    { pattern: /final( )*\w+/, points: 2 },
    // getter & setter
    { pattern: /\w+\.(get|set)\(.+\)/, points: 2 },
    // new Keyword (Java)
    { pattern: /new [A-Z]\w*( )*\(.+\)/, points: 2 },
    // C style variable declaration.
    { pattern: /(^|\s)(char|long|int|float|double)( )+[\w]+( )*=?/, points: 1 },
    // extends/implements keywords
    { pattern: /(extends|implements)/, points: 2, nearTop: true },
    // null keyword
    { pattern: /null/g, points: 1 },
    // (else )if statement
    { pattern: /(else )?if( )*\(.+\)/, points: 1 },
    // while loop
    { pattern: /while( )+\(.+\)/, points: 1 },
    // void keyword
    { pattern: /void/g, points: 1 },
    // const
    { pattern: /const( )*\w+/, points: -1 },
    // pointer
    { pattern: /(\w+)( )*\*( )*\w+/, points: -1 },
    // Single quote multicharacter string
    { pattern: /'.{2,}'/, points: -1 },
    // C style include
    { pattern: /#include( )*(<|")\w+(\.h)?(>|")/, points: -1, nearTop: true },
  ],

  HTML: [
    { pattern: /<!DOCTYPE (html|HTML PUBLIC .+)>/, points: 2, nearTop: true },
    // Tags
    {
      pattern: /<[a-z0-9]+(( )*[\w]+=('|").+('|")( )*)?>.*<\/[a-z0-9]+>/g,
      points: 2,
    },
    // Properties
    { pattern: /[a-z\-]+=("|').+("|')/g, points: 2 },
    // PHP tag
    { pattern: /<\?php/, points: -50 },
  ],

  CSS: [
    // Properties
    { pattern: /[a-z\-]+:(?!:).+;/, points: 2 },
    // <style> tag from HTML
    { pattern: /<(\/)?style>/, points: -50 },
  ],

  Ruby: [
    // require/include
    { pattern: /(require|include)( )+'\w+(\.rb)?'/, points: 2, nearTop: true },
    // Function definition
    { pattern: /def( )+\w+( )*(\(.+\))?( )*\n/, points: 2 },
    // Instance variables
    { pattern: /@\w+/, points: 2 },
    // Boolean property
    { pattern: /\.\w+\?/, points: 2 },
    // puts (Ruby print)
    { pattern: /puts( )+("|').+("|')/, points: 2 },
    // Inheriting class
    { pattern: /class [A-Z]\w*( )*<( )*([A-Z]\w*(::)?)+/, points: 2 },
    // attr_accessor
    { pattern: /attr_accessor( )+(:\w+(,( )*)?)+/, points: 2 },
    // new
    { pattern: /\w+\.new( )+/, points: 2 },
    // elsif keyword
    { pattern: /elsif/, points: 2 },
    // do
    { pattern: /do( )*\|(\w+(,( )*\w+)?)+\|/, points: 2 },
    // for loop
    { pattern: /for (\w+|\(?\w+,( )*\w+\)?) in (.+)/, points: 1 },
    // nil keyword
    { pattern: /nil/, points: 1 },
    // Scope operator
    { pattern: /[A-Z]\w*::[A-Z]\w*/, points: 1 },
  ],

  Go: [
    // package something
    { pattern: /package( )+[a-z]+\n/, points: 2, nearTop: true },
    // import
    {
      pattern: /(import( )*\(( )*\n)|(import( )+"[a-z0-9\/\.]+")/,
      points: 2,
      nearTop: true,
    },
    // error check
    { pattern: /if.+err( )*!=( )*nil.+{/, points: 2 },
    // Go print
    { pattern: /fmt\.Print(f|ln)?\(.*\)/, points: 2 },
    // function
    { pattern: /func(( )+\w+( )*)?\(.*\).*{/, points: 2 },
    // variable initialisation
    { pattern: /\w+( )*:=( )*.+[^;\n]/, points: 2 },
    // if/else if
    { pattern: /(}( )*else( )*)?if[^\(\)]+{/, points: 2 },
    // var/const declaration
    { pattern: /(var|const)( )+\w+( )+[\w\*]+(\n|( )*=|$)/, points: 2 },
    // public access on package
    { pattern: /[a-z]+\.[A-Z]\w*/, points: 1 },
    // nil keyword
    { pattern: /nil/, points: 1 },
    // Single quote multicharacter string
    { pattern: /'.{2,}'/, points: -1 },
  ],

  PHP: [
    // PHP tag
    { pattern: /<\?php/, points: 2 },
    // PHP style variables.
    { pattern: /\$\w+/, points: 2 },
    // use Something\Something;
    { pattern: /use( )+\w+(\\\w+)+( )*;/, points: 2, nearTop: true },
    // arrow
    { pattern: /\$\w+\->\w+/, points: 2 },
    // require/include
    {
      pattern:
        /(require|include)(_once)?( )*\(?( )*('|").+\.php('|")( )*\)?( )*;/,
      points: 2,
    },
    // echo 'something';
    { pattern: /echo( )+('|").+('|")( )*;/, points: 1 },
    // NULL constant
    { pattern: /NULL/, points: 1 },
    // new keyword
    { pattern: /new( )+((\\\w+)+|\w+)(\(.*\))?/, points: 1 },
    // Function definition
    { pattern: /function(( )+[\$\w]+\(.*\)|( )*\(.*\))/g, points: 1 },
    // (else)if statement
    { pattern: /(else)?if( )+\(.+\)/, points: 1 },
    // scope operator
    { pattern: /\w+::\w+/, points: 1 },
    // === operator
    { pattern: /===/g, points: 1 },
    // !== operator
    { pattern: /!==/g, points: 1 },
    // C/JS style variable declaration.
    {
      pattern: /(^|\s)(var|char|long|int|float|double)( )+\w+( )*=?/,
      points: -1,
    },
  ],

  Swift: [
    // import statement
    { pattern: /import [A-Za-z]+\n/, points: 2, nearTop: true },
    // Function definition
    { pattern: /func .+\(.+\) {/, points: 2 },
    // let keyword
    { pattern: /let .+ = .+;/, points: 2 },
    // var keyword
    { pattern: /var .+ = .+;/, points: 2 },
    // if statement
    { pattern: /if .+ {/, points: 1 },
  ],

  Kotlin: [
    // import statement
    { pattern: /import [A-Za-z.]+(\*|;)\n/, points: 2, nearTop: true },
    // Function definition
    { pattern: /fun .+\(.+\) {/, points: 2 },
    // val keyword
    { pattern: /val .+ = .+;/, points: 2 },
    // var keyword
    { pattern: /var .+ = .+;/, points: 2 },
    // if statement
    { pattern: /if *\(.+\) {/, points: 1 },
  ],

  Unknown: [],
};

/**
 * Detects the programming language of a given source code snippet.
 *
 * @param {string} code - The source code snippet to analyze.
 * @returns {string} The detected programming language or 'Unknown' if unable to detect.
 */
function detectLang(code) {
  const lines = code.split("\n");
  const topLines = lines.slice(0, Math.floor(lines.length / 2));
  const topCode = topLines.join("\n");

  const scores = Object.entries(languages).map(([language, checkers]) => {
    const languageScore = checkers.reduce((score, checker) => {
      const codeToCheck = checker.nearTop ? topCode : code;
      const matches = codeToCheck.match(checker.pattern) || [];
      return score + checker.points * matches.length;
    }, 0);

    return { language, score: languageScore };
  });

  const sortedScores = scores.sort((a, b) => b.score - a.score);
  const detectedLanguage =
    sortedScores[0].score > 0 ? sortedScores[0].language : "Unknown";

  return detectedLanguage;
}

module.exports = detectLang;
