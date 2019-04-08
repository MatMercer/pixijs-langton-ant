const LangtonAnt = require('./ant');
window['LangtonAnt'] = LangtonAnt;
LangtonAnt.prototype['next'] = LangtonAnt.prototype.next;
LangtonAnt.prototype['previous'] = LangtonAnt.prototype.previous;
